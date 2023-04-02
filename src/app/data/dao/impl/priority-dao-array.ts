import {PriorityDao} from "../interface/priority-dao";
import {Priority} from "../../../model/priority";
import {Observable, of} from "rxjs";
import {TestData} from "../../test-data";

export class PriorityDaoArray implements PriorityDao {

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return of(TestData.priorities.find(priority => priority.id === id));
  }

  getAll(): Observable<Priority[]> {

    return of(TestData.priorities);
  }

  add(priority: Priority): Observable<Priority> {
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority();
    }
    TestData.priorities.push(priority);
    return of(priority);
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        // @ts-ignore
        task.priority = null;
      }
    });

    const tmpPriority = TestData.priorities.find(t => t.id === id);
    // @ts-ignore
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);

    // @ts-ignore
    return of(tmpPriority);
  }

  update(priority: Priority): Observable<Priority> {
    const tmp = TestData.priorities.find(t => t.id === priority.id);
    // @ts-ignore
    TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1, priority);
    return of(priority);
  }

  private getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(c => c.id)) + 1;
  }

}
