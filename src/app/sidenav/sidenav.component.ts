import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacPlansService } from '../vac-plans.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss']
})
// Sidenav component loads on every route
export class SidenavComponent implements OnInit {
  // implements OnInit
  events: string[] = [];
  opened: boolean;
  userData;
  displayUserData;
  displayAdmin = false;
  displayButton = false;

  displayProgressSpinner = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  constructor(
    private student: VacPlansService,
    private angularFireAuth: AngularFireAuth
  ) {}

  theUid() {
    return this.angularFireAuth.auth.currentUser.uid;
  }
// Check if user is Admin and show the admin area in the sidenav or not
  async ngOnInit() {
    this.displayProgressSpinner = true;
    await setTimeout(() => {
      try {
        this.userData = this.student.getCertainUser(this.theUid());
        this.userData.subscribe(source => {
          if (source.role === 'ADMIN') {
            this.displayAdmin = true;
          } else {
            this.displayAdmin = false;
          }
        });
      } catch (e) {
        this.displayAdmin = false;
      }
      this.displayProgressSpinner = false;
    }, 2000);
  }
}
