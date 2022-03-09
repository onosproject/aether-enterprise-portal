/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceSimService } from 'src/app/services/device-sim.service';

@Component({
  selector: 'aep-select-sims',
  templateUrl: './select-sims.component.html',
  styles: [],
})
export class SelectSimsComponent implements OnInit {
  selectedSim: string = '';

  config = [];

  selectedSite: string = '';

  inventorySims = [];

  sims = [];

  constructor(
    public deviceService: DeviceSimService,
    public dialogRef: MatDialogRef<SelectSimsComponent> // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.assignSelectedSite1();
    this.assignSelectedSims();
  }

  assignSelectedSite1(): void {
    this.deviceService.getSite().subscribe((data) => {
      this.selectedSite = data;
      this.fetchSims();
    });
  }

  fetchSims(): void {
    this.deviceService.getData().subscribe((aetherConfig) => {
      const configArray = [];
      configArray.push(aetherConfig);
      configArray.map((item) => {
        const sitesConfig = item.sites;
        sitesConfig.map((site) => {
          //console.log(site['display-name']);
          /* istanbul ignore else */
          if (site['display-name'] === this.selectedSite) {
            this.sims.push(site.sims);
          }
        });
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeSelection(simIccid: string): void {
    this.selectedSim = simIccid;
  }

  selectSimFinal(): void {
    this.deviceService.mySim(this.selectedSim);
    this.dialogRef.close();
  }

  assignSelectedSims(): void {
    this.deviceService.getSims().subscribe((data) => {
      console.log(data);
      this.inventorySims = data;
      console.log(this.inventorySims);
    });
  }
}
