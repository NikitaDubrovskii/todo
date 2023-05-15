import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryDao} from "../interface/category-dao";
import {Category} from "../../../model/category";
import {CategorySearchValues} from "../search/SearchObjects";
import {CommonService} from "./common.service";

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CategoryService extends CommonService<Category> implements CategoryDao{
  // @ts-ignore
  constructor(private httpClient: HttpClient, @Inject(CATEGORY_URL_TOKEN) private baseUrl) {
    super(httpClient, baseUrl);
  }

  findCategories(categorySearchValues: CategorySearchValues) {
    return this.httpClient.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }


}
