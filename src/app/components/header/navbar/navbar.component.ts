import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor() {}

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

  ngOnInit(): void {}
}
