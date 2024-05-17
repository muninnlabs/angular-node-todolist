import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { Task } from '../interfaces/interfaces';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get(`${API_URL}/tasks`).pipe(
      map((response: any) => {
        return response.tasks;
      }),
      shareReplay(),
      catchError((error: any) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

  getTask(id: string): Observable<Task> {
    return this.http.get(`${API_URL}/task/${id}`).pipe(
      map((response: any) => {
        console.log('service get by id', response);
        return response;
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post(`${API_URL}/create`, task).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

  saveTask(task: Task): Observable<Task> {
    console.log('service save', task);
    return this.http.put(`${API_URL}/update/${task.id}`, task).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete(`${API_URL}/delete/${id}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
  }
}
