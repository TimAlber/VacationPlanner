import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
let CoreModule = class CoreModule {
};
CoreModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule,
            AngularFireAuthModule,
            AngularFirestoreModule
        ],
        providers: [AuthService]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map