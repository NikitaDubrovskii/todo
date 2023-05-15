import {Component, Input, OnInit} from '@angular/core';
import {DashboardData} from "../../object/dashboard-data";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  // @ts-ignore
  @Input() showStat: boolean;

  // @ts-ignore
  @Input() dash: DashboardData;

  constructor() {
  }

  ngOnInit() {
  }

  getTotal(): any {
    if (this.dash) {
      // @ts-ignore
      return this.dash.completedTotal + this.dash.uncompletedTotal;
    }
  }

  getCompletedCount(): any {
    if (this.dash) {
      return this.dash.completedTotal;
    }
  }

  getUncompletedCount(): any {
    if (this.dash) {
      return this.dash.uncompletedTotal;
    }
  }

  getCompletedPercent(): any{
    if (this.dash) {
      return this.dash.completedTotal ? (this.dash.completedTotal / this.getTotal()) : 0;
    }
  }

  getUncompletedPercent(): any{
    if (this.dash) {
      return this.dash.uncompletedTotal ? (this.dash.uncompletedTotal / this.getTotal()) : 0;
    }
  }

}
