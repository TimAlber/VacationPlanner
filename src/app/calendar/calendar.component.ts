import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as $ from "jquery";
import * as moment from "moment";
import "fullcalendar";
import { AuthService } from "../core/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import momentExt from "fullcalendar/src/moment-ext";
import { VacPlansService } from "../vac-plans.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements AfterViewInit {
  // tslint:disable-next-line:max-line-length
  // Just a configuration Object for the full calender
  private defaultConfigurations: {
    buttonText: { week: string; month: string; today: string; day: string };
    selectHelper: boolean;
    editable: boolean;
    selectable: boolean;
    slotDuration: moment.Duration;
    titleFormat: string;
    slotLabelInterval: moment.Duration;
    firstDay: number;
    allDaySlot: boolean;
    header: { left: string; center: string; right: string };
    eventLimit: boolean;
    views: { agenda: { eventLimit: number } };
    events: any;
  };
  // another configuration object
  private readonly eventData: (
    | { start: moment.Moment; title: string }
    | { start: moment.Moment; end: moment.Moment; title: string })[];
  // Constructor for dependency injection and getting all the approved vacations and loop tgriugh them to get data out and write to
  // eventdata array.
  // This array is then used to populate the calender.
  // The rest of the code is configuration.
  constructor(
    public auth: AuthService,
    private angularFireAuth: AngularFireAuth,
    private servicevacs: VacPlansService,
    private afs: AngularFirestore
  ) {
    this.eventData = [];
    this.servicevacs.getItems().subscribe(calendarvacs => {
      for (const eventvacs of calendarvacs) {
        // @ts-ignore
        // @ts-ignore
        this.eventData.push({
          // @ts-ignore
          title: eventvacs.Name + " : " + eventvacs.description,
          // @ts-ignore
          start: eventvacs.von.toDate(),
          // @ts-ignore
          end: moment(eventvacs.bis.toDate(), "DD-MM-YYYY").add(1, "days")
        });
      }
      this.defaultConfigurations = {
        editable: false,
        eventLimit: false,
        titleFormat: "DD/MM/YYYY",
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay"
        },
        buttonText: {
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          // @ts-ignore
          prev: "<",
          // @ts-ignore
          next: ">"
        },
        views: {
          agenda: {
            eventLimit: 1000
          }
        },
        allDaySlot: true,
        slotDuration: moment.duration("00:15:00"),
        slotLabelInterval: moment.duration("01:00:00"),
        firstDay: 1,
        selectable: true,
        selectHelper: true,
        events: this.eventData
      };

      $("#full-calendar").fullCalendar(this.defaultConfigurations);
    });
  }
  ngAfterViewInit() {}
}
