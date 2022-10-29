import { Component } from '@angular/core';
import { ShowtaskService } from '../showtask.service';

@Component({
  selector: 'app-get-task',
  templateUrl: './get-task.component.html',
  styleUrls: ['./get-task.component.css']
})


export class GetTaskComponent  {

  newTask: string = '';

  constructor(private taskData: ShowtaskService) { 
  }


  /*
   * 'onclick' function 
   * pushinhg message/task through the service to the
   * other component
   * */
  
  addTask() {
    this.taskData.addNewTask(this.newTask);
    console.log("hello");
  }

}
