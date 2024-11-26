import { Injectable } from '@angular/core';
import { Task } from '../todolist/task.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor() { }

  getUserTasks(email: string): Task[] {
    const userTasks = localStorage.getItem(email);
    return userTasks ? JSON.parse(userTasks) : [];
  }

  assignTask(email: string, task: Task) {
    let userTasks = this.getUserTasks(email);
    userTasks.push(task);
    localStorage.setItem(email, JSON.stringify(userTasks));
  }

  deleteUserTask(email: string, index: number) {
    let userTasks = this.getUserTasks(email);
    userTasks.splice(index, 1);
    localStorage.setItem(email, JSON.stringify(userTasks));
  }
}