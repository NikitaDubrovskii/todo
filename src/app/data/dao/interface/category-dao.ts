import {CommonDao} from "./common-dao";
import {Category} from "../../../model/category";
import {Observable} from "rxjs";
import {CategorySearchValues} from "../search/SearchObjects";

export interface CategoryDao extends CommonDao<Category> {

  findCategories(categorySearchValues: CategorySearchValues): Observable<any>;

}
