import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { TaskService } from 'src/app/shared/services/task.service';
import { SNACK_DEFAULT } from 'src/app/utils/helpers/helpers';
import type { ITask } from 'src/app/utils/interfaces/ITask';
import { CreateTasksComponent } from '../create-tasks/create-tasks.component';

@Component({
  selector: 'app-table-tasks',
  templateUrl: './table-tasks.component.html',
  styleUrls: ['./table-tasks.component.scss'],
})
export class TableTasksComponent {
  @Inject(TaskService) taskService!: TaskService;
  @Inject(MatDialog) dialog!: MatDialog;
  @Inject(MatSnackBar) snack!: MatSnackBar;

  tasks: ITask[] = [];
  columnsTable: string[] = ['isDone', 'title', 'description', 'actions'];
  columnsTableHeader: string[] = ['Feito', 'Tarefa', 'Descrição', 'Ações'];
  tasksInPage: ITask[] = [];
  lowValue = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  loading = false;

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService
      .getAll()
      .pipe(
        tap({
          next: (tasks: ITask[]) => {
            this.tasks = tasks.sort((a, b) => +a.isDone - +b.isDone);
            this.update();
            this.loading = true;
          },
        })
      )
      .subscribe();
  }

  searchTask(event: KeyboardEvent): void {
    const toLowerCase = (value: string) => value.toLocaleLowerCase();
    const input = event.target as HTMLInputElement;
    const text = toLowerCase(input.value.trim());
    const dataFiltered = this.tasks.filter(({ title, description }) => {
      return (
        toLowerCase(title).includes(text) ||
        toLowerCase(description).includes(text)
      );
    });
    this.tasksInPage = dataFiltered;
  }

  openDialog(task?: ITask): void {
    const dialogRef = this.dialog.open(CreateTasksComponent, {
      width: '60vw',
      height: '60vh',
      maxWidth: '60vw',
      maxHeight: '60vh',
      autoFocus: true,
      data: task,
    });

    dialogRef.afterClosed().subscribe(() => this.getAllTasks());
  }

  deleteTask(task: ITask): void {
    const { id: _id, title } = task;
    const deleteConfirm = window.confirm(
      `Tem certeza que quer excluir a tarefa: ${title}`
    );

    if (deleteConfirm) {
      // biome-ignore lint: forbidden
      this.taskService.delete(_id!).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(({ id }) => id !== _id);
          this.getAllTasks();
        },
      });
    }
  }

  pageEvents({ pageIndex, pageSize }: PageEvent): void {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.update();
  }

  update(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.tasksInPage = this.tasks.slice(start, end);
  }

  toggleDone(_task: ITask) {
    const { title, description, isDone } = _task;
    const task = {
      title,
      description,
      isDone,
    };

    // biome-ignore lint: forbidden
    this.taskService.update(_task.id!, task).subscribe({
      next: (task) => {
        this.snack.open('Tarefa Atualizada!', 'x', SNACK_DEFAULT());
        this.getAllTasks();
      },
      error: (error) =>
        console.error('A tarefa não pode ser atualizada no menomento.', error),
    });
  }
}
