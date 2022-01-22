import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  part: string;
}

@Component({
  selector: 'app-part-time-dialog',
  templateUrl: './part-time-dialog.component.html',
  styleUrls: ['./part-time-dialog.component.scss']
})

export class PartTimeDialogComponent implements OnInit {
  ngOnInit() {
  }
  constructor(
    public dialogRef: MatDialogRef<PartTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
