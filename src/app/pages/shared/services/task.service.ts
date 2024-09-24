import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeLast, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITask } from '../../utils/interfaces/ITask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<any[]>(`${environment.endpoint.task}`).pipe(
      takeLast(1),
      tap({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      })
    );
  }
}
