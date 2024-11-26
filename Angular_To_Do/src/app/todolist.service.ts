import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  private jsonUrl = 'assets/db.json'; // Adjust the path if necessary

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(this.jsonUrl).pipe(map((data: any) => data.tasks));
  }
}
