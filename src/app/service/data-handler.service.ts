import { Injectable } from '@angular/core';
import {Category} from "../model/category";
import {TestData} from "../data/test-data";
import { Task } from '../model/task';
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDaoArray} from "../data/dao/impl/task-dao-array";
import {CategoryDaoArray} from "../data/dao/impl/category-dao-array";
import {Priority} from "../model/priority";
import {PriorityDaoArray} from "../data/dao/impl/priority-dao-array";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDaoArray();
  private categoryDaoArray = new CategoryDaoArray();
  private priorityDaoArray = new PriorityDaoArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id);
  }
}
