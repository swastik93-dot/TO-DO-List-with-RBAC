import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare const bootstrap: any;

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {
  taskName: string = '';
  taskIndex: number = -1;

  @Output() save: EventEmitter<{ index: number, newTask: string }> = new EventEmitter();

  private modal: any;

  ngOnInit() {
    const modalElement = document.getElementById('editTaskModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  open(index: number, taskName: string) {
    this.taskIndex = index;
    this.taskName = taskName;
    this.modal.show();
  }

  onSave(form: NgForm) {
    if (form.valid) {
      this.save.emit({ index: this.taskIndex, newTask: form.value.taskName });
      this.modal.hide();
    }
  }

}
