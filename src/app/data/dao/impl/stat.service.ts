import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryDao} from "../interface/category-dao";
import {Category} from "../../../model/category";
import {Observable} from "rxjs";
import {CategorySearchValues} from "../search/SearchObjects";
import {StatDao} from "../interface/stat-dao";
import {Stat} from "../../../model/stat";
import {CommonService} from "./common.service";

export const STAT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class StatService implements StatDao{
  // @ts-ignore
  constructor(private httpClient: HttpClient, @Inject(STAT_URL_TOKEN) private baseUrl) { }

  getOverallStat(): Observable<Stat> {
    return this.httpClient.get<Stat>(this.baseUrl);
  }

}
