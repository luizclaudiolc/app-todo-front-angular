import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ITask } from 'src/app/utils/interfaces/ITask';
import { environment } from 'src/environments/environment';
import { catchError, retry, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly TIMEOUT = 15000;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${environment.TASK}`).pipe(
      timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          'Erro: Servidor demorou mais de 15 segundos para responder.',
          error
        );
        return throwError(() => new Error('Tempo limite excedido'));
      }),
      retry({ count: 1, delay: 1000 })
    );
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${environment.TASK}`, task).pipe(
      timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          'Erro: Servidor demorou mais de 15 segundos para responder.',
          error
        );
        return throwError(() => new Error('Tempo limite excedido'));
      }),
      retry({ count: 1, delay: 1000 })
    );
  }

  update(taskId: string, task: ITask): Observable<ITask> {
    return this.http.patch<ITask>(`${environment.TASK}/${taskId}`, task).pipe(
      timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          'Erro: Servidor demorou mais de 15 segundos para responder.',
          error
        );
        return throwError(() => new Error('Tempo limite excedido'));
      }),
      retry({ count: 1, delay: 1000 })
    );
  }

  delete(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.TASK}/${taskId}`).pipe(
      timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          'Erro: Servidor demorou mais de 15 segundos para responder.',
          error
        );
        return throwError(() => new Error('Tempo limite excedido'));
      }),
      retry({ count: 1, delay: 1000 })
    );
  }
}
