import { NgFor, NgIf } from '@angular/common';
import { Component, Injectable, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from './task-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private _toaster: ToastrService){}
  title = 'todo-app';
   // properties
  check: boolean = true; 
  taskName: string = '';
  taskImageUrl: string = '';
  tasks: Task[] = [];
  filter: 'All' | 'Active' | 'Completed' = 'All';

  // Add new task
  addTask() {
    if (!this.taskName.trim()) {
      return; 
    }

    const newTask: Task = {
      name: this.taskName,
      completed: false,
      imageUrl: this.taskImageUrl
    };
    this.tasks.push(newTask);
    this.taskName = ''; 
    this.taskImageUrl = ''; 
  }
  // complete task status
  taskCompletion(task: Task) {
    task.completed = !task.completed;
    // this.check = true;
    task.completed ? this._toaster.success(`Todo succesfully completed`, 'Completed') : '';
  }

  // Delete a task
  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task );
    this.tasks ? this._toaster.success(`Todo succesfully deleted`, 'Deleted') : '';
  }

  // Filter tasks based on filter type
  filteredTasks(): Task[] {
    // this.check = true;
    if (this.filter === 'All') {
      // this.check = true;
      return this.tasks;
    }
    // this.check = true;
    return this.tasks.filter(task => (this.filter === 'Completed' ? task.completed : !task.completed));
  }
}
