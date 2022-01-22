import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { VacPlansService } from '../vac-plans.service';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatInput } from '@angular/material/typings/input';
import * as moment from 'moment';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { PublicVacationsService } from '../public-vacations.service';
import { HttpClient } from '@angular/common/http';

// This is an Interface for the User Object
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
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    }
  ]
})
export class AddVacationComponent implements OnInit {
  // Constructor for Dependency Injection of all the services etc.
  constructor(
    private student: VacPlansService,
    public auth: AuthService,
    private angularFireAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private vacService: PublicVacationsService,
    private http: HttpClient
  ) {}

  // This is an array of Link that show all the public vacations for NRW for the next 10 years as a Json.
  vacURL = [
    'https://feiertage-api.de/api/?jahr=2019&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2020&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2021&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2022&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2023&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2024&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2025&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2026&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2027&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2028&nur_land=NW',
    'https://feiertage-api.de/api/?jahr=2029&nur_land=NW'
  ];

  // All the global Variables that are being used.
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  minDate = new Date();
  olddays: number;
  diffdays = 0;
  storedesk = '';
  editmode = false;
  lastProject = '';
  representative = '';
  representativeId = '';
  daysDeduction = 0;
  employee;

  // This is the Object that will hold all the values for one vacation request
  vacDetails = {
    Name: this.angularFireAuth.auth.currentUser.displayName,
    userid: this.angularFireAuth.auth.currentUser.uid,
    description: '',
    id: '',
    state: 'PENDING',
    von: new Date(),
    bis: new Date(),
    diffdays: 0,
    representative: '',
    representativeId: '',
    lastProject: '',
    daysDeduction: 0
  };

  selected: any;
  displayUser = [];

  // This is the onChange Event function for the left Datepicker
  addFromEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.vacDetails.von = event.value;
    this.getBusinessDays(this.vacDetails.von, this.vacDetails.bis);
  }

  // This is the onChange Event function for the right Datepicker
  addToEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.vacDetails.bis = event.value;
    this.getBusinessDays(this.vacDetails.von, this.vacDetails.bis);
  }

  // The ngOnInit is being used to get all the Users for the representation worker drop down.
  // They are stored in the displayUser Array
  ngOnInit() {
    this.student.getUsers().subscribe(users => {
      for (const single of users) {
        // @ts-ignore
        // @ts-ignore
        this.displayUser.push({
          // @ts-ignore
          value: single.uid,
          // @ts-ignore
          viewValue: single.displayName
          // @ts-ignore
        });
      }
    });
  }

  // When the User selects a representation worker in the dropdown this function writes the name and user id in the vacation request object.
  selectedSelect(event) {
    const target = event.source.selected._element.nativeElement;
    this.representativeId = event.value;
    this.representative = target.innerText.trim();
  }

  // This function is called each time a user selects a to or from date.
  // It Calculates the amount of Business Days between the two and the from date.
  // Then the filterPublicHolidays function is called
  getBusinessDays(startDate, endDate) {
    const lastDay = moment(endDate);
    const firstDay = moment(startDate);
    if (startDate <= endDate) {
      if (firstDay.year() === moment().year() && lastDay.year() === moment().year()) {
      let calcBusinessDays =
        1 +
        (lastDay.diff(firstDay, 'days') * 5 -
          (firstDay.day() - lastDay.day()) * 2) /
          7;

      if (lastDay.day() === 6) {
        calcBusinessDays--; // SAT
      }
      if (firstDay.day() === 0) {
        calcBusinessDays--; // SUN
      }
      this.diffdays = calcBusinessDays;
      // this.UserIsPartTime();
      this.filterPublicHolidays(firstDay, lastDay);
      } else {
        this.editmode = false;
        this.snackBar.open(
          'You can only book vacation for this year. For next year wait until after Silvester.',
          'Close',
          { duration: 4000 }
        );
      }
    } else {
      this.editmode = false;
      this.snackBar.open(
        'Your "from" date has to be before the "to" date.',
        'Close',
        { duration: 4000 }
      );
    }
  }
  // This function removes the public holidays from the amount of days between to and from dates using an API and Loop.
  filterPublicHolidays(firstDay, lastDay) {
    for (const url of this.vacURL) {
      this.http.get(url).subscribe(data => {
        for (const w in data) {
          const d = moment(data[w].datum);
          if (d.day() !== 6 && d.day() !== 0) {
            if (d.unix() <= lastDay.unix() && d.unix() >= firstDay.unix()) {
              this.diffdays--;
            }
          }
        }
      });
      this.UserIsPartTime();
    }
  }
  // This function checks whether the current user is a part time worker or not and calculates what amount of days needs to subtracted from
  // the vacation days the person still has.
  UserIsPartTime() {
    this.student
      .getCertainUser(this.angularFireAuth.auth.currentUser.uid)
      .pipe(take(1))
      .subscribe(user => {
        // @ts-ignore
        if (user.partTime) {
          this.daysDeduction = this.diffdays / 2; // /2; Just insert divide by 2 here again and the old way of doing part time is back
        } else {
          this.daysDeduction = this.diffdays;
        }
        this.enoughTime();
      });
  }

  // This function checks if the user has enough days left in order to request this vacation.
  // Depended on this the user can either plan the vacation or has to change his request
  enoughTime() {
    this.fetchUser()
      .pipe(take(1))
      .subscribe(user => {
        if (this.daysDeduction > 0) {
          if (
            // @ts-ignore
            user.vacdaystaken + this.daysDeduction <=
            // @ts-ignore
            user.vacdaystotal + user.lastYearTime
          ) {
            this.editmode = true;
          } else {
            this.snackBar.open(
              "You dont have enough Vacation Days left for this plan.",
              "Close",
              { duration: 4000 }
            );
            this.editmode = false;
          }
        } else {
          this.editmode = false;
        }
      });
  }

  // Just a helper function to get all the data regrading a user.
  fetchUser() {
    return this.afs
      .collection('users')
      .doc(this.angularFireAuth.auth.currentUser.uid)
      .valueChanges();
  }
  // This function is called when the user clicks the "Add Vacation Plan" Button. It writes the data to the database and clears all the
  // input fields. The state of the request will be PENDING
  async addPlan() {
    this.vacDetails.description = this.storedesk;
    this.vacDetails.diffdays = this.diffdays;
    this.vacDetails.daysDeduction = this.daysDeduction;
    this.vacDetails.representative = this.representative;
    this.vacDetails.representativeId = this.representativeId;
    this.vacDetails.lastProject = this.lastProject;
    await this.student.addItem(this.vacDetails);
    this.snackBar.open(
      'Your Vacation plan was added as Pending and can now be reviewed by an Admin.',
      'Close',
      { duration: 4000 }
    );
    this.storedesk = undefined;
    // @ts-ignore
    this.the1 = undefined;
    // @ts-ignore
    this.the2 = undefined;
    this.representative = undefined;
    this.lastProject = undefined;
    this.editmode = false;
    this.daysDeduction = 0;
    this.diffdays = 0;
  }
}
export class SelectValueBindingExample {
  selected = 'value';
}
