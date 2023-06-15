/**
 * This file is responsible for modifying data, used for 
 * encapsulating and providing common functionality, data retrieval, 
 * business logic, or communication with external services
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  /* Method to create a new list with passed in title */
  createList(title:string){
    // We want to send a web request to create a list
  }
}
