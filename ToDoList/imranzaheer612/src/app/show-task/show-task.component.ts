import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowtaskService } from '../showtask.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {


  alltasks: string[] = [];
  

  constructor(private taskData: ShowtaskService) { }

  /**
   * adding the task to the tasks array 
   * --> when ever a task is detected from the Service
   * --> checking for empty strings
  */

  ngOnInit(): void {
    this.taskData.enteredTask.subscribe(enteredTask => {
      if (enteredTask) {
        this.alltasks.push(enteredTask);
      }
    });
  }

}
