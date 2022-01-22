import { Component, OnInit } from "@angular/core";
import {ngxCsv} from 'ngx-csv';
import {AngularFirestore} from '@angular/fire/firestore';
import { VacPlansService } from '../vac-plans.service';
@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss']
})
// This component is the user tab in the admin area. It shows all the Users and their data.
export class UsersChartComponent implements OnInit {
  constructor(private afs: AngularFirestore, private student: VacPlansService) {
  }
  displayedColumns = ["Name", "Email", "Role", "Taken", "Total", "Details"];
  usersObx = this.student.getUsers();
  dataSource;
  options;

  ngOnInit() {
    // tslint:disable-next-line:prefer-const

    this.options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Vacation-CSV',
      useBom: true,
      noDownload: false,
      headers: ['Name', 'EMail', '', 'Part Time Worker', 'Role', 'User_ID', 'Taken Days', 'Days Left']
    };

    // tslint:disable-next-line:no-unused-expression
    this.usersObx.subscribe(data => {
      this.dataSource = data;
    });
  }
  // This Button exports the data from the table to a csv
  downloadCSV() {
    new ngxCsv(this.dataSource, 'Vacations-CSV', this.options);
  }

}
