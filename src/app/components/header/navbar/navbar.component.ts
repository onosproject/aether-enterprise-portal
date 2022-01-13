import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aep-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  // Boolean Triggers
  trigger: boolean = false;
  controlMenuTrigger: boolean = false;
  alert: string;

  // Static Values
  devices: number = 1040;
  unprovisionedDevices: number = 10;
  Slices: number = 15;
  Layers: number = 30;
  Sites: number = 5;
  SmallCells: number = 234;

  constructor(private route: Router) {}

  goToSmallCells(): void {
    this.route.navigate(['/Small-Cells', { isNotification: true }]);
  }

  getDataFromDashboard(siteId: string): void {
    this.alert = siteId;
    // alert();
  }
}
