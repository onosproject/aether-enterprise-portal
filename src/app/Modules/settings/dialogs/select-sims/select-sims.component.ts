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
    this.assignSelectedSims();
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
      this.inventorySims = data;
    });
  }
}
