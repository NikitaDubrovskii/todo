import {CommonDao} from "./common-dao";
import {Category} from "../../../model/category";
import {Observable} from "rxjs";

export interface CategoryDao extends CommonDao<Category> {

  search(title: string): Observable<Category[]>;

}
