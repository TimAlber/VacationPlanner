import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { VacPlansService } from '../vac-plans.service';
import { AngularFirestore } from '@angular/fire/firestore';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
  vacdaystotal?: number;
  vacdaystaken?: number;
  partTime: boolean;
  lastYearTime: number;
}

@Component({
  selector: 'app-user-donut-chart',
  templateUrl: './user-donut-chart.component.html',
  styleUrls: ['./user-donut-chart.component.scss']
})
// This component is the Donut chart in the user detail page in the admin area
export class UserDonutChartComponent implements OnInit {
  @Input() User: User;
  takenDays: number;
  title = 'The Vacation days and how much the User got left.';
  type = 'PieChart';
  data = [['Taken Vacation Days', 0], ['Vacation days you got left', 24 - 0]];
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
// shows the vacation days
  ngOnInit() {
    this.title = 'The Vacation days and how much the User got left.';
    this.type = 'PieChart';
    this.data = [
      ['Vacation days you got left',
        (this.User.vacdaystotal + this.User.lastYearTime) - this.User.vacdaystaken
      ], ['Taken Vacation Days', this.User.vacdaystaken]
    ];
    this.columnNames = ['Browser', 'Percentage'];
    this.options = {
      pieHole: 0.4
    };
    this.width = 550;
    this.height = 400;
  }
}
