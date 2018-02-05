import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [ TaskService ]
})
export class TasksComponent implements OnInit {

  newTask: Task = new Task();
  validNewTask = true;

  constructor(private taskService: TaskService) {
  }
  ngOnInit() {
  }

  addTask() {
    console.log('task', this.newTask);
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

}
