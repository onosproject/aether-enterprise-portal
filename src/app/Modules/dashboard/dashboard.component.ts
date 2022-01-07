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
  isAcknowledged = 12;

  parentWillTakeAction(event: any): void {
    // console.log(event.siteId, event.siteData);
    if (!this.isExpand) {
      this.slices.expandAllCard(false);
      this.isExpand = false;
    } else {
      this.slices.collapseAllCard();
      this.isExpand = true;
    }
    this.slices.onSelectCard(event);
    setTimeout(() => {
      this.hideAcknowledgedView();
    }, 10);
  }

  parentWillTakeForExpand(): void {
    if (this.isExpand) {
      this.slices.expandAllCard(false);
      this.isExpand = false;
    } else {
      this.isExpand = true;
      this.slices.collapseAllCard();
    }
  }
  parentWillTakeActionSlice(): void {
    this.isExpand = !this.isExpand;
  }

  showAcknowledgedView() {
    this.isAcknowledged = 8;
    this.slices.expandAllCard(true);
    this.isExpand = false;
  }
  hideAcknowledgedView() {
    this.isAcknowledged = 12;
    this.slices.hideAcknowledgedView();
  }
}
