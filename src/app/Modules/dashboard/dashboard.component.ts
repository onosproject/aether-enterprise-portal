import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'aep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('sites') sites: any;
  @ViewChild('slices') slices: any;
  isExpand: any = true;

  panelOpenState = false;

  parentWillTakeAction(message: any) {
    if (!this.isExpand) {
      this.slices.expandAllCard();
      this.isExpand = false;
    } else {
      this.slices.collapseAllCard();
      this.isExpand = true;
    }
    this.slices.onSelectCard(message);
  }

  parentWillTakeForExpand() {
    if (this.isExpand) {
      this.slices.expandAllCard();
      this.isExpand = false;
    } else {
      this.slices.collapseAllCard();
      this.isExpand = true;
    }
  }
  parentWillTakeActionSlice(message: any) {
    this.isExpand = !this.isExpand;
  }
}
