

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodolistService } from '../todolist.service';
import { Task } from './task.model';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
//import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { Router } from '@angular/router';

declare var bootstrap: any;  

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  uniqueDates: Set<string> = new Set();
  selectedDate: string = '';
  showDateFilter: boolean = false;
  currentUserEmail: string = '';
  currentPage: number = 1;
  tasksPerPage: number = 5;
  paginatedTasks: Task[] = [];

  @ViewChild('editTaskModal') editTaskModal!: EditTaskModalComponent;

  constructor(private todolistService: TodolistService, private router: Router) { }

  currentDateTime: Date = new Date();

  ngOnInit(): void {
    this.currentUserEmail = sessionStorage.getItem('currentUserEmail') || '';
    if (this.currentUserEmail) {
      this.loadTasks();
      setInterval(() => {
        this.currentDateTime = new Date();
      }, 1000);
    } else {
      alert('No user is logged in');
      this.router.navigate(['/login']);
    }
    this.filterTasks(); 
  }

  
  toggleDateFilter() {
    if (this.showDateFilter) {
      // If the date filter is active, reset it and show all tasks
      this.selectedDate = '';
      this.showDateFilter = false;
      this.filteredTasks = this.taskArray; 
    } else {
      // If the date filter is not active, open the modal to select a date
      this.showDateFilter = true;
      this.openDateFilterModal();
    }
    this.filterTasks();
    this.paginateTasks();
  }
  
  // Method to open the date filter modal
  openDateFilterModal() {
    const modal = new bootstrap.Modal(document.getElementById('dateFilterModal'));
    modal.show();
  }
  

  loadTasks(): void {
    const storedTasks = localStorage.getItem(this.currentUserEmail);
    if (storedTasks) {
      this.taskArray = JSON.parse(storedTasks);

      this.taskArray.forEach(task => {
        task.dueDate = new Date(task.dueDate);
        task.isImportant = task.isImportant || false; 
      });
      this.sortTasks();
      this.filteredTasks = this.taskArray;
      this.extractUniqueDates();
      this.paginateTasks();
    }
  }

  saveTasks(): void {
    localStorage.setItem(this.currentUserEmail, JSON.stringify(this.taskArray));
  }

  onSubmit(form: NgForm) {
    const dueDate = form.controls['dueDate'].value 
      ? new Date(form.controls['dueDate'].value) 
      : new Date();
    
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
      dateTime: new Date(),
      dueDate: dueDate,
      isImportant: false 
    });

    this.sortTasks();
    this.filteredTasks = this.taskArray;
    this.extractUniqueDates();
    this.saveTasks();
    this.paginateTasks();
    form.reset();
  }

  onDelete(index: number) {
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
        this.taskArray.splice(index, 1);
        this.sortTasks();
        this.filteredTasks = this.taskArray;
        this.extractUniqueDates();
        this.saveTasks();
        this.paginateTasks();
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      }
    });
  }

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.saveTasks();
    this.paginateTasks();
  }

  openEditModal(index: number) {
    const task = this.taskArray[index];
    this.editTaskModal.open(index, task.taskName);
  }

  onSave(event: { index: number, newTask: string }) {
    this.taskArray[event.index].taskName = event.newTask;
    this.taskArray[event.index].dateTime = new Date();  
    this.sortTasks();
    this.filteredTasks = this.taskArray;
    this.saveTasks(); 
    this.paginateTasks();
  }



  onDateFilter(date: string) {
    if (this.selectedDate === date) {
      this.selectedDate = ''; 
    } else {
      this.selectedDate = date;
    }
    this.filterTasks();
  }

  sortTasks() {
    this.taskArray.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }

  extractUniqueDates() {
    this.uniqueDates.clear();
    this.taskArray.forEach(task => {
      this.uniqueDates.add(task.dueDate.toDateString());
    });
  }

  onMarkAsImportant(index: number) {
    this.taskArray[index].isImportant = !this.taskArray[index].isImportant;
    this.saveTasks();
    this.paginateTasks();
  }

  paginateTasks() {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page;
      this.paginateTasks();
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.tasksPerPage);
  }

  selectedFilter: string = '';

  // filterTasks() {
  //   this.filteredTasks = this.taskArray;
  
  //   // Apply search term filtering
  //   if (this.searchTerm) {
  //     this.filteredTasks = this.filteredTasks.filter(task =>
  //       task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  
  //   // Apply date filter if any date is selected
  //   if (this.selectedDate) {
  //     const selectedDate = new Date(this.selectedDate).toDateString();
  //     this.filteredTasks = this.filteredTasks.filter(task =>
  //       task.dueDate.toDateString() === selectedDate
  //     );
  //   }
  filterTasks() {
    this.filteredTasks = this.taskArray;
  
    // Apply search term filtering
    if (this.searchTerm) {
      this.filteredTasks = this.filteredTasks.filter(task =>
        task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    // Apply date filter if a date is selected
    if (this.selectedDate) {
      const selectedDate = new Date(this.selectedDate).toDateString();
      this.filteredTasks = this.filteredTasks.filter(task =>
        task.dueDate.toDateString() === selectedDate
      );
    }
  
    // Apply the selected filter
    if (this.selectedFilter === 'important') {
      this.filteredTasks = this.filteredTasks.filter(task => task.isImportant);
    } else if (this.selectedFilter === 'pending') {
      this.filteredTasks = this.filteredTasks.filter(task => !task.isCompleted);
    } else if (this.selectedFilter === 'completed') {
      this.filteredTasks = this.filteredTasks.filter(task => task.isCompleted);
    }
  
    this.paginateTasks();
  }
 

  // Function to select a date and filter tasks
  selectDate(date: string) {
    this.selectedDate = date;
    this.filterTasks();
    this.closeDateFilterModal();
  }

  // Function to close the date filter modal
  closeDateFilterModal() {
    const modal = document.getElementById('dateFilterModal');
    if (modal) {
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal?.hide();
    }
  }

}


