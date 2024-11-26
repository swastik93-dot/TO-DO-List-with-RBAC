

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../services/AdminService';
import { Task } from '../todolist/task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-AdminComponent',
  templateUrl: './AdminComponent.html',
  styleUrls: ['./AdminComponent.css']
})
export class AdminComponent implements OnInit {
  userEmail: string = '';
  userTasks: Task[] = [];
  newTask: string = '';
  newTaskDueDate: Date = new Date();
  showNewUserModal: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { }

  openNewUserModal() {
    this.showNewUserModal = true;
    document.body.classList.add('modal-open');
  }

  closeNewUserModal() {
    this.showNewUserModal = false;
    document.body.classList.remove('modal-open');
  }

  onCreateUser(form: NgForm) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((user: any) => user.email === form.value.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email already exists!'
      });
      return;
    }

    const newUser = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire('Success', 'User created successfully!', 'success');
    this.closeNewUserModal();
    form.resetForm();
  }

  onSearchUser(form: NgForm) {
    const email = form.value.email;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists in localStorage
    const userExists = users.some((user: any) => user.email === email);
    
    if (!userExists) {
      Swal.fire('Not Found', 'User not present', 'error');
      return;
    }
    
    this.userTasks = this.adminService.getUserTasks(email);
    this.userEmail = email;
  }



  onAssignTask(form: NgForm) {
    if (this.userEmail) {
      const task: Task = {
        taskName: form.value.task,
        isCompleted: false,
        isEditable: false,
        dateTime: new Date(),
        dueDate: form.value.dueDate ? new Date(form.value.dueDate) : new Date(),
        isImportant: false
      };
      this.adminService.assignTask(this.userEmail, task);
      this.userTasks = this.adminService.getUserTasks(this.userEmail);
      form.resetForm();
      Swal.fire('Success', 'Task assigned successfully', 'success');
    }
  }

  onDeleteTask(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUserTask(this.userEmail, index);
        this.userTasks = this.adminService.getUserTasks(this.userEmail);
        Swal.fire('Deleted!', 'The task has been deleted.', 'success');
      }
    });
  }
}