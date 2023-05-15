import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrioritySearchValues} from "../search/SearchObjects";
import {Priority} from "../../../model/priority";
import {PriorityDao} from "../interface/priority-dao";
import {CommonService} from "./common.service";

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class PriorityService extends CommonService<Priority> implements PriorityDao{

  // @ts-ignore
  constructor(private httpClient: HttpClient, @Inject(PRIORITY_URL_TOKEN) private baseUrl) {
    super(httpClient, baseUrl)
  }

  findPriority(prioritySearchValues: PrioritySearchValues) {
    return this.httpClient.post<Priority[]>(this.baseUrl + '/search', PrioritySearchValues);
  }

}
