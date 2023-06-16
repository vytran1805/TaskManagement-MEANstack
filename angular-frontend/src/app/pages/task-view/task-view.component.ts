import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  /**
   * This is a lifecycle hook in Angular, called when a component is initialized
   * It is  is commonly used to make API calls or fetch data from a server when the component is initialized
   */
  ngOnInit() {}

  /**
   * This method is responsible for creating a new list
   * '.subscribe()' is called on the Observable objthat allows you to receive the results
   * or perform further actions like handling errors when the asynchronous operation is completed
   */
  createNewList() {
    this.taskService.createList('testing').subscribe((response: any) => {
      console.log(response);
    });
  }
}
