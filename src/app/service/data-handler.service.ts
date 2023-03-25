import { Injectable } from '@angular/core';
import {Category} from "../model/category";
import {TestData} from "../data/test-data";
import { Task } from '../model/task';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks)
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories)

  constructor() {
    this.fillTasks()
  }

  fillTasks() {
    this.taskSubject.next(TestData.tasks)
  }

  fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category)
    this.taskSubject.next(tasks)
  }
}
