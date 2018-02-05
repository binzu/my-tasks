import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

  // Placeholder for task's
  tasks: Task[] = [];

  constructor() {
  }

  // Simulate POST /tasks
  addTask(task: Task): TaskService {
    if (!task.id) {
      task.id = ++this.lastId;
    }
    this.tasks.push(task);
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

}
