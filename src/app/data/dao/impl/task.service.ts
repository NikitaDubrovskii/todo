import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskSearchValues} from "../search/SearchObjects";
import {TaskDao} from "../interface/task-dao";
import {Task} from 'src/app/model/task';
import {CommonService} from "./common.service";

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class TaskService extends CommonService<Task> implements TaskDao{
  // @ts-ignore
  constructor(private httpClient: HttpClient, @Inject(TASK_URL_TOKEN) private baseUrl) {
    super(httpClient, baseUrl)
  }

  findTasks(taskSearchValues: TaskSearchValues) {
    return this.httpClient.post<any>(this.baseUrl + '/search', taskSearchValues);
  }

}
