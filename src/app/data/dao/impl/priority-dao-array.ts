import {PriorityDao} from "../interface/priority-dao";
import {Priority} from "../../../model/priority";
import {Observable, of} from "rxjs";
import {TestData} from "../../test-data";

export class PriorityDaoArray implements PriorityDao {

  add(t: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(t: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
