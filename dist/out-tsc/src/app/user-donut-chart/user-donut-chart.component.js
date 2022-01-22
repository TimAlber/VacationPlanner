import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let UserDonutChartComponent = class UserDonutChartComponent {
    constructor(auth, angularFireAuth, student, afs) {
        this.auth = auth;
        this.angularFireAuth = angularFireAuth;
        this.student = student;
        this.afs = afs;
        this.title = 'The Vacation days and how much the User got left.';
        this.type = 'PieChart';
        this.data = [
            ['Taken Vacation Days', 0],
            ['Vacation days you got left', (24 - 0)],
        ];
        this.columnNames = ['Browser', 'Percentage'];
        this.options = {
            pieHole: 0.4
        };
        this.width = 550;
        this.height = 400;
    }
    ngOnInit() {
        console.log('From user donut chart!: ', this.User);
        this.title = 'The Vacation days and how much the User got left.';
        this.type = 'PieChart';
        this.data = [
            ['Taken Vacation Days', this.User.vacdaystaken],
            ['Vacation days you got left', (24 - this.User.vacdaystaken)],
        ];
        this.columnNames = ['Browser', 'Percentage'];
        this.options = {
            pieHole: 0.4
        };
        this.width = 550;
        this.height = 400;
    }
};
tslib_1.__decorate([
    Input()
], UserDonutChartComponent.prototype, "User", void 0);
UserDonutChartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-donut-chart',
        templateUrl: './user-donut-chart.component.html',
        styleUrls: ['./user-donut-chart.component.scss']
    })
], UserDonutChartComponent);
export { UserDonutChartComponent };
//# sourceMappingURL=user-donut-chart.component.js.map