/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ViewChild } from '@angular/core';
import { GraphComponent } from './pages/modals/graph-modal/graph.component';
import { MatDialog } from '@angular/material/dialog';
import { SitesService } from 'src/app/services/sites/sites.service';
import { smallCell } from '../../shared/classes/dashboard-data';
import { SitePlan } from 'src/app/models/site-plan.model';
import { Slice } from 'src/app/models/slice.model';
import { environment } from '../../../../src/environments/environment';

@Component({
  selector: 'aep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('slices') slices;
  isExpand: boolean = true;
  panelOpenState = false;
  isAcknowledged = 12;
  siteId: number;
  viewType: string = 'Logical';
  config = null;
  baseUrl: string = environment.baseUrl.substring(
    0,
    environment.baseUrl.length - 1
  );
  selectedPlan: number = 0;
  siteIndex = 0;

  constructor(public dialog: MatDialog, public sitesService: SitesService) {}

  parentWillTakeAction(event: {
    siteId: string;
    siteData: Slice[];
    siteIndex: number;
    alerts: number;
    sitePlans: SitePlan;
  }): void {
    if (this.isAcknowledged !== 12 || !this.isExpand) {
      setTimeout(() => {
        this.hideAcknowledgedView();
      }, 100);
    }
    this.siteId = event.alerts;
    if (event.sitePlans === null) {
      this.viewType = 'Logical';
      setTimeout(() => {
        this.getSlices();
      }, 10);
    }
    this.config = event.sitePlans;
    if (!this.isExpand) {
      this.slices.expandAllCard(false);
      this.isExpand = true;
    } else {
      this.slices.collapseAllCard();
      this.isExpand = true;
    }
    this.slices.viewType = 'Logical';
    this.slices.onSelectCard(event);
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
  parentWillTakeActionSlice(event: {
    isalert?: boolean;
    viewType: boolean;
  }): void {
    if (event.viewType) {
      this.viewType = 'Physical';
    }
    if (!event.viewType) {
      this.isExpand = !this.isExpand;
    }
    if (event.isalert) {
      this.isAcknowledged = 8;
    }
  }

  showAcknowledgedView(numberOfAlerts: number): void {
    smallCell[0][0].alerts = this.sitesService.allSmallCellsData;
    this.sitesService.numberOfAlerts = numberOfAlerts;
    this.isAcknowledged = 8;
    this.slices.expandAllCard(true);
  }
  hideAcknowledgedView(): void {
    this.isAcknowledged = 12;
    this.slices.hideAcknowledgedView();
  }

  openDialog(): void {
    this.dialog.open(GraphComponent, {
      width: '40%',
      panelClass: 'graph-modal-container',
    });
  }

  getSlices(): void {
    this.slices.onSelectCard({
      siteId: this.sitesService.siteId,
      siteData: this.sitesService.siteData,
      siteIndex: this.sitesService.siteIndex,
      sitePlans: this.sitesService.sitePlanes,
    });
  }
}
