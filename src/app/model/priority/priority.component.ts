import { Component } from '@angular/core';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent {
  id: number;
  title: string;
  color: string;


  constructor(id: number, title: string, color: string) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
}
