import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

import { Event } from '_debugger';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [ TaskService ]
})
export class TasksComponent implements OnInit {

  newTask: Task = new Task();
  validNewTask = true;
  listTitle = 'All Tasks';
  listView = 'all';

  constructor(private taskService: TaskService) {
  }
  ngOnInit() {
  }

  addTask() {
    if (!this.newTask.title) {
      this.validNewTask = false;
      return;
    } else {
      this.validNewTask = true;
    }
    this.taskService.addTask(this.newTask);
    this.newTask = new Task();
  }

  toggleValidWarning() {
    this.validNewTask = !this.validNewTask;
  }

  toggleTaskComplete(task) {
    this.taskService.toggleTaskComplete(task);
  }

  toggleTaskDescription(task) {
    this.taskService.toggleTaskDescription(task);
  }

  removeTask(task) {
    this.taskService.deleteTaskById(task.id);
  }

  get tasks() {
    return this.taskService.getAllTasks();
  }

  get current() {
    return this.taskService.getCurrentTasks();
  }

  get overdue() {
    return this.taskService.getOverdueTasks();
  }

  filterTasks(e) {
    this.listView = e.target.value;
    switch ( e.target['value'] ) {
      case 'all':
        this.listTitle = 'All Tasks';
        break;
      case 'current':
        this.listTitle = 'Current Tasks';
        break;
      case 'overdue':
        this.listTitle = 'Overdue Tasks';
        break;
      default:
        this.listTitle = 'All Tasks';
      }
    }
  }

}
