import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { VacPlansService } from '../vac-plans.service';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { EntitelmentDialogComponent } from './entitelment-dialog/entitelment-dialog.component';

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

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
// Detail screen for each user in the admin area.
// Shows the information about an Vacation that was approved/pending or declined as table.
export class UsersDetailComponent implements OnInit {
  displayedColumns = ['Name', 'Von', 'Bis', 'Length', 'Description', 'Details'];
  state$: Observable<object>;
  userData;
  displayUserData;
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

  globaluid;
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;

  days = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    private student: VacPlansService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  // If the user is an Admin, this will make him/her user
  // Called if the "make admin" button is clicked
  makeemuser() {
    this.afs
      .doc<User>('users/' + this.globaluid)
      .valueChanges()
      .pipe(take(1))
      .subscribe(source => {
        source.role = 'USER';
        this.afs
          .collection('users')
          .doc(this.globaluid)
          .update(source);
      });
  }
  // If the user is an User, this will make him/her an Admin
  // Called if the "make User" button is clicked
  makeemadmin() {
    this.afs
      .doc<User>('users/' + this.globaluid)
      .valueChanges()
      .pipe(take(1))
      .subscribe(source => {
        source.role = 'ADMIN';
        this.afs
          .collection('users')
          .doc(this.globaluid)
          .update(source);
      });
  }
// Makes the user Part Time Worker
  makePart() {
    this.afs
      .doc<User>('users/' + this.globaluid)
      .valueChanges()
      .pipe(take(1))
      .subscribe(source => {
        if (source.vacdaystaken === 0) {
        source.partTime = true;
        source.vacdaystotal = 15;
        this.afs
          .collection('users')
          .doc(this.globaluid)
          .update(source);
        } else {
          this.snackBar.open(
            'You can only do this, if the User has no taken vacation days.',
            'Close',
            { duration: 4000 }
          );
        }
      });
  }
// Makes the user Ful time worker
  makeFull() {
    this.afs
      .doc<User>('users/' + this.globaluid)
      .valueChanges()
      .pipe(take(1))
      .subscribe(source => {
        if (source.vacdaystaken === 0) {
        source.partTime = false;
        source.vacdaystotal = 24;
        this.afs
          .collection('users')
          .doc(this.globaluid)
          .update(source);
        } else {
          this.snackBar.open(
            'You can only do this, if the User has no taken vacation days.',
            'Close',
            { duration: 4000 }
          );
        }
      });
  }
  // Opens the Popup that asks for another vacation entitlement
  openDialog(): void {
    const dialogRef = this.dialog.open(EntitelmentDialogComponent, {
      width: '250px',
      data: { animal: this.days }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.days = result;
      if (this.days) {
        this.afs
          .doc<User>('users/' + this.globaluid)
          .valueChanges()
          .pipe(take(1))
          .subscribe(source => {
            source.vacdaystotal = Number(this.days);
            this.afs
              .collection('users')
              .doc(this.globaluid)
              .update(source);
          });
      }
    });
  }

  // Gets all the Pending, approved and denied vacation plans of this user and pipe em in the tables
  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.subscribe(uid => {
      // @ts-ignore
      this.globaluid = uid.uid;
      // @ts-ignore
      this.userData = this.student.getCertainUser(uid.uid);
      this.userData.subscribe(source => {
        this.displayUserData = source;
      });
    });

    this.pendingDataSource.subscribe(source => {
      for (const entry of source) {
        // @ts-ignore
        if (entry.userid === this.displayUserData.uid) {
          /*used ts-ignore*/
          this.newsource.push(entry);
        }
      }
      this.pdataSource = new MatTableDataSource(this.newsource);
    });
    this.approvedDataSource.subscribe(source => {
      for (const entry of source) {
        // @ts-ignore
        if (entry.userid === this.displayUserData.uid) {
          /*used ts-ignore*/
          this.newasource.push(entry);
        }
      }
      this.adataSource = new MatTableDataSource(this.newasource);
    });

    this.declinedDataSource.subscribe(source => {
      for (const entry of source) {
        // @ts-ignore
        if (entry.userid === this.displayUserData.uid) {
          /*used ts-ignore*/
          this.newdsource.push(entry);
        }
      }
      this.ddataSource = new MatTableDataSource(this.newdsource);
    });
  }
}
