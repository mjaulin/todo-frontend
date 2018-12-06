import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../../shared/model/task";
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  public editing: boolean;

  constructor(public taskService: TaskService) { }

  ngOnInit() {
  }

  onCheck(task: Task) {
    this.taskService.updateTask({ ...task, completed: !task.completed });
  }

  onDelete(task: Task) {
    this.taskService.deleteTask(task);
  }

  onUpdate(task: Task, value) {
    this.editing = false;
    this.taskService.updateTask({ ...task, label: value });
  }

  onEdit() {
    this.editing = !this.editing;
  }
}
