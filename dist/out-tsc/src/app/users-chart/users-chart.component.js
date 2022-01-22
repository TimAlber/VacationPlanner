import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let UsersChartComponent = class UsersChartComponent {
    constructor(student) {
        this.student = student;
        this.displayedColumns = ['Name', 'Email', 'Role', 'Taken', 'Total', 'Details'];
        this.dataSource = this.student.getUsers();
    }
    ngOnInit() {
    }
};
UsersChartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-users-chart',
        templateUrl: './users-chart.component.html',
        styleUrls: ['./users-chart.component.scss']
    })
], UsersChartComponent);
export { UsersChartComponent };
//# sourceMappingURL=users-chart.component.js.map