/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { SitesService } from 'src/app/services/sites/sites.service';
import { environment } from '../../../../../src/environments/environment';
import { DecomissionComponent } from '../dialogs/decomission/decomission.component';
import { RecomissionComponent } from '../dialogs/recomission/recomission.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'aep-snack-bar-component-example-snack',
  template:
    '<div class="snack-div"><p>No SitePlans available for this site.</p> <img src="assets/AdminPanel/close-snack.svg" /></div>',
  styles: [
    `
      .snack-div {
        justify-content: space-between;
        display: flex;
        height: 10px;
        img {
          margin: 5px 6px;
          position: absolute;
          right: 8px;
          width: 11px;
        }
      }
    `,
  ],
})
export class PizzaPartyComponent {}
@Component({
  selector: 'aep-small-cell',
  templateUrl: './small-cell.component.html',
  styles: [],
})
export class SmallCellComponent implements OnInit {
  siteSubscription = null;
  selectedSite: string = '';
  config = null;
  viewType: string = 'Physical';
  baseUrl: string = environment.baseUrl.substring(
    0,
    environment.baseUrl.length - 1
  );
  selectedPlan: number = 0;
  displayDetails: number[] = [];
  sitePlanPresent: boolean = false;
  sitePlanPresentIndex: number = 0;

  /* Static Data start */
  smallCells = [
    {
      'display-name': 'North Cell',
      position: {
        'position-x': 200,
        'position-y': 100,
        'site-plan': 'floor-0',
      },
      status: 1,
    },
    {
      'display-name': 'South Cell',
      position: {
        'position-x': 100,
        'position-y': 300,
        'site-plan': 'floor-1',
      },
      status: 2,
    },
    {
      'display-name': 'East Cell',
      position: {
        'position-x': 300,
        'position-y': 400,
        'site-plan': 'floor-2',
      },
      status: 3,
    },
    {
      'display-name': 'West Cell',
      position: {
        'position-x': 200,
        'position-y': 200,
        'site-plan': 'floor-3',
      },
      status: 1,
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

  /* Static Data end */

  constructor(
    public router: Router,
    public deviceService: DeviceSimService,
    public siteService: SitesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.assignSelectedSite();
  }

  assignSelectedSite(): void {
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      this.selectedSite = data;
      this.fetchConfig();
    });
  }

  fetchConfig(): void {
    this.siteService.GetAllConfig().subscribe((response) => {
      this.config = response;
      this.checkSitePlans();
    });
  }

  checkSitePlans(): void {
    if (this.router.url === '/small-cells') {
      this.config?.sites.forEach((site) => {
        if (this.selectedSite === site['site-id']) {
          if (site['site-plans']) {
            this.sitePlanPresent = true;
            this.sitePlanPresentIndex = this.config?.sites.indexOf(site);
          } else {
            if (this.viewType === 'List') {
              this.sitePlanPresent = false;
            } else {
              this.viewType = 'List';
              this.sitePlanPresent = false;
              this.showSnackBar();
            }
          }
        }
      });
    }
  }

  showSnackBar(): void {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

  toggleDisplayDetails(smallCellIndex: number): void {
    const detailsIndex = this.displayDetails.findIndex(
      (index: number) => index === smallCellIndex
    );

    if (detailsIndex >= 0) {
      this.displayDetails.splice(detailsIndex, 1);
    } else {
      this.displayDetails.push(smallCellIndex);
    }
  }

  decomissionSmallCell(type: string): void {
    const dialogRef = this.dialog.open(DecomissionComponent, {
      width: '450px',
      data: { type },
    });

    dialogRef.afterClosed().subscribe();
  }

  recomissionSmallCell(): void {
    const dialogRef = this.dialog.open(RecomissionComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe();
  }
}
