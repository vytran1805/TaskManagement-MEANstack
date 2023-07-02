/**
 * This file is responsible for modifying data, used for
 * encapsulating and providing common functionality, data retrieval,
 * business logic, or communication with external services
 */
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}
  /* Method to create a new list with passed in title */
  /**
   * This method creates a new list with 'title' param by sending a POST req to the '/lists' endpoint
   * @param title
   */
  createList(title: string) {
    return this.webReqService.post('lists', { title });
  }
  /**
   * Get the list of lists
   * @returns the list of lists
   */
  getLists(): any {
    return this.webReqService.get('lists');
  }
  /**
   * Get the list of tasks with listId
   * @param listId Id of the list
   * @returns the tasks within the listId
   */
  getTasks(listId: string): any {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  deleteList(listId: string) {
    return this.webReqService.delete(`lists/${listId}`);
  }
}
