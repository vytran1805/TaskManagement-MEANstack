import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {}
  /**
   * Create a new list
   * @param title the list title
   */
  createList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      // Now we navigate to /lists/response._id
    });
  }
}
