/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphComponent } from './pages/modals/graph-modal/graph.component';
import { MatDialog } from '@angular/material/dialog';
import { SitesService } from 'src/app/services/sites/sites.service';
import { environment } from 'src/environments/environment';
import { Config } from 'src/app/models/config.model';

@Component({
  selector: 'aep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // @ViewChild('sites') sites: any;
  @ViewChild('slices') slices: any;
  @ViewChild('navbar') navbar: any;

  isExpand: any = true;
  panelOpenState = false;
  isAcknowledged = 12;
  siteId: string;
  viewType: string = 'Logical';
  config: any = null;
  baseUrl: string = environment.baseUrl.substring(
    0,
    environment.baseUrl.length - 1
  );
  selectedPlan: number = 0;

  smallCells = [
    {
      'display-name': 'North Cell',
      position: {
        'position-x': 200,
        'position-y': 100,
        'site-plan': 'floor-0',
      },
    },
    {
      'display-name': 'South Cell',
      position: {
        'position-x': 100,
        'position-y': 300,
        'site-plan': 'floor-1',
      },
    },
    {
      'display-name': 'East Cell',
      position: {
        'position-x': 300,
        'position-y': 400,
        'site-plan': 'floor-2',
      },
    },
    {
      'display-name': 'West Cell',
      position: {
        'position-x': 200,
        'position-y': 200,
        'site-plan': 'floor-3',
      },
    },
  ];

  devices = [
    {
      'display-name': 'Camera 1',
      position: {
        'position-x': 500,
        'position-y': 200,
        'site-plan': 'floor-0',
      },
      'site-position': {
        'position-x': 200,
        'position-y': 100,
      },
    },
    {
      'display-name': 'Camera 2',
      position: {
        'position-x': 450,
        'position-y': 300,
        'site-plan': 'floor-1',
      },
      'site-position': {
        'position-x': 100,
        'position-y': 300,
      },
    },
    {
      'display-name': 'Phone 1',
      position: {
        'position-x': 100,
        'position-y': 400,
        'site-plan': 'floor-2',
      },
      'site-position': {
        'position-x': 300,
        'position-y': 400,
      },
    },
    {
      'display-name': 'Phone 2',
      position: {
        'position-x': 250,
        'position-y': 300,
        'site-plan': 'floor-3',
      },
      'site-position': {
        'position-x': 200,
        'position-y': 200,
      },
    },
    {
      'display-name': 'Phone 3',
      position: {
        'position-x': 350,
        'position-y': 350,
        'site-plan': 'floor-1',
      },
      'site-position': {
        'position-x': 100,
        'position-y': 300,
      },
    },
    {
      'display-name': 'Phone 4',
      position: {
        'position-x': 300,
        'position-y': 300,
        'site-plan': 'floor-0',
      },
      'site-position': {
        'position-x': 200,
        'position-y': 100,
      },
    },
  ];

  constructor(public dialog: MatDialog, public sitesService: SitesService) {}

  ngOnInit(): void {
    this.sitesService.GetAllConfig().subscribe((response: Config) => {
      this.config = response || null;
    });
  }

  parentWillTakeAction(event: {
    siteId: string;
    siteData: any[];
    siteIndex: number;
  }): void {
    // console.log('||||||||||||||||||||', event);
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
      // height: '55%',
      panelClass: 'graph-modal-container',
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

  getSlices(): void {
    this.slices.onSelectCard({
      siteId: this.sitesService.siteId,
      siteData: this.sitesService.siteData,
      siteIndex: this.sitesService.siteIndex,
    });
  }
}
