import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  // create a prop
  lists: any;
  tasks: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}
  /**
   * This is a lifecycle hook in Angular, called when a component is initialized
   * It is  is commonly used to make API calls or fetch data from a server when the component is initialized
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      // get the listId and show the corresponding tasks
      this.taskService.getTasks(params['listId']).subscribe((tasks: any[]) => {
        this.tasks = tasks;
      });
    });
    // Get an array of List
    this.taskService.getLists().subscribe((arrayOfLists: any[]) => {
      this.lists = arrayOfLists;
    });
  }

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
  /**
   *
   * @param listId
   */
  deleteList(listId: string) {
    this.taskService.deleteList(listId).subscribe(
      () => {
        // Handle the deletion success
        console.log('List deleted successfully');
        // You may also update the 'lists' array to reflect the changes
      },
      (error) => {
        // Handle the deletion error
        console.error('Error deleting list:', error);
      }
    );
  }
}
