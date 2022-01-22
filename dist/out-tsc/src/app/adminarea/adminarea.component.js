import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { take } from 'rxjs/operators';
let AdminareaComponent = class AdminareaComponent {
    constructor(student, afs, mailer) {
        this.student = student;
        this.afs = afs;
        this.mailer = mailer;
        this.displayedColumns = ['Name', 'Von', 'Bis', 'Length', 'Description', 'Approve', 'Decline'];
        this.dataSource = new PendingItemDataSource(this.student);
    }
    approve(obj) {
        this.student.setapprove(obj);
        this.updateusertimes(obj);
    }
    updateusertimes(objct) {
        this.itemDoc = this.afs.doc('users/' + objct.userid);
        this.itemDoc.valueChanges()
            .pipe(take(1))
            .subscribe(v => {
            console.log('!!!v: ', v);
            this.student.updateUser(objct.userid, (v.vacdaystaken + objct.diffdays));
            // this.mailer.sendOwnMail();
            this.mailer.sendEmail({
                to: 'tim@syqlo.com',
                from: 'test@sendgridtest.com',
                subject: 'Your Vacation Plan was Approved',
                text: 'Hello ' + v.displayName + ',/n Your Vacation Plan with the description "' + objct.description +
                    '" has been approved./nIt will start at: ' + objct.von + 'and end at: ' + objct.bis + './n Enjoy you time off!',
            });
            return;
        });
    }
    decline(obj) {
        this.student.setdecline(obj);
    }
};
AdminareaComponent = tslib_1.__decorate([
    Component({
        selector: 'app-adminarea',
        templateUrl: './adminarea.component.html',
        styleUrls: ['./adminarea.component.scss']
    })
], AdminareaComponent);
export { AdminareaComponent };
export class PendingItemDataSource extends DataSource {
    constructor(student) {
        super();
        this.student = student;
    }
    connect() {
        return this.student.getPendingItems();
    }
    disconnect() {
    }
}
//# sourceMappingURL=adminarea.component.js.map