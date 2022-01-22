import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
let AddVacationComponent = class AddVacationComponent {
    constructor(student, auth, angularFireAuth, snackBar, afs) {
        this.student = student;
        this.auth = auth;
        this.angularFireAuth = angularFireAuth;
        this.snackBar = snackBar;
        this.afs = afs;
        this.diffdays = 0;
        this.storedesk = '';
        this.editmode = false;
        this.startDate = Date.now();
        this.vacDetails = {
            Name: this.angularFireAuth.auth.currentUser.displayName,
            userid: this.angularFireAuth.auth.currentUser.uid,
            description: '',
            id: '',
            state: 'PENDING',
            von: new Date(),
            bis: new Date(),
            diffdays: 0
        };
    }
    addFromEvent(type, event) {
        this.vacDetails.von = event.value;
        // console.log(this.vacDetails.von);
        this.getBusinessDays(this.vacDetails.von, this.vacDetails.bis);
    }
    addToEvent(type, event) {
        this.vacDetails.bis = event.value;
        // console.log(this.vacDetails.bis);
        this.getBusinessDays(this.vacDetails.von, this.vacDetails.bis);
    }
    ngOnInit() { }
    // getdiffdays(von, bis) { // TODO Wochende rausfiltern
    //   const diffInTime = bis.getTime() - von.getTime();
    //   const diffInDays = diffInTime / (1000 * 3600 * 24);
    //   console.log('Amount of days: ', diffInDays);
    //   this.diffdays = diffInDays + 1;
    //   this.enoughTime();
    // }
    getBusinessDays(startDate, endDate) {
        const lastDay = moment(endDate);
        const firstDay = moment(startDate);
        if (startDate <= endDate) {
            let calcBusinessDays = 1 + (lastDay.diff(firstDay, 'days') * 5 -
                (firstDay.day() - lastDay.day()) * 2) / 7;
            if (lastDay.day() === 6) {
                calcBusinessDays--; // SAT
            }
            if (firstDay.day() === 0) {
                calcBusinessDays--; // SUN
            }
            console.log(calcBusinessDays);
            this.diffdays = calcBusinessDays;
            this.enoughTime();
        }
        else {
            this.editmode = false;
            this.snackBar.open('Your from date has to be before the to date.', 'Close', { duration: 4000 });
        }
    }
    enoughTime() {
        this.fetchUser().pipe(take(1)).subscribe(user => {
            if (this.diffdays > 0) {
                // @ts-ignore
                if ((user.vacdaystaken + this.diffdays) <= 24) {
                    this.editmode = true;
                }
                else {
                    this.snackBar.open('You dont have enough Vacation Days left for this plan.', 'Close', { duration: 4000 });
                    this.editmode = false;
                }
            }
            else {
                this.editmode = false;
            }
        });
    }
    fetchUser() {
        return this.afs.collection('users').doc(this.angularFireAuth.auth.currentUser.uid).valueChanges();
    }
    addPlan() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.vacDetails.description = this.storedesk;
            this.vacDetails.diffdays = this.diffdays;
            yield this.student.addItem(this.vacDetails);
            console.log(this.vacDetails);
            this.snackBar.open('Your Vacation plan was added as Pending and can now be reviewed by an Admin.', 'Close', { duration: 4000 });
            this.storedesk = undefined;
            // @ts-ignore
            this.the1 = undefined;
            // @ts-ignore
            this.the2 = undefined;
        });
    }
};
AddVacationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-vacation',
        templateUrl: './add-vacation.component.html',
        styleUrls: ['./add-vacation.component.scss']
    })
], AddVacationComponent);
export { AddVacationComponent };
//# sourceMappingURL=add-vacation.component.js.map