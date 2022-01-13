import { Component, ViewChild } from '@angular/core';
import { GraphComponent } from './pages/modals/graph-modal/graph.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'aep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // @ViewChild('sites') sites: any;
  @ViewChild('slices') slices: any;
  @ViewChild('navbar') navbar: any;

  isExpand: any = true;
  panelOpenState = false;
  isAcknowledged = 12;
  siteId: string;

  constructor(public dialog: MatDialog) {}

  parentWillTakeAction(event: {
    siteId: string;
    siteData: any[];
    siteIndex: number;
  }): void {
    // console.log('||||||||||||||||||||', event.siteId);
    this.navbar.getDataFromDashboard(event.siteId);
    this.siteId = event.siteId;
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

  showAcknowledgedView(): void {
    this.isAcknowledged = 8;
    this.slices.expandAllCard(true);
    // this.isExpand = false;
  }
  hideAcknowledgedView(): void {
    this.isAcknowledged = 12;
    this.slices.hideAcknowledgedView();
  }

  openDialog(): void {
    this.dialog.open(GraphComponent, {
      width: '40%',
      height: '55%',
    });
    // const dialogRef = this.dialog.open(GraphComponent, {
    //   width: '40%',
    //   height: '55%',
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 'true' && isDevice) {
    //     this.sliceData[this.siteIndex].devices.splice(0, 1);
    //   }
    //   if (result === 'true' && !isDevice) {
    //     this.sliceData[this.siteIndex].services.splice(0, 1);
    //   }
    // });
  }
}
