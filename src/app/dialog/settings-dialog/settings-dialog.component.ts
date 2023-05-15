import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Priority} from "../../model/priority";
import {PriorityService} from "../../data/dao/impl/priority.service";
import {DialogAction, DialogResult} from "../../object/DialogResult";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
  // @ts-ignore
  priorities: Priority[];
  settingsChanged = false;

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>,
              private priorityService: PriorityService) {
  }

  ngOnInit() {
    this.priorityService.findAll().subscribe(priorities => this.priorities = priorities);
  }

  close() {
    if (this.settingsChanged) {
      this.dialogRef.close(new DialogResult(DialogAction.SETTINGS_CHANGE, this.priorities));
    } else {
      this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
    }
  }

  addPriority(priority: Priority): void {
    this.settingsChanged = true;
    this.priorityService.add(priority).subscribe(result => {
      this.priorities.push(result);
    });
  }

  deletePriority(priority: Priority): void {
    this.settingsChanged = true;
    this.priorityService.delete(priority.id).subscribe(() => {
        this.priorities.splice(this.getPriorityIndex(priority), 1);
      }
    );
  }

  updatePriority(priority: Priority): void {
    this.settingsChanged = true;
    this.priorityService.update(priority).subscribe(() => {
        this.priorities[this.getPriorityIndex(priority)] = priority;
      }
    );
  }

  getPriorityIndex(priority: Priority): number {
    const tmpPriority = this.priorities.find(t => t.id === priority.id);
    // @ts-ignore
    return this.priorities.indexOf(tmpPriority);
  }

}
