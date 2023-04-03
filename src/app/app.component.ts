import {Component, OnInit} from '@angular/core';
import {Task} from './model/task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/category";
import {Priority} from "./model/priority";
import {concatMap, map, zip} from "rxjs";
import {IntroService} from "./service/intro.service";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  categoryMap = new Map<Category, number>();

  // @ts-ignore
  tasks: Task[];
  // @ts-ignore
  categories: Category[];
  // @ts-ignore
  priorities: Priority[];

  // @ts-ignore
  selectedCategory: Category;

  searchTaskText = '';
  // @ts-ignore
  statusFilter: boolean;
  // @ts-ignore
  priorityFilter: Priority;
  searchCategoryText = '';
  // @ts-ignore
  totalTasksCountInCategory: number;
  // @ts-ignore
  completedCountInCategory: number;
  // @ts-ignore
  uncompletedCountInCategory: number;
  // @ts-ignore
  uncompletedTotalTasksCount: number;
  showStat = true;

  // @ts-ignore
  menuOpened: boolean;
  // @ts-ignore
  menuMode: any;
  // @ts-ignore
  menuPosition: any;
  // @ts-ignore
  showBackdrop: boolean;

  // @ts-ignore
  isMobile: boolean;
  // @ts-ignore
  isDesctop: boolean;

  constructor(private dataHandler: DataHandlerService,
              private introService: IntroService,
              private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
    this.isDesctop = deviceService.isDesktop();
    this.showStat = true ? !this.isMobile : false;
    this.setMenuValues();
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.fillCategories();
    // @ts-ignore
    this.onSelectCategory(null);

    if (!this.isMobile && !this.isDesctop) {
      this.introService.startIntroJS(true);
    }

    console.log(this.isMobile)
    console.log(this.isDesctop)
  }

  fillCategories(): void {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }
    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

    this.categories.forEach(cat => {
      this.dataHandler.getUncompletedCountInCategory(cat)
        .subscribe(count => this.categoryMap.set(cat, count));
    });
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTasksAndStat();
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).pipe(
      concatMap(t => {
        // @ts-ignore
        return this.dataHandler.getUncompletedCountInCategory(t.category).pipe(map(count => {
          return ({t: task, count});
        }));
      })
    ).subscribe(result => {
      const t = result.t as Task;
      if (t.category) {
        // @ts-ignore
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTasksAndStat();
    })
  }

  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      // @ts-ignore
      this.selectedCategory = null;
      this.categoryMap.delete(cat);
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
    });
  }

  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onSearchTasks(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority): void {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  onAddTask(task: Task): void {
    this.dataHandler.addTask(task).pipe(
      concatMap(task => {
        // @ts-ignore
        return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
          return ({t: task, count});
        }));
      })
    ).subscribe(result => {
      const t = result.t as Task;
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTasksAndStat();
    })
  }

  onAddCategory(title: string): void {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategory());
  }

  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  private updateCategory() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSearchCategory(title: string): void {
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  private updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())

      .subscribe(array => {
        // @ts-ignore
        this.totalTasksCountInCategory = array[0];
        // @ts-ignore
        this.completedCountInCategory = array[1];
        // @ts-ignore
        this.uncompletedCountInCategory = array[2];
        // @ts-ignore
        this.uncompletedTotalTasksCount = array[3];
      });
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

  onClosedMenu(): void {
    this.menuOpened = false;
  }

  setMenuValues(): void {
    this.menuPosition = 'left';

    if (this.isMobile){
      this.menuOpened = false;
      this.menuMode = 'over';
      this.showBackdrop = true;
    } else {
      this.menuOpened = true;
      this.menuMode = 'push';
      this.showBackdrop = false;
    }
  }
}
