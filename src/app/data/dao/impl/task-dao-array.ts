import {TaskDao} from "../interface/task-dao";
import {Category} from "../../../model/category";
import {Priority} from "../../../model/priority";
import {Observable, of} from "rxjs";
import { Task } from "src/app/model/task";
import {TestData} from "../../test-data";

export class TaskDaoArray implements TaskDao {

  add(t: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Task> {
    // @ts-ignore
    return undefined;
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

  update(t: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority) {
    let allTasks = TestData.tasks;
    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }
    return allTasks;
  }
}
