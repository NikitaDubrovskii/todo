import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {IntroService} from "../../service/intro.service";

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

  constructor(private dialog: MatDialog,
              private introService: IntroService) {
  }

  ngOnInit() {
  }

  onToggleStat() {
    this.toggleStat.emit(!this.showStat);
  }

  showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px'
    });
  }

  showIntroHelp() {
    this.introService.startIntroJS(false);
  }
}
