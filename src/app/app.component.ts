import {Component, OnInit} from '@angular/core';
import { Task } from './model/task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  // @ts-ignore
  tasks: Task[];
  // @ts-ignore
  categories: Category[];

  // @ts-ignore
  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      // @ts-ignore
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  onUpdateTask(task: Task) {
    console.log(task);
  }

}
