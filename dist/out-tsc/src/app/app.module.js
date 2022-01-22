import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeedDialFabComponent } from './speed-dial-fab/speed-dial-fab.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClientModule } from '@angular/common/http';
import { OverviewComponent } from './overview/overview.component';
import { AddVacationComponent } from './add-vacation/add-vacation.component';
import { CalendarComponent } from './calendar/calendar.component';
import { YourStatsComponent } from './your-stats/your-stats.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { AdminareaComponent } from './adminarea/adminarea.component';
import { LoginareaComponent } from './loginarea/loginarea.component';
import { CoreModule } from './core/core.module';
import { AlwaysAuthGuard } from './core/auth.service';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { UsersChartComponent } from './users-chart/users-chart.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UserDonutChartComponent } from './user-donut-chart/user-donut-chart.component';
const firebaseConfig = {
    apiKey: 'AIzaSyChcpucZkbF8d6eoLSanNeETJ4-WT_2RYE',
    authDomain: 'vacationplanner-4f6f3.firebaseapp.com',
    databaseURL: 'https://vacationplanner-4f6f3.firebaseio.com',
    projectId: 'vacationplanner-4f6f3',
    storageBucket: '',
    messagingSenderId: '1090254510765',
    appId: '1:1090254510765:web:382d3cd46b443f4a'
};
const appRoutes = [
    { path: '', component: LoginareaComponent },
    { path: 'overview', component: OverviewComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'add-vacation', component: AddVacationComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'calendar', component: CalendarComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'your-stats', component: YourStatsComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'admin-area', component: AdminareaComponent, canActivate: [AlwaysAuthGuard] },
    { path: 'user-detail', component: UsersDetailComponent, canActivate: [AlwaysAuthGuard] },
];
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            SpeedDialFabComponent,
            SidenavComponent,
            OverviewComponent,
            AddVacationComponent,
            CalendarComponent,
            YourStatsComponent,
            AdminareaComponent,
            LoginareaComponent,
            DonutChartComponent,
            UsersChartComponent,
            UsersDetailComponent,
            UserDonutChartComponent,
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MatButtonModule,
            A11yModule,
            CdkStepperModule,
            CdkTableModule,
            CdkTreeModule,
            DragDropModule,
            MatAutocompleteModule,
            MatBadgeModule,
            MatBottomSheetModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatStepperModule,
            MatDatepickerModule,
            MatDialogModule,
            MatDividerModule,
            MatExpansionModule,
            MatGridListModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatNativeDateModule,
            MatPaginatorModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatRadioModule,
            MatRippleModule,
            MatSelectModule,
            MatSidenavModule,
            MatSliderModule,
            MatSlideToggleModule,
            MatSnackBarModule,
            MatSortModule,
            MatTableModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule,
            MatTreeModule,
            PortalModule,
            ScrollingModule,
            BrowserModule,
            BrowserAnimationsModule,
            HttpClientModule,
            AppRoutingModule,
            MatToolbarModule,
            MatSidenavModule,
            MatListModule,
            MatButtonModule,
            MatIconModule,
            RouterModule.forRoot(appRoutes, { enableTracing: true } // <-- debugging purposes only
            ),
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFirestoreModule,
            FormsModule,
            CoreModule,
            GoogleChartsModule,
        ],
        providers: [AngularFireAuthGuard, AlwaysAuthGuard],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map