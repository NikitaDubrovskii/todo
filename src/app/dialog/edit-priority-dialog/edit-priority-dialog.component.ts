import {Component, Inject, OnInit} from '@angular/core';
import {OpenType} from "../open-type";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  // @ts-ignore
  dialogTitle: string;
  // @ts-ignore
  priorityTitle: string;
  // @ts-ignore
  openType: OpenType;

  constructor(private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string, OpenType],
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.openType = this.data[2];
  }

  onConfirm(): void {
    this.dialogRef.close(this.priorityTitle);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить приоритет: "${this.priorityTitle}"? (в задачи проставится '')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  canDelete(): boolean {
    return this.openType == OpenType.EDIT;
  }
}
