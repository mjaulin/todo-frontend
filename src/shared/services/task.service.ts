import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject, of, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Task} from "../model/task";
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = 'http://localhost:8080/api/tasks';

  private _tasks$ = new BehaviorSubject<Task[]>([]);

  private _tasks: Task[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  get tasks(): Observable<Task[]> {
    return this._tasks$;
  }
  
  public fetchTasks(): void {
    this.http.get<Task[]>(this.taskUrl).pipe(
        tap(() => this._log('fetched heroes')),
        catchError(this._handleError('Error while getting all tasks', []))
      ).subscribe(value => {
        this._tasks = value;
        this._tasks$.next(this._tasks);
      });
  }

  public addTask (task: Task): void {
    this.http.post<Task>(this.taskUrl, task, httpOptions).pipe(
      tap((task: Task) => this._log(`added task id=${task.id}`)),
      catchError(this._handleError<Task>('Canno\'t add task'))
    ).subscribe((data: Task) => {
      this._tasks.push(data);
      this._tasks$.next(this._tasks);
    })
  }

  public updateTask (task: Task): void {
    this.http.put(`${this.taskUrl}/${task.id}`, task, httpOptions).pipe(
      tap(() => this._log(`updated task id=${task.id}`)),
      catchError(this._handleError<any>('Error while update task', {}))
    ).subscribe((data: any) => {
      this._tasks.filter(t => t.id === data.id).forEach(t => {
        t.label = data.label;
      });
      this._tasks$.next(this._tasks);
    });
  }

  public deleteTask (task: Task | number): void {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.taskUrl}/${id}`;

    this.http.delete<Task>(url, httpOptions).pipe(
        catchError(this._handleError<Task>(`Error while deleting task`))
    ).subscribe(() => {
          this._tasks = this._tasks.filter(t => t.id != id);
          this._tasks$.next(this._tasks);
          this._log(`deleted task id=${id}`)
        }
    );
  }

  private _handleError<T> (message, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.messageService.add(message);
      if (result == undefined) {
        throw throwError(error)
      }
      return of(result as T);
    };
  }

  private _log(message: string) {
    console.log(`HeroService: ${message}`);
  }

}
