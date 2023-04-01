import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  // @ts-ignore
  @Input() totalTasksInCategory: number;

  // @ts-ignore
  @Input() completeTasksInCategory: number;

  // @ts-ignore
  @Input() uncompleteTasksInCategory: number;

  constructor() {

  }

  ngOnInit() {

  }

}
