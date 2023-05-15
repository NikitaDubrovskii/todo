import {Category} from "./category";
import {Priority} from "./priority";

export class Task {
  id: number;
  title: string;
  completed: number;
  priority: Priority | undefined;
  category: Category | undefined;
  date: Date | any;
  oldCategory: Category | undefined;

  constructor(id: number, title: string, completed: number, priority?: Priority, category?: Category, date?: Date, oldCategory?: Category) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.oldCategory = oldCategory;
    this.date = date;
  }
}
