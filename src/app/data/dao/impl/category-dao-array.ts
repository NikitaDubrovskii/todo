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
    TestData.tasks.forEach(task =>{
      if (task.category && task.category.id === id) {
        // @ts-ignore
        task.category = null;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id);
    // @ts-ignore
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
    // @ts-ignore
    return of(tmpCategory);
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

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    // @ts-ignore
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);
    // @ts-ignore
    return of(tmpCategory)
  }

}
