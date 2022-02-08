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
  //   // console.log(this.globalService.totalConfig[0], this.selectedSite);
  //   let siteID: string;
  //   this.globalService.totalConfig[0].sites.forEach((sitesConfig) => {
  //     siteID = sitesConfig['site-id'];
  //     if (this.selectedSite === siteID) {
  //       sitesConfig.devices.push(connectedDevice);
  //       // console.log(sitesConfig.devices)
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
  //       // * console.log(sitesConfig.devices)
  //     }
  //   });
  // }
  // addDeviceToInventory(inventoryDevice: InventoryDevice): void {
  //   this.getCurrentSite();
  //   let siteID: string;
  //   this.globalService.totalConfig[0].sites.forEach((sitesConfig) => {
  //     siteID = sitesConfig['site-id'];
  //     // console.log(siteID, this.selectedSite);
  //     if (this.selectedSite === siteID) {
  //       sitesConfig['device-inventory'].push(inventoryDevice);
  //       // console.log(sitesConfig['device-inventory']);
  //       // console.log(sitesConfig['device-inventory']);
  //     }
  //   });
  // }
}
