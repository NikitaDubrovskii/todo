import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {IntroService} from "../../service/intro.service";
import {DeviceDetectorService} from "ngx-device-detector";

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

  @Output()
  toggleMenu = new EventEmitter();

  // @ts-ignore
  isMobile: boolean;

  constructor(private dialog: MatDialog,
              private introService: IntroService,
              private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
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

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
