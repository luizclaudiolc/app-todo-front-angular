import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_DEFAULT } from 'src/app/utils/helpers/helpers';
import { TaskService } from '../../shared/services/task.service';
import { ITask } from '../../utils/interfaces/ITask';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss'],
})
export class CreateTasksComponent {
  task: ITask = {
    title: '',
    description: '',
    isDone: false,
  };
  editMode = false;

  @Inject(MAT_DIALOG_DATA) public data!: ITask;
  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<CreateTasksComponent>,
    private snack: MatSnackBar
  ) {
    if (this.data) {
      this.task = this.data;
      this.editMode = true;
    }
  }

  ngOnInit(): void {
    if (this.data) this.task = this.data;
  }

  private addTask(): void {
    const task = this.task;
    this.taskService.create(task).subscribe({
      next: (task) => {
        this.dialogRef.close();
        this.snack.open('Tarefa criada!', 'x', SNACK_DEFAULT());
      },
      error: (error) =>
        console.error('A tarefa não pode ser criada no menomento.', error),
    });
  }

  private updateTask(id: string): void {
    const { title, description, isDone } = this.task;
    const task: ITask = {
      title,
      description,
      isDone,
    };
    // biome-ignore lint:no-non-null-assertion
    this.taskService.update(id!, task).subscribe({
      next: (task) => {
        this.dialogRef.close();
        this.snack.open('Tarefa Atualizada!', 'x', SNACK_DEFAULT());
      },
      error: (error) =>
        console.error('A tarefa não pode ser atualizada no menomento.', error),
    });
  }

  addOurEditTask(): void {
    // biome-ignore lint:no-non-null-assertion
    this.editMode ? this.updateTask(this.task.id!) : this.addTask();
  }

  verifyInputs(): boolean {
    return !!(this.task.title && this.task.description);
  }

  closeDialog(): void {
    this.dialogRef.close(this.task);
  }
}
