import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
// @ts-ignore
let OverviewComponent = class OverviewComponent {
    // @ts-ignore
    constructor(student, afs) {
        this.student = student;
        this.afs = afs;
        this.displayedColumns = ['Name', 'Von', 'Bis', 'Length', 'Description'];
        this.dataSource = new ItemDataSource(this.student);
    }
};
OverviewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-overview',
        templateUrl: './overview.component.html',
        styleUrls: ['./overview.component.scss']
    })
], OverviewComponent);
export { OverviewComponent };
export class ItemDataSource extends DataSource {
    constructor(student) {
        super();
        this.student = student;
    }
    connect() {
        return this.student.getItems();
    }
    disconnect() {
    }
}
//# sourceMappingURL=overview.component.js.map