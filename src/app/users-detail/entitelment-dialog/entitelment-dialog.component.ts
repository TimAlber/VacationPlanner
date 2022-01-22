import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

export interface DialogData {
  days: string;
}

@Component({
  selector: 'app-entitelment-dialog',
  templateUrl: './entitelment-dialog.component.html',
  styleUrls: ['./entitelment-dialog.component.scss']
})
// Helper Class for the popup
export class EntitelmentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EntitelmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
