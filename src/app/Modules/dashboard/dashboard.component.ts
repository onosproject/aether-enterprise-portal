import { Component } from '@angular/core';
import {
  dashboardAlerts,
  alertData,
} from '../../shared/classes/dashboard-data';

@Component({
  selector: 'aep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  panelOpenState = false;
  selected: any = 1;
  step = 0;
  expandedIndex = 0;
  alerts: any;
  alertData: any;

  constructor() {
    this.alerts = dashboardAlerts[0];
    this.alertData = alertData[0][0];
    console.log(this.alertData);
  }

  onSelectCard(value: number): void {
    this.selected = value;
    const result = alertData[0].filter((word) => word.alert_id == value);
    console.log(result[0]);
    this.alertData = result[0];
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  moveUp(event: MouseEvent): void {
    console.log(event);
  }
}
