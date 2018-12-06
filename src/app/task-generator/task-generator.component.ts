import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'app-task-generator',
  templateUrl: './task-generator.component.html',
  styleUrls: ['./task-generator.component.css']
})
export class TaskGeneratorComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onAdd(input) {
    if (input.value.trim().length > 0) {
      this.taskService.addTask({label: input.value});
      input.value = '';
    }
  }

}
