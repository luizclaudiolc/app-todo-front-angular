import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { ITask } from '../../utils/interfaces/ITask';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasks: ITask[] = [];
  name = '';
  constructor(private taskServico: TaskService, private auth: AuthService) {}

  ngOnInit(): void {
    this.name = this.auth.getUserName;
    this.taskServico.getAll().subscribe((d) => (this.tasks = d));
  }
}
