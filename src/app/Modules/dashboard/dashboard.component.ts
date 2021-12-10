import { Component, OnInit } from '@angular/core';
import { dashboardAlerts, alertData } from '../../shared/classes/dashboard-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  panelOpenState = false;
  selected : any = 1;
  step = 0;
  expandedIndex = 0;
  alerts : any;
  alertData : any ;

   constructor() {
     this.alerts = dashboardAlerts[0] ;
     this.alertData = alertData[0][0];
    console.log(this.alertData);


    }

  ngOnInit(): void {
  }

  onSelectCard(value : any) {
    this.selected = value;
    const result = alertData[0].filter(word => word.alert_id == value);
    console.log(result[0])
    this.alertData = result[0];
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  moveUp(event : any){
    console.log(event);
  }

}
