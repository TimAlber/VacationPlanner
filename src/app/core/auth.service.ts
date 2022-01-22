import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { VacPlansService } from '../vac-plans.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import { take } from 'rxjs/operators';
import {PartTimeDialogComponent} from './part-time-dialog/part-time-dialog.component';

// Just the User interface
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
  part: string;
}


@Injectable({
  providedIn: 'root'
})
// This class is a service used to log the user in or out or set auth guards.
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    // Get auth data, then get firestore user document
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  // Login using the google auth service
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.alreadyexists(provider);
  }
  // Log in using google and write new user to database if no user document exists and 'syqlo' is in email.
  // If exists just log in and leave data as is.
  async alreadyexists(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      if (credential.user.email.includes('@syqlo.com')) {
        this.afs
          .collection('users', ref => ref.where('uid', '==', credential.user.uid))
          .snapshotChanges()
          .pipe(take(1))
          .subscribe(res => {
            if (!(res.length > 0)) {
              // First time user
              this.updateUserData(credential.user);
            }
          });
      } else {
        this.signOut();
        this.snackBar.open(
          'This Web App is only for employees of the syqlo GmbH. Please leave.',
          'Close',
          {
            duration: 7000
          }
        );
      }
    });
  }

  // If new user logs in first time this function is called
  // It writes the default values to the new user document, after asking the user for fulltime or parttime
  private async updateUserData(user) {
    // Sets user data to firestore on login
    const dialogRef = this.dialog.open(PartTimeDialogComponent, {
      width: '250px',
      data: { part : '' }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result === 'full-time') {
          console.log('(full time) result: ', result);
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
          );
          const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: 'USER',
            vacdaystotal: 30,
            vacdaystaken: 0,
            partTime: false,
            lastYearTime: 0
          };
          return userRef.set(data, { merge: true });
        } else {
          console.log('(part time) result: ', result);
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
          );
          const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: 'USER',
            vacdaystotal: 15,
            vacdaystaken: 0,
            partTime: true,
            lastYearTime: 0
          };
          return userRef.set(data, { merge: true });
        }
      }
    });



  }

  // Sign out function that after completing navigates the user to login screen
signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}

// This class is used to make sure the pages belonging to the admin area can only be accessed by admins.
export class AlwaysAuthGuard implements CanActivate {
  result = true;
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore
  ) {}

  // can activate function for the admin area
  canActivate() {
    this.itemDoc = this.afs.doc<User>(
      'users/' + this.angularFireAuth.auth.currentUser.uid
    );
    this.item = this.itemDoc.valueChanges();
    this.item.pipe(take(1)).subscribe(source => {
      if (source.role === 'ADMIN') {
        this.result = true;
      } else {
        this.snackBar.open(
          'Your are not an Admin so you cant go to this area.',
          'Close',
          {
            duration: 4000
          }
        );
        this.result = false;
      }
    });
    return this.result;
  }
}
