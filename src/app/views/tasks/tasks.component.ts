import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Task } from 'src/app/model/task';
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  // @ts-ignore
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  tasks: Task[] = [];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.addTableObjects();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task) {
    if (task.completed) {
      return '#F8F9FA';
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

  private refreshTable() {
    this.dataSource.data = this.tasks;
    this.addTableObjects();

    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority' : {
          return task.priority ? task.priority.id : null;
        }
        case 'category' : {
          return task.category ? task.category.title : null;
        }
        case 'date' : {
          return task.date ? task.date : null;
        }
        case 'title' : {
          return task.title;
        }
      }
    }
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
