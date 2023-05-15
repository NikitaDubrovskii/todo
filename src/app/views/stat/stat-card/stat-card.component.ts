import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {

  @Input()
  completed = false;

  // @ts-ignore
  @Input() iconName: string;

  @Input()
  count1: any;

  @Input()
  count2: any;

  // @ts-ignore
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}

