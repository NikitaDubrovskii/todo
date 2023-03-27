import { Injectable } from '@angular/core';
import {Category} from "../model/category";
import {TestData} from "../data/test-data";
import { Task } from '../model/task';
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDaoArray} from "../data/dao/impl/task-dao-array";
import {CategoryDaoArray} from "../data/dao/impl/category-dao-array";
import {Priority} from "../model/priority";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDaoArray();
  private categoryDaoArray = new CategoryDaoArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

}
