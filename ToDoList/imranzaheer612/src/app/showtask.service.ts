import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * service to detect button click from 'get-task' component
 * and then transfering the task meesaage to the 'show task' component
*/

export class ShowtaskService {

  private messageSource = new BehaviorSubject("");
  enteredTask = this.messageSource.asObservable();
  
  constructor() { }

  addNewTask(task: string) {
    this.messageSource.next(task);
  }

}
