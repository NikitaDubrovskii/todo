import { Component } from '@angular/core';
import {PriorityComponent} from "../priority/priority.component";
import {CategoryComponent} from "../category/category.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  id: number;
  title: string;
  completed: boolean;
  priority?: PriorityComponent;
  category?: CategoryComponent;
  date?: Date;

  constructor(id: number, title: string, completed: boolean, priority?: PriorityComponent, category?: CategoryComponent, date?: Date) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.date = date;
  }
}
