import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.taskService.fetchTasks();
  }

}
