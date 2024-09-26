import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeLast, tap } from 'rxjs';
import { ITask } from 'src/app/utils/interfaces/ITask';
import { environment } from 'src/_environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITask[]> {
    return this.http.get<any[]>(`${environment.TASK}`).pipe(
      takeLast(1),
      tap({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      })
    );
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${environment.TASK}`, task);
  }

  update(taskId: string, task: ITask): Observable<ITask> {
    return this.http.patch<ITask>(`${environment.TASK}/${taskId}`, task);
  }

  delete(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.TASK}/${taskId}`);
  }
}
