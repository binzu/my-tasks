import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

  // Placeholder for task's
  tasks: Task[] = [];
  current: Task[] = [];
  overdue: Task[] = [];

  constructor() {
  }

  // Simulate POST /tasks
  addTask(task: Task): TaskService {
    const today = this.today();
    const tomorrow = this.tomorrow();
    // add id
    if (!task.id) {
      task.id = ++this.lastId;
    }
    // add status
    if (task.date) {
      const date = task.date.toString();
      const arr = date.split('-');
      const due = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), 0, 0);
      if (due >= today  && due  <= tomorrow) {
        task.status = 'current';
      } else if (due < today) {
        task.status = 'overdue';
      } else {
        task.status = 'all';
      }
    }
    this.tasks.push(task);
    this.current = this.getCurrentTasks();
    this.overdue = this.getOverdueTasks();
    return this;
  }

  // Simulate DELETE /tasks/:id
  deleteTaskById(id: number): TaskService {
    this.tasks = this.tasks
      .filter(task => task.id !== id);
    return this;
  }

  // Simulate PUT /tasks/:id
  updateTaskById(id: number, values: Object = {}): Task {
    const task = this.getTaskById(id);
    if (!task) {
      return null;
    }
    Object.assign(task, values);
    return task;
  }

  // Simulate GET /tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Simulate GET /tasks/:id
  getTaskById(id: number): Task {
    return this.tasks
      .filter(task => task.id === id)
      .pop();
  }

  // Toggle task complete
  toggleTaskComplete(task: Task) {
    const updatedTask = this.updateTaskById(task.id, {
      complete: !task.complete
    });
    return updatedTask;
  }

  toggleTaskDescription(task: Task) {
    const updatedTask = this.updateTaskById(task.id, {
      showDescription: !task.showDescription
    });
  }

  // returns array of current tasks
  getCurrentTasks(): any[] {
    const today = this.today();
    const tomorrow = this.tomorrow();
    return this.tasks.filter(function(item) {
      if (!item.date) {
        return false;
      }
      // const date = item.date.toString();
      // const arr = date.split('-');
      // const due = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), 0, 0);
      // return due >= today  && due  <= tomorrow;
      return item.status === 'current';
    });
  }

  // returns array of overdue tasks
  getOverdueTasks(): any[] {
    const today = this.today();
    return this.tasks.filter(function(item) {
      if (!item.date) {
        return false;
      }
      // const date = item.date.toString();
      // const arr = date.split('-');
      // const due = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), 0, 0);
      // return due < today;
      return item.status === 'overdue';
    });
  }

  // returns today start of day Date
  today(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  // returns tomorrow end of day Date
  tomorrow(): Date {
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setHours(23, 59, 59, 999);
    return tomorrow;
  }
}
