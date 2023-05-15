import {CommonDao} from "./common-dao";
import {Priority} from "../../../model/priority";
import {PrioritySearchValues} from "../search/SearchObjects";
import {Observable} from "rxjs";

export interface PriorityDao extends CommonDao<Priority> {

  findPriority(prioritySearchValues: PrioritySearchValues): Observable<any>;

}
