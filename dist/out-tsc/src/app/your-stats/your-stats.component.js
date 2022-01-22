import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
let YourStatsComponent = class YourStatsComponent {
    constructor(student, afs, auth, angularFireAuth) {
        this.student = student;
        this.afs = afs;
        this.auth = auth;
        this.angularFireAuth = angularFireAuth;
        this.displayedColumns = ['Name', 'Von', 'Bis', 'Length', 'Description'];
        this.panelOpenState = false;
        this.pendingDataSource = this.student.getPendingItems();
        this.newsource = [];
        this.approvedDataSource = this.student.getItems();
        this.newasource = [];
        this.declinedDataSource = this.student.getDeclinedItems();
        this.newdsource = [];
    }
    ngOnInit() {
        this.pendingDataSource.subscribe(source => {
            for (const entry of source) {
                // @ts-ignore
                if (entry.userid === this.angularFireAuth.auth.currentUser.uid) { /*used ts-ignore*/
                    this.newsource.push(entry);
                }
            }
            this.pdataSource = new MatTableDataSource(this.newsource);
        });
        this.approvedDataSource.subscribe(source => {
            for (const entry of source) {
                // @ts-ignore
                if (entry.userid === this.angularFireAuth.auth.currentUser.uid) { /*used ts-ignore*/
                    this.newasource.push(entry);
                }
            }
            this.adataSource = new MatTableDataSource(this.newasource);
        });
        this.declinedDataSource.subscribe(source => {
            for (const entry of source) {
                // @ts-ignore
                if (entry.userid === this.angularFireAuth.auth.currentUser.uid) { /*used ts-ignore*/
                    this.newdsource.push(entry);
                }
            }
            this.ddataSource = new MatTableDataSource(this.newdsource);
        });
    }
};
YourStatsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-your-stats',
        templateUrl: './your-stats.component.html',
        styleUrls: ['./your-stats.component.scss']
    })
], YourStatsComponent);
export { YourStatsComponent };
//# sourceMappingURL=your-stats.component.js.map