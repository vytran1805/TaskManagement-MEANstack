/**
 * This service encapsulates HTTP logic, is responsible for making HTTP calls to external APIs,
 * fetching data from a server, and sending data to a server.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }
  /**
   * This method uses the http object to make an HTTP GET request to a specific URI
   * @param uri unique address
   * @returns the complete URL for the HTTP GET request
   */
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  /**
   * This method uses the http object to make an HTTP POST request to a specific URI and payload
   * @param uri unique address
   * @param payload the data obj that passed in the body of the HTTP POST request
   * @returns the complete URL for the HTTP POST request
   */
  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }
  /**
   * This method uses the http object to make an HTTP PATCH request to a specific URI and payload
   * @param uri unique address
   * @param payload the data obj that passed in the body of the HTTP PATCH request
   * @returns an Observable object representing the asynchronous operation of sending the PATCH request
   */
  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }
  /**
   * This method uses the http object to make an HTTP DELETE request to a specific URI
   * @param uri unique address
   * @returns an Observable object representing the asynchronous operation of sending the DELETE request
   */
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
