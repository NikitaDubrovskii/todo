import {Component, OnInit} from '@angular/core';
import {Task} from './model/task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/category";
import {Priority} from "./model/priority";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  searchCategoryText = '';
  // @ts-ignore
  totalTasksCountInCategory: number;
  // @ts-ignore
  completedCountInCategory: number;
  // @ts-ignore
  uncompletedCountInCategory: number;
  // @ts-ignore
  uncompletedTotalTasksCount: number;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.updateTasksAndStat();
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.updateTasksAndStat();
    });
  }

  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(() => {
      // @ts-ignore
      this.selectedCategory = null;
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
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

  onAddTask(task: Task): void {
    this.dataHandler.addTask(task).subscribe(() => {
      this.updateTasksAndStat();
    })
  }

  onAddCategory(title: string): void {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategory());
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

  private updateCategory() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSearchCategory(title: string): void {
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  private updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())

      .subscribe(array => {
        // @ts-ignore
        this.totalTasksCountInCategory = array[0];
        // @ts-ignore
        this.completedCountInCategory = array[1];
        // @ts-ignore
        this.uncompletedCountInCategory = array[2];
        // @ts-ignore
        this.uncompletedTotalTasksCount = array[3];
      });
  }

}
