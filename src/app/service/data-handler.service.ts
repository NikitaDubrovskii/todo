import { Injectable } from '@angular/core';
import {Category} from "../model/category";
import {TestData} from "../data/test-data";
import { Task } from '../model/task';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new Subject<Task[]>()

  constructor() {

  }

  getCategories(): Category[] {
    return TestData.categories
  }

  fillTasks() {
    this.taskSubject.next(TestData.tasks)
  }

  fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category)
    this.taskSubject.next(tasks)
  }
}
