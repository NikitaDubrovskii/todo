import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {IntroService} from "../../service/intro.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {DialogAction} from "../../object/DialogResult";
import {Priority} from "../../model/priority";

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

  @Output()
  settingsChanged = new EventEmitter<Priority[]>();

  // @ts-ignore
  isMobile: boolean;

  constructor(private dialog: MatDialog,
              private introService: IntroService,
              private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
  }

  showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === DialogAction.SETTINGS_CHANGE) {
        this.settingsChanged.emit(result.obj);
        return;
      }
    });
  }

  showIntroHelp() {
    this.introService.startIntroJS(false);
  }

  onToggleStat() {
    this.toggleStat.emit(!this.showStat);
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
