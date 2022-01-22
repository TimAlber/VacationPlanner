import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { VacPlansService } from '../vac-plans.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})

// This component is for the your-stats component and displays the ratio of taken vacation days to still left vacation days.
export class DonutChartComponent implements OnInit {
  takenDays: number;
  totalDays: number;
  lastYearTime: number;
  title = 'Your Vacation days and how much you have left.';
  type = 'PieChart';
  data = [['Taken Vacation Days', 24 - 0], ['Vacation days you got left', 0]];
  columnNames = ['Browser', 'Percentage'];
  options = {
    pieHole: 0.4
  };
  width = 550;
  height = 400;

  constructor(
    public auth: AuthService,
    private angularFireAuth: AngularFireAuth,
    private student: VacPlansService,
    private afs: AngularFirestore
  ) {}
// Display the vacation data as donut-chart
  ngOnInit() {
    this.afs
      .collection('users')
      .doc(this.angularFireAuth.auth.currentUser.uid)
      .valueChanges()
      .pipe(take(1))
      .subscribe(source => {
        // @ts-ignore
        this.takenDays = source.vacdaystaken;
        // @ts-ignore
        this.totalDays = source.vacdaystotal;
        // @ts-ignore
        this.lastYearTime = source.lastYearTime;
        this.title = 'Your Vacation days and how much you have left.';
        this.type = 'PieChart';
        // @ts-ignore
        // @ts-ignore
        this.data = [
          ['Vacation days you got left', (this.totalDays + this.lastYearTime) - this.takenDays],
          ['Taken Vacation Days', this.takenDays]
        ];
        this.columnNames = ['Browser', 'Percentage'];
        this.options = {
          pieHole: 0.5
        };
        this.width = 550;
        this.height = 400;
      });
  }
}
