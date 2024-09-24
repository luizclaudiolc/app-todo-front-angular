import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { ITask } from '../utils/interfaces/ITask';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
})
export class DashbordComponent implements OnInit {
  tasks: ITask[] = [];
  name = '';
  constructor(private taskServico: TaskService, private auth: AuthService) {}

  ngOnInit(): void {
    this.name = this.auth.getUserName;
    this.taskServico.getTasks().subscribe((d) => (this.tasks = d));
  }
}
