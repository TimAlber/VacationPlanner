import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { VacPlansService } from '../vac-plans.service';
import {ngxCsv} from 'ngx-csv';
import { ExportToCsv } from 'export-to-csv';
import {timestamp} from 'rxjs-compat/operator/timestamp';
import {arrayToUtcDate} from '@fullcalendar/core/datelib/marker';
import {DatePipe} from '@angular/common';
import {Calendar} from '@fullcalendar/core/Calendar';
import * as assert from 'assert';

// @ts-ignore
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent  implements OnInit {
  private itemDoc: any;


// This Component just takes the approved vacation plans from the other class and pipes them into the table


  // @ts-ignore
  constructor(
    private student: VacPlansService,
    private afs: AngularFirestore,
    public datepipe: DatePipe,
  ) {
  }

  displayedColumns = ['Name', 'Von', 'Bis', 'Length', 'Description', 'Details'];
  // @ts-ignore
  dataSource: unknown[] = new ItemDataSource(this.student);
  csvDataSource = [];

  // @ts-ignore
  usersObx11 = this.student.getanotherUserSnap();
  options;
  indexOfAsset: number;

  private unixTimestamp: number;
  element = new Date(this.unixTimestamp * 1000);


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    this.options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Vacation-Plans',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      /* headers: ['Column 1', 'Column 2', 'Column 1', 'Column 2', 'Column 1', 'Column 2', 'Column 1', 'Column 2']*/
    };

    this.usersObx11.subscribe(data => {
      this.dataSource = data;
    });
  }

  // This function is called when the user clicks the csv export button. It loops through the datasource and writes to csvDataSouurce which
  // is passed into the csv file.
  downloadCSV() {
    for (const row of this.dataSource) {
      console.log('row:', row);
      // @ts-ignore
      const vonn = new Date(row.von.seconds * 1000);
      const vons = this.datepipe.transform(vonn, 'dd.MM.yyyy');
      // @ts-ignore
      const bisn = new Date(row.bis.seconds * 1000);
      const biss = this.datepipe.transform(bisn, 'dd.MM.yyyy');

      this.csvDataSource.push({
        // @ts-ignore
        Name: row.Name,
        bis : biss,
        von : vons,
        // @ts-ignore
        description : row.description,
        // @ts-ignore
        diffdays : row.diffdays,
        // @ts-ignore
        daysDeduction : row.daysDeduction,
        // @ts-ignore
        id : row.id,
        // @ts-ignore
        lastProject : row.lastProject,
        // @ts-ignore
        representative : row.representative,
        // @ts-ignore
        representativeId : row.representativeId,
        // @ts-ignore
        state : row.state,
        // @ts-ignore
        userid : row.userid,

      });
    }
    // tslint:disable-next-line:no-unused-expression
    /*new ngxCsv(this.dataSource, 'Vacations-CSV', this.options);*/
    // tslint:disable-next-line:no-unused-expression
    const csvExporter =
      new ExportToCsv(this.options);
    // @ts-ignore
    csvExporter.generateCsv(this.csvDataSource);
  }
}

// extra class to import the Vacation plans

export class ItemDataSource extends DataSource<any> {

  constructor(private student: VacPlansService) {
    super();
  }

  connect() {
    return this.student.getItems();
  }

  disconnect() {}}
