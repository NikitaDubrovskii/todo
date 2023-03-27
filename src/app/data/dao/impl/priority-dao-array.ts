import {PriorityDao} from "../interface/priority-dao";
import {Priority} from "../../../model/priority";
import {Observable} from "rxjs";

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
    // @ts-ignore
    return undefined;
  }

  update(t: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
