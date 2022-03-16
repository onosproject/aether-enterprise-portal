/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
// import { GlobalDataService } from 'src/app/services/global-data.service';
// import { InventoryDevice } from 'src/app/models/inventory-device.model';
// import { ConnectedDevice } from 'src/app/models/connected-device.model';
// import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DeviceSimHelperService {
  // selectedSite: string = '';
  // constructor(public globalService: GlobalDataService) {}
  // getCurrentSite(): void {
  //   this.globalService.getSite().subscribe((data) => {
  //     this.selectedSite = data;
  //   });
  // }
  // addDeviceSim(connectedDevice: ConnectedDevice): void {
  //   this.getCurrentSite();
  //   let siteID: string;
  //   this.globalService.totalConfig[0].sites.forEach((sitesConfig) => {
  //     siteID = sitesConfig['site-id'];
  //     if (this.selectedSite === siteID) {
  //       sitesConfig.devices.push(connectedDevice);
  //     }
  //   });
  // }
  // editDeviceSim(index: number, form: FormGroup['value']): void {
  //   this.getCurrentSite();
  //   let siteID: string;
  //   this.globalService.totalConfig[0].sites.forEach((sitesConfig) => {
  //     siteID = sitesConfig['site-id'];
  //     if (this.selectedSite === siteID) {
  //       const device = sitesConfig.devices[index];
  //       device.sim = form.newSim;
  //       device['display-name'] = form.deviceName;
  //       device.location = form.deviceLocation;
  //       device['serial-number'] = form.deviceSerialNum;
  //     }
  //   });
  // }
  // addDeviceToInventory(inventoryDevice: InventoryDevice): void {
  //   this.getCurrentSite();
  //   let siteID: string;
  //   this.globalService.totalConfig[0].sites.forEach((sitesConfig) => {
  //     siteID = sitesConfig['site-id'];
  //     if (this.selectedSite === siteID) {
  //       sitesConfig['device-inventory'].push(inventoryDevice);
  //     }
  //   });
  // }
}
