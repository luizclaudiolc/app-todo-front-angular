import {
  ChangeDetectorRef,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';
import type { IPieData } from 'src/app/shared/pie-chart/pie-chart.component';
import { TaskService } from '../../shared/services/task.service';
import type { ITask } from '../../utils/interfaces/ITask';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Inject(TaskService) taskService!: TaskService;
  @Inject(ChangeDetectorRef) cdr!: ChangeDetectorRef;

  taskDone = 0;
  taskNotDone = 0;
  allTasks = 0;
  dataConcluidas: IPieData[] = [];
  dataAFazer: IPieData[] = [];
  dataAll: IPieData[] = [];

  ngOnInit(): void {
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        [this.taskDone, this.taskNotDone, this.allTasks] = [
          tasks.filter(({ isDone }) => isDone === true).length,
          tasks.filter(({ isDone }) => isDone === false).length,
          tasks.length,
        ];

        this.dataConcluidas = this.parseData(
          tasks || 0,
          'Concluídas',
          'Concluídas',
          'A Fazer',
          true,
          '#2d884d'
        );
        this.dataAFazer = this.parseData(
          tasks,
          'A fazer',
          'A fazer',
          'Concluídas',
          false,
          '#b34045'
        );
        this.dataAll = this.parseData(
          tasks,
          'Total de todas as tarefas',
          'Total de todas as tarefas',
          '',
          'all',
          '#4091d7'
        );

        this.cdr.detectChanges();
      },
    });
  }

  getLengthTask(tasks: ITask[], value: boolean | 'all'): number {
    return value === 'all'
      ? tasks.length
      : tasks.filter(({ isDone }) => isDone === value).length;
  }

  parseData(
    tasks: ITask[],
    title: string,
    selectName: string,
    restName: string | '',
    tasksLength: boolean | 'all',
    color: string
  ): IPieData[] {
    return [
      {
        title,
        selectName,
        Selectdvalue: this.getLengthTask(tasks, tasksLength),
        restName,
        total: this.getLengthTask(tasks, 'all'),
        color,
        description:
          tasksLength === 'all'
            ? `Todas as tarefas: ${this.getLengthTask(tasks, 'all')}`
            : '',
      },
    ];
  }
}
