import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { ITask } from '../../utils/interfaces/ITask';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
