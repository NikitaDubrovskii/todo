import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoryComponent } from './model/category/category.component';
import { PriorityComponent } from './model/priority/priority.component';
import { TaskComponent } from './model/task/task.component';
import { TestDataComponent } from './data/test-data/test-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    PriorityComponent,
    TaskComponent,
    TestDataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
