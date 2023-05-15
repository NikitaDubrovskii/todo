import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from 'src/app/model/task';
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {DialogAction, DialogResult} from "../../object/DialogResult";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit{
  // @ts-ignore
  categories: Category[];
  // @ts-ignore
  priorities: Priority[];

  isMobile = this.deviceService.isMobile();

  // @ts-ignore
  dialogTitle: string;
  // @ts-ignore
  task: Task;

  // @ts-ignore
  newTitle: string;
  // @ts-ignore
  newPriorityId: number;
  // @ts-ignore
  newCategoryId: number | null;
  // @ts-ignore
  newDate: Date | null;

  // @ts-ignore
  oldCategoryId: number | null;

  canDelete = true;
  canComplete = true;

  today = new Date();

  constructor(private dialogRef: MatDialogRef<EditTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [Task, string, Category[], Priority[]],
              private dialog: MatDialog,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.categories = this.data[2];
    this.priorities = this.data[3];

    if (this.task && this.task.id > 0) {
      this.canDelete = true;
      this.canComplete = true;
    }

    this.newTitle = this.task.title;

    if (this.task.priority) {
      this.newPriorityId = this.task.priority.id;
    }

    if (this.task.category) {
      this.newCategoryId = this.task.category.id;
      this.oldCategoryId = this.task.category.id;
    }

    if (this.task.date) {
      this.newDate = new Date(this.task.date);
    }
  }

  confirm(): void {
    this.task.title = this.newTitle;
    this.task.priority = this.findPriorityById(this.newPriorityId);
    // @ts-ignore
    this.task.cat = this.findCategoryById(this.newCategoryId);
    // @ts-ignore
    this.task.oldCategory = this.findCategoryById(this.oldCategoryId);

    if (!this.newDate) {
      this.task.date = null;
    } else {
      this.task.date = this.newDate;
    }

    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.task));
  }

  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }
      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }

  complete(): void {
    this.dialogRef.close(new DialogResult(DialogAction.COMPLETE));
  }

  activate(): void {
    this.dialogRef.close(new DialogResult(DialogAction.ACTIVATE));
  }

  private findPriorityById(tmpPriorityId: number): Priority {
    // @ts-ignore
    return this.priorities.find(t => t.id === tmpPriorityId);
  }

  private findCategoryById(tmpCategoryId: number): Category {
    // @ts-ignore
    return this.categories.find(t => t.id === tmpCategoryId);
  }

  addDays(days: number) {
    this.newDate = new Date();
    this.newDate.setDate(this.today.getDate() + days);
  }

  setToday() {
    this.newDate = this.today;
  }
}
