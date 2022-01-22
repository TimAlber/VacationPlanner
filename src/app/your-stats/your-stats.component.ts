import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { VacPlansService } from '../vac-plans.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireAuth } from '@angular/fire/auth';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-your-stats',
  templateUrl: './your-stats.component.html',
  styleUrls: ['./your-stats.component.scss']
})
// This is the Stats for the logged in user. Only the admins and the user can see this data.
export class YourStatsComponent implements OnInit {
  displayedColumns = ['Name', 'Von', 'Bis', 'Length', 'Description', 'Details'];
  panelOpenState = false;
  pendingDataSource = this.student.getPendingItems();
  newsource = [];
  pdataSource;
  approvedDataSource = this.student.getItems();
  newasource = [];
  adataSource;
  declinedDataSource = this.student.getDeclinedItems();
  newdsource = [];
  ddataSource;

  constructor(
    private student: VacPlansService,
    private afs: AngularFirestore,
    public auth: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {}


  // Getting all the approved, declined or pending vacation plan for the loggedin user to pipe them into the tables
  ngOnInit() {
    this.pendingDataSource.pipe(take(1)).subscribe(source => {
      for (const entry of source) {
        // @ts-ignore
        if (entry.userid === this.angularFireAuth.auth.currentUser.uid) {
          /*used ts-ignore*/
          this.newsource.push(entry);
        }
      }
      this.pdataSource = new MatTableDataSource(this.newsource);
    });

    this.approvedDataSource.pipe(take(1)).subscribe(source => {
      for (const entry of source) {
        // @ts-ignore
        if (entry.userid === this.angularFireAuth.auth.currentUser.uid) {
          /*used ts-ignore*/
          this.newasource.push(entry);
        }
      }
      this.adataSource = new MatTableDataSource(this.newasource);
    });

    this.declinedDataSource.pipe(take(1)).subscribe(source => {
      for (const entry of source) {
        // @ts-ignore
        if (entry.userid === this.angularFireAuth.auth.currentUser.uid) {
          /*used ts-ignore*/
          this.newdsource.push(entry);
        }
      }
      this.ddataSource = new MatTableDataSource(this.newdsource);
    });
  }
}
