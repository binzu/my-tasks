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

  constructor(private taskService: TaskService) {
  }
  ngOnInit() {
  }

  addTask() {
    this.taskService.addTask(this.newTask);
    this.newTask = new Task();
  }

  toggleTaskComplete(task) {
    this.taskService.toggleTaskComplete(task);
  }

  removeTask(task) {
    this.taskService.deleteTaskById(task.id);
  }

  get tasks() {
    return this.taskService.getAllTasks();
  }

}
