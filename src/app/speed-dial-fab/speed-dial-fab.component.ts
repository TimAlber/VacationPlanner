import { Component, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
// create a FabButton
export class SpeedDialFabComponent implements OnInit {
  fabButtons = [
    {
      icon: 'add_circle'
    }
  ];

  buttons = [];
  fabTogglerState = 'inactive';

  constructor() {}

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

  ngOnInit() {}
}
