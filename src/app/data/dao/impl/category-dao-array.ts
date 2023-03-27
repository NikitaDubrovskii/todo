import {CategoryDao} from "../interface/category-dao";
import {Category} from "../../../model/category";
import {Observable, of} from "rxjs";
import {TestData} from "../../test-data";

export class CategoryDaoArray implements CategoryDao {

  add(t: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    // @ts-ignore
    return undefined;
  }

  update(t: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

}
