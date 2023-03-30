import {Component, OnInit} from '@angular/core';
import { Task } from './model/task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/category";
import {Priority} from "./model/priority";

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
  priorities: Priority[];

  // @ts-ignore
  selectedCategory: Category;

  searchTaskText = '';
  // @ts-ignore
  statusFilter: boolean;
  // @ts-ignore
  priorityFilter: Priority;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasks();
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task)
      .subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        // @ts-ignore
        null,
        null,
        null,
      ).subscribe(tasks => {
          this.tasks = tasks;
        });
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        // @ts-ignore
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(() => {
      // @ts-ignore
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onSearchTasks(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }


  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
