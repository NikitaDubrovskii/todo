import {TaskDao} from "../interface/task-dao";
import {Category} from "../../../model/category";
import {Priority} from "../../../model/priority";
import {Observable, of} from "rxjs";
import { Task } from "src/app/model/task";
import {TestData} from "../../test-data";

export class TaskDaoArray implements TaskDao {

  add(task: Task): Observable<Task> {
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);
    return of(task);
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === id);
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

    // @ts-ignore
    return of(taskTmp);
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCount(): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id);
    // @ts-ignore
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority) {
    let allTasks = TestData.tasks;

    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }
    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }
    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }
    if (searchText != null) {
      allTasks = allTasks.filter(task =>
        task.title.toString().toUpperCase().includes(searchText.toString().toUpperCase())
      );
    }

    return allTasks;
  }

  private getLastIdTask() {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }
}
