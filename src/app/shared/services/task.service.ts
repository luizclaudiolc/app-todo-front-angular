import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeLast, tap } from 'rxjs';
import { ITask } from 'src/app/utils/interfaces/ITask';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITask[]> {
    return this.http.get<any[]>(`${process.env['TASK']}`).pipe(
      takeLast(1),
      tap({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      })
    );
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${process.env['TASK']}`, task);
  }

  update(taskId: string, task: ITask): Observable<ITask> {
    return this.http.patch<ITask>(`${process.env['TASK']}/${taskId}`, task);
  }

  delete(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`${process.env['TASK']}/${taskId}`);
  }
}
