import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Priority} from "../../model/priority";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  // @ts-ignore
  priorities: Priority[];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>,
              private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onAddPriority(priority: Priority): void {
    this.dataHandler.addPriority(priority).subscribe();
  }

  onDeletePriority(priority: Priority): void {
    this.dataHandler.deletePriority(priority.id).subscribe();
  }

  onUpdatePriority(priority: Priority): void {
    this.dataHandler.updatePriority(priority).subscribe();
  }

}
