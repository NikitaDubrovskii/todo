import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  @Input() categoryName: string;

  // @ts-ignore
  @Input() showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onToggleStat() {
    this.toggleStat.emit(!this.showStat);
  }
}
