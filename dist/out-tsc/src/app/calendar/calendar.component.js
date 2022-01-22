import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
let CalendarComponent = class CalendarComponent {
    // important!
    constructor() {
        this.calendarPlugins = [dayGridPlugin];
    }
    ngOnInit() {
    }
};
CalendarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.scss']
    })
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map