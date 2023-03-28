import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Task } from 'src/app/model/task';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/category";
import {Priority} from "../../model/priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit{

  // @ts-ignore
  dialogTitle: string;
  // @ts-ignore
  task: Task;

  // @ts-ignore
  categories: Category[];
  // @ts-ignore
  priorities: Priority[];

  // @ts-ignore
  tmpTitle: string;
  // @ts-ignore
  tmpCategory: Category;
  // @ts-ignore
  tmpPriority: Priority;

  constructor(private dialogRef: MatDialogRef<EditTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [Task, string],
              private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

    this.tmpTitle = this.task.title;
    // @ts-ignore
    this.tmpCategory = this.task.category;
    // @ts-ignore
    this.tmpPriority = this.task.priority;

    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);
    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;

    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
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
      if (result) {
        this.dialogRef.close('delete');
      }
    })
  }

  complete(): void {
    this.dialogRef.close('complete');
  }

  activate(): void {
    this.dialogRef.close('activate');
  }
}
