import { Component, Directive, Input, OnInit } from '@angular/core';
import { ItemDataSource } from '../overview/overview.component';
import { VacPlansService } from '../vac-plans.service';
import { EmailServiceService } from '../email-service.service';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DataSource } from '@angular/cdk/table';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

// User information
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
  selector: 'app-adminarea',
  templateUrl: './adminarea.component.html',
  styleUrls: ['./adminarea.component.scss'],
  providers: [DatePipe]
})
export class AdminareaComponent {
  private itemDoc: AngularFirestoreDocument<User>;
  item: Observable<User>;
  dataSource = new PendingItemDataSource(this.student);
  selected: any;
  displayname?: string;

  // Table Headers and what you will see in the table
  displayedColumns = [
    'Name',
    'Von',
    'Bis',
    'Length',
    'Description',
    'Approve',
    'Decline',
    'Details'
  ];

  // Constructor used for dependency injection
  constructor(
    private student: VacPlansService,
    private afs: AngularFirestore,
    private mailer: EmailServiceService,
    public datepipe: DatePipe
  ) {}

  // approve is called when the admin clicks on approve for a certain vacation request. It sets the state of the request to "approved"
  approve(obj) {
    this.student.setapprove(obj);
    this.updateusertimes(obj);
  }
  // updateusertimes is a really big function. It changes the the vacation days taken value to new value and send a email to the
  // person filing the request and the representation  worker chosen.
  updateusertimes(objct) {
    this.itemDoc = this.afs.doc<User>('users/' + objct.userid);
    this.itemDoc
      .valueChanges()
      .pipe(take(1))
      .subscribe(v => {
        if (v.partTime) {
          // change the vacdaystaken for a part time worker
          // tslint:disable-next-line:max-line-length
          this.student.updateUser(objct.userid, v.vacdaystaken + (objct.diffdays / 2)); // /2; Just insert divide by 2 here again and the old way of doing part time is back
        } else {
          // change the vacdaystaken for a full time worker
          this.student.updateUser(objct.userid, v.vacdaystaken + objct.diffdays);
        }
        // calculate the string of timestamp in seconds
        const vonn = new Date(objct.von.seconds * 1000);
        const vons = this.datepipe.transform(vonn, 'dd.MM.yyyy');
        const bisn = new Date(objct.bis.seconds * 1000);
        const biss = this.datepipe.transform(bisn, 'dd.MM.yyyy');

        // send email to user if the vacation was approved
        this.mailer.sendDiffMail({
          to: v.email,
          from: 'vacationapp@syqlo.com',
          subject: 'Your Vacation Plan was Approved',
          html: `<b>Hello ${v.displayName}</b><br>Your Vacation Plan with the description "${objct.description}" has been approved.<br>
          It will start at: ${vons} and end at: ${biss}.<br>
          Enjoy your time off!`
        });
        this.itemDoc = this.afs.doc<User>('users/' + objct.representativeId);
        this.itemDoc
          .valueChanges()
          .pipe(take(1))
          .subscribe(c => {
            // send email to representation  worker if the vacation was approved
            this.mailer.sendDiffMail({
              // send the mail
              to: c.email,
              from: 'vacationapp@syqlo.com',
              subject: 'Your were appointed do be a Representative',
              html: `<b>Hello ${c.displayName}</b><br>Your Coworker, ${v.displayName}, will go on a Vacation from the ${vons} until the
${biss}. You were selectet by him or her to be his or her Representative. The Last thing he or she worked on is:
"${objct.lastProject}".<br> Please talk to ${v.displayName} for more Information.<br>
With best regards your Vacation App.`
            });
          });
        return;
      });
  }
  // This function sets the state of the vacation request to "declined" and sends a mail to user
  decline(obj) {
    this.student.setdecline(obj);
    this.sendDeclineMail(obj);
  }
  // Here we simply send a mail to the person whose vacation request was declined
  sendDeclineMail(objct) {
    this.itemDoc = this.afs.doc<User>('users/' + objct.userid);
    this.itemDoc
      .valueChanges()
      .pipe(take(1))
      .subscribe(v => {
        const vonn = new Date(objct.von.seconds * 1000);
        const vons = this.datepipe.transform(vonn, 'dd.MM.yyyy');
        const bisn = new Date(objct.bis.seconds * 1000);
        const biss = this.datepipe.transform(bisn, 'dd.MM.yyyy');

        this.mailer.sendDiffMail({
          // send the mail
          to: v.email,
          from: 'vacationapp@syqlo.com',
          subject: 'Your Vacation Plan was Declined',
          html: `<b>Hello ${v.displayName}</b><br>Your Vacation Plan with the description "${objct.description}" has been declined.<br>
          It would have been from the ${vons} to the ${biss}, but we will need you at work in this time period.
          Please talk to one of the Admins for further information!<br>With best regards your Vacation App.`
        });
        return;
      });
  }
}

// This class is used to retreve the pending vacation request and write them to the table
export class PendingItemDataSource extends DataSource<any> {
  constructor(private student: VacPlansService) {
    super();
  }

  connect() {
    return this.student.getPendingItems();
  }

  disconnect() {}
}
export class SelectValueBindingExample {
  selected = 'value';
}
