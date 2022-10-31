import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetTaskComponent } from './get-task/get-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';

@NgModule({
  declarations: [
    AppComponent,
    GetTaskComponent,
    ShowTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
