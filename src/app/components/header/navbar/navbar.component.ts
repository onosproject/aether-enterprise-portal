import { Component } from '@angular/core';

@Component({
  selector: 'aep-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  // Boolean Triggers
  trigger: boolean = false;
  controlMenuTrigger: boolean = false;
  alert: boolean = false;

  // Static Values
  devices: number = 1040;
  unprovisionedDevices: number = 10;
  Slices: number = 15;
  Layers: number = 30;
  Sites: number = 5;
  SmallCells: number = 234;
}
