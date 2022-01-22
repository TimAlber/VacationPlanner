import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
let SpeedDialFabComponent = class SpeedDialFabComponent {
    constructor() {
        this.fabButtons = [
            {
                icon: 'add_circle'
            }
        ];
        this.buttons = [];
        this.fabTogglerState = 'inactive';
    }
    showItems() {
        this.fabTogglerState = 'active';
        this.buttons = this.fabButtons;
    }
    hideItems() {
        this.fabTogglerState = 'inactive';
        this.buttons = [];
    }
    onToggleFab() {
        this.buttons.length ? this.hideItems() : this.showItems();
    }
    testfunc(name) {
        alert(name);
    }
    ngOnInit() {
    }
};
SpeedDialFabComponent = tslib_1.__decorate([
    Component({
        selector: 'app-speed-dial-fab',
        templateUrl: './speed-dial-fab.component.html',
        styleUrls: ['./speed-dial-fab.component.scss'],
        animations: speedDialFabAnimations
    })
], SpeedDialFabComponent);
export { SpeedDialFabComponent };
//# sourceMappingURL=speed-dial-fab.component.js.map