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
  getList() {
    return this.webReqService.get('lists');
  }
}
