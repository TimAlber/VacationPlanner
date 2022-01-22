import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
let UsersDetailComponent = class UsersDetailComponent {
    constructor(activatedRoute, student, afs) {
        this.activatedRoute = activatedRoute;
        this.student = student;
        this.afs = afs;
        this.displayedColumns = ['Name', 'Von', 'Bis', 'Length', 'Description'];
        this.panelOpenState = false;
        this.pendingDataSource = this.student.getPendingItems();
        this.newsource = [];
        this.approvedDataSource = this.student.getItems();
        this.newasource = [];
        this.declinedDataSource = this.student.getDeclinedItems();
        this.newdsource = [];
    }
    makeemuser() {
        this.afs.doc('users/' + this.globaluid).valueChanges().pipe(take(1)).subscribe(source => {
            source.role = 'USER';
            this.afs.collection('users').doc(this.globaluid).update(source);
        });
    }
    makeemadmin() {
        this.afs.doc('users/' + this.globaluid).valueChanges().pipe(take(1)).subscribe(source => {
            source.role = 'ADMIN';
            this.afs.collection('users').doc(this.globaluid).update(source);
        });
    }
    ngOnInit() {
        this.state$ = this.activatedRoute.paramMap
            .pipe(map(() => window.history.state));
        this.state$.subscribe(uid => {
            console.log(uid);
            // @ts-ignore
            this.globaluid = uid.uid;
            // @ts-ignore
            this.userData = this.student.getCertainUser(uid.uid);
            this.userData.subscribe(source => {
                console.log(source);
                this.displayUserData = source;
            });
        });
        this.pendingDataSource.subscribe(source => {
            for (const entry of source) {
                // @ts-ignore
                if (entry.userid === this.displayUserData.uid) { /*used ts-ignore*/
                    this.newsource.push(entry);
                }
            }
            this.pdataSource = new MatTableDataSource(this.newsource);
        });
        this.approvedDataSource.subscribe(source => {
            for (const entry of source) {
                // @ts-ignore
                if (entry.userid === this.displayUserData.uid) { /*used ts-ignore*/
                    this.newasource.push(entry);
                }
            }
            this.adataSource = new MatTableDataSource(this.newasource);
        });
        this.declinedDataSource.subscribe(source => {
            for (const entry of source) {
                // @ts-ignore
                if (entry.userid === this.displayUserData.uid) { /*used ts-ignore*/
                    this.newdsource.push(entry);
                }
            }
            this.ddataSource = new MatTableDataSource(this.newdsource);
        });
    }
};
UsersDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-users-detail',
        templateUrl: './users-detail.component.html',
        styleUrls: ['./users-detail.component.scss']
    })
], UsersDetailComponent);
export { UsersDetailComponent };
//# sourceMappingURL=users-detail.component.js.map