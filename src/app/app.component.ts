import {Component, OnInit} from '@angular/core';
import {Task} from './model/task';
import {Category} from "./model/category";
import {Priority} from "./model/priority";
import {Observable} from "rxjs";
import {IntroService} from "./service/intro.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {CategoryService} from "./data/dao/impl/category.service";
import {CategorySearchValues, TaskSearchValues} from "./data/dao/search/SearchObjects";
import {TaskService} from "./data/dao/impl/task.service";
import {PageEvent} from "@angular/material/paginator";
import {PriorityService} from "./data/dao/impl/priority.service";
import {Stat} from "./model/stat";
import {DashboardData} from "./object/dashboard-data";
import {StatService} from "./data/dao/impl/stat.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // @ts-ignore
  selectedCategory: Category = null;

  // @ts-ignore
  isMobile: boolean;
  // @ts-ignore
  isDesktop: boolean;

  showStat = true;
  showSearch = true;

  // @ts-ignore
  categories: Category[];
  // @ts-ignore
  tasks: Task[];
  // @ts-ignore
  priorities: Priority[];

  // @ts-ignore
  stat: Stat;
  dash: DashboardData = new DashboardData();

  // @ts-ignore
  menuOpened: boolean;
  // @ts-ignore
  menuMode: any;
  // @ts-ignore
  menuPosition: any;
  // @ts-ignore
  showBackdrop: boolean;

  readonly defaultPageSize = 5;
  readonly defaultPageNumber = 0;

  // @ts-ignore
  uncompletedCountForCategoryAll: number;

  // @ts-ignore
  totalTasksFounded: number;

  categorySearchValues = new CategorySearchValues();
  taskSearchValues = new TaskSearchValues();

  constructor(private introService: IntroService,
              private categoryService: CategoryService,
              private taskService: TaskService,
              private statService: StatService,
              private priorityService: PriorityService,
              private dialog: MatDialog,
              private deviceService: DeviceDetectorService) {
    this.statService.getOverallStat().subscribe((result => {
      this.stat = result;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      this.fillAllCategories().subscribe(res => {
        this.categories = res;
        this.selectCategory(this.selectedCategory);
      });
    }));

    this.isMobile = deviceService.isMobile();
    this.isDesktop = deviceService.isDesktop();
    this.setMenuDisplayParams();
  }

  ngOnInit(): void {
    this.fillAllPriorities();

    if (!this.isMobile && !this.isDesktop) {
      this.introService.startIntroJS(true);
    }
  }

  fillAllPriorities() {
    this.priorityService.findAll().subscribe(result => {
      this.priorities = result;
    })
  }

  fillAllCategories(): Observable<Category[]> {
    return this.categoryService.findAll();
  }

  fillDashData(completedCount: number, uncompletedCount: number) {
    this.dash.completedTotal = completedCount;
    this.dash.uncompletedTotal = uncompletedCount;
  }

  selectCategory(category: Category) {
    if (category) {
      // @ts-ignore
      this.fillDashData(category.completedCount, category.uncompletedCount);
    } else {
      this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
    }

    this.taskSearchValues.pageNumber = 0;
    this.selectedCategory = category;
    this.taskSearchValues.categoryId = category ? category.id : null;
    this.searchTasks(this.taskSearchValues);

    if (this.isMobile) {
      this.menuOpened = false;
    }
  }

  addCategory(category: Category): void {
    this.categoryService.add(category).subscribe(result => {
      this.searchCategory(this.categorySearchValues);
    })
  }

  deleteCategory(category: Category): void {
    // @ts-ignore
    this.categoryService.delete(category.id).subscribe(() => {
      // @ts-ignore
      this.selectedCategory = null;
      this.searchCategory(this.categorySearchValues);
      this.selectCategory(this.selectedCategory);
    })
  }

  updateCategory(category: Category): void {
    this.categoryService.update(category).subscribe(() => {
      this.searchCategory(this.categorySearchValues);
      this.searchTasks(this.taskSearchValues);
    })
  }

  searchCategory(categorySearchValues: CategorySearchValues) {
    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result;
    })
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

  toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }

  searchTasks(taskSearchValues: TaskSearchValues) {
    this.taskSearchValues = taskSearchValues;

    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {
      if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
        this.taskSearchValues.pageNumber = 0;
        this.searchTasks(this.taskSearchValues);
      }

      this.totalTasksFounded = result.totalElements;
      this.tasks = result.content;
    });
  }

  updateOverallCounter() {
    this.statService.getOverallStat().subscribe((res => {
      this.stat = res;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;
      if (!this.selectedCategory) {
        this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
      }
    }));
  }

  updateCategoryCounter(category: Category) {
    // @ts-ignore
    this.categoryService.findById(category.id).subscribe(cat => {
      this.categories[this.getCategoryIndex(category)] = cat;
      this.showCategoryDashboard(cat);
    });
  }

  showCategoryDashboard(cat: Category) {
    if (this.selectedCategory && this.selectedCategory.id === cat.id) {
      // @ts-ignore
      this.fillDashData(cat.completedCount, cat.uncompletedCount);
    }
  }

  addTask(task: Task): void {
    this.taskService.add(task).subscribe(result => {
      if (task.category) {
        this.updateCategoryCounter(task.category);
      }
      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  deleteTask(task: Task): void {
    this.taskService.delete(task.id).subscribe(result => {
      if (task.category) {
        this.updateCategoryCounter(task.category);
      }
      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  updateTask(task: Task): void {
    this.taskService.update(task).subscribe(() => {
      if (task.oldCategory) {
        this.updateCategoryCounter(task.oldCategory);
      }
      if (task.category) {
        this.updateCategoryCounter(task.category);
      }
      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

  onClosedMenu(): void {
    this.menuOpened = false;
  }

  setMenuDisplayParams(): void {
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

  paging(pageEvent: PageEvent) {
    if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
      this.taskSearchValues.pageNumber = 0;
    } else {
      this.taskSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.taskSearchValues.pageSize = pageEvent.pageSize;
    this.taskSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchTasks(this.taskSearchValues);
  }

  settingsChanged(priorities: Priority[]): void {
    //this.fillAllPriorities();
    this.priorities = priorities;
    this.searchTasks(this.taskSearchValues);
  }

  getCategoryFromArray(id: number): any {
    const tmpCategory = this.categories.find(t => t.id === id);
    return tmpCategory;
  }

  getCategoryIndex(category: Category): number {
    const tmpCategory = this.categories.find(t => t.id === category.id);
    // @ts-ignore
    return this.categories.indexOf(tmpCategory);
  }

  getCategoryIndexById(id: number): number {
    const tmpCategory = this.categories.find(t => t.id === id);
    // @ts-ignore
    return this.categories.indexOf(tmpCategory);
  }

}
