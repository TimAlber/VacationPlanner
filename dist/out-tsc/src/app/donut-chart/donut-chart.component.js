import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DonutChartComponent = class DonutChartComponent {
    constructor(auth, angularFireAuth, student, afs) {
        this.auth = auth;
        this.angularFireAuth = angularFireAuth;
        this.student = student;
        this.afs = afs;
        this.title = 'Your Vacation days and how much you have left.';
        this.type = 'PieChart';
        this.data = [
            ['Taken Vacation Days', (24 - 0)],
            ['Vacation days you got left', 0],
        ];
        this.columnNames = ['Browser', 'Percentage'];
        this.options = {
            pieHole: 0.4
        };
        this.width = 550;
        this.height = 400;
    }
    ngOnInit() {
        this.afs.collection('users').doc(this.angularFireAuth.auth.currentUser.uid).valueChanges().subscribe(source => {
            console.log(source);
            // @ts-ignore
            this.takenDays = source.vacdaystaken; /*used ts-ignore*/
            console.log('takendays: ', this.takenDays);
            this.title = 'Your Vacation days and how much you have left.';
            this.type = 'PieChart';
            this.data = [
                ['Vacation days you got left', (24 - this.takenDays)],
                ['Taken Vacation Days', this.takenDays],
            ];
            this.columnNames = ['Browser', 'Percentage'];
            this.options = {
                pieHole: 0.5
            };
            this.width = 550;
            this.height = 400;
        });
    }
};
DonutChartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-donut-chart',
        templateUrl: './donut-chart.component.html',
        styleUrls: ['./donut-chart.component.scss']
    })
], DonutChartComponent);
export { DonutChartComponent };
//# sourceMappingURL=donut-chart.component.js.map