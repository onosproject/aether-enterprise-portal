/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InventoryDevice } from 'src/app/models/inventory-device.model';
import { DeviceSimService } from 'src/app/services/device-sim.service';

@Component({
  selector: 'aep-select-devices',
  templateUrl: './select-devices.component.html',
  styles: [],
})
export class SelectDevicesComponent implements OnInit {
  selectedDevice: InventoryDevice = null;

  inventoryDevices = [];

  constructor(
    public deviceService: DeviceSimService,
    public dialogRef: MatDialogRef<SelectDevicesComponent> // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getInventory();
  }

  sims = [
    {
      id: 1,
      simNumber: 72348723473240,
      isSelected: false,
    },
    {
      simNumber: 72348723473241,
      isSelected: false,
    },
    {
      simNumber: 72348723473242,
      isSelected: false,
    },
    {
      simNumber: 72348723473243,
      isSelected: false,
    },
    {
      simNumber: 72348723473244,
      isSelected: false,
    },
    {
      simNumber: 72348723473245,
      isSelected: false,
    },
    {
      simNumber: 72348723473246,
      isSelected: false,
    },
    {
      simNumber: 72348723473247,
      isSelected: false,
    },
    {
      simNumber: 72348723473248,
      isSelected: false,
    },
    {
      simNumber: 72348723473249,
      isSelected: false,
    },
    {
      simNumber: 72348723473250,
      isSelected: false,
    },
    {
      simNumber: 72348723473251,
      isSelected: false,
    },
  ];

  devices = [
    {
      id: 7529789,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 7529790,
      deviceName: 'Camera 2',
      locationName: 'Location 2',
    },
    {
      id: 7529791,
      deviceName: 'Camera 3',
      locationName: 'Location 3',
    },
    {
      id: 7529792,
      deviceName: 'Camera 4',
      locationName: 'Location 4',
    },
    {
      id: 7529793,
      deviceName: 'Camera 5',
      locationName: 'Location 5',
    },
    {
      id: 7529794,
      deviceName: 'Camera 6',
      locationName: 'Location 6',
    },
    {
      id: 7529795,
      deviceName: 'Camera 7',
      locationName: 'Location 7',
    },
    {
      id: 7529796,
      deviceName: 'Camera 8',
      locationName: 'Location 8',
    },
    {
      id: 7529797,
      deviceName: 'Camera 9',
      locationName: 'Location 9',
    },
    {
      id: 7529798,
      deviceName: 'Camera 10',
      locationName: 'Location 10',
    },
    {
      id: 7529799,
      deviceName: 'Camera 11',
      locationName: 'Location 11',
    },
    {
      id: 7529800,
      deviceName: 'Camera 12',
      locationName: 'Location 12',
    },
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeSelection(id: string): void {
    this.inventoryDevices.forEach((device) => {
      if (device['serial-number'] === id) {
        this.selectedDevice = device;
      }
    });
  }

  selectDeviceFinal(): void {
    this.deviceService.setDevice([this.selectedDevice]);
    this.dialogRef.close();
  }

  getInventory(): void {
    this.deviceService.getDevice().subscribe((data) => {
      this.inventoryDevices = data;
    });
  }
}
