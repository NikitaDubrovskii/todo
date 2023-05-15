import {CommonDao} from "./common-dao";
import {Task} from "../../../model/task";
import {Observable} from "rxjs";
import {TaskSearchValues} from "../search/SearchObjects";

export interface TaskDao extends CommonDao<Task> {

  findTasks(taskSearchValues: TaskSearchValues): Observable<any>;

}
