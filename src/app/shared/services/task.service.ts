import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ITask } from "src/app/utils/interfaces/ITask";
import { environment } from "src/environments/environment";
import { catchError, timeout, retryWhen, delay, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private readonly TIMEOUT = 15000;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${environment.TASK}`).pipe(
      // timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          "Erro: Servidor demorou mais de 15 segundos para responder.",
          error,
        );
        return throwError(() => new Error("Tempo limite excedido"));
      }),
      retryWhen((errors) =>
        errors.pipe(
          delay(1000), // Atraso de 1 segundo entre as tentativas
          take(2), // Tenta 2 vezes no total (1 tentativa + 1 retry)
        ),
      ),
    );
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${environment.TASK}`, task).pipe(
      // timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          "Erro: Servidor demorou mais de 15 segundos para responder.",
          error,
        );
        return throwError(() => new Error("Tempo limite excedido"));
      }),
      retryWhen((errors) => errors.pipe(delay(1000), take(2))),
    );
  }

  update(taskId: string, task: ITask): Observable<ITask> {
    return this.http.patch<ITask>(`${environment.TASK}/${taskId}`, task).pipe(
      // timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          "Erro: Servidor demorou mais de 15 segundos para responder.",
          error,
        );
        return throwError(() => new Error("Tempo limite excedido"));
      }),
      retryWhen((errors) => errors.pipe(delay(1000), take(2))),
    );
  }

  delete(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`${environment.TASK}/${taskId}`).pipe(
      // timeout(this.TIMEOUT),
      catchError((error) => {
        console.error(
          "Erro: Servidor demorou mais de 15 segundos para responder.",
          error,
        );
        return throwError(() => new Error("Tempo limite excedido"));
      }),
      retryWhen((errors) => errors.pipe(delay(1000), take(2))),
    );
  }
}
