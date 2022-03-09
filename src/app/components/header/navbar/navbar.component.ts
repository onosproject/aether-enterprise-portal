/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SitesService } from 'src/app/services/sites/sites.service';
import { smallCell } from '../../../shared/classes/dashboard-data';
import { DeviceSimService } from 'src/app/services/device-sim.service';
@Component({
  selector: 'aep-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  imgSrc: string;

  url = '';

  menuIcons = {
    admin: {
      adminString: '../../assets/SideCol-Navbar/admin.svg',
      adminActive: '../../assets/SideCol-Navbar/admin-active.svg',
      adminInactive: '../../assets/SideCol-Navbar/admin.svg',
    },
    devices: {
      devicesString: '../../assets/SideCol-Navbar/devices.svg',
      devicesActive: '../../assets/SideCol-Navbar/devices-active.svg',
      devicesInactive: '../../assets/SideCol-Navbar/devices.svg',
    },
    services: {
      servicesString: '../../assets/SideCol-Navbar/services.svg',
      servicesActive: '../../assets/SideCol-Navbar/services-active.svg',
      servicesInactive: '../../assets/SideCol-Navbar/services.svg',
    },
    smallCells: {
      smallCellsString: '../../assets/SideCol-Navbar/smallCells.svg',
      smallCellsActive: '../../assets/SideCol-Navbar/smallCells-active.svg',
      smallCellsInactive: '../../assets/SideCol-Navbar/smallCells.svg',
    },
    deviceGroups: {
      deviceGroupsString: '../../assets/SideCol-Navbar/deviceGroups.svg',
      deviceGroupsActive: '../../assets/SideCol-Navbar/deviceGroups-active.svg',
      deviceGroupsInactive: '../../assets/SideCol-Navbar/deviceGroups.svg',
    },
    slices: {
      slicesString: '../../assets/SideCol-Navbar/slices.svg',
      slicesActive: '../../assets/SideCol-Navbar/slices-active.svg',
      slicesInactive: '../../assets/SideCol-Navbar/slices.svg',
    },
    audit: {
      auditString: '../../assets/SideCol-Navbar/slices.svg',
      auditActive: '../../assets/SideCol-Navbar/slices-active.svg',
      auditInactive: '../../assets/SideCol-Navbar/slices.svg',
    },
  };

  constructor(
    public router: Router,
    private sitesService: SitesService,
    private deviceService: DeviceSimService
  ) {}
  // Boolean Triggers
  trigger: boolean = false;
  controlMenuTrigger: boolean = false;
  alert: string;

  // Static Values
  devices: number = 0;
  unprovisionedDevices: number = 0;
  Slices: number = 0;
  Layers: number = 0;
  Sites: number = 0;
  SmallCells: number = 0;

  data;
  services: number = 0;

  goToSmallCells(): void {
    smallCell[0][0].alerts = this.sitesService.allSmallCellsData;
    this.router.navigate(['/Small-Cells', { isNotification: true }]);
  }

  getDataFromDashboard(siteId: string): void {
    this.alert = siteId;
    // alert();
  }

  getConfig(): void {
    this.deviceService.getData().subscribe((response) => {
      this.data = response;
      this.getEnterpriseMenuData();
    });
  }

  getEnterpriseMenuData(): void {
    this.Layers = this.data.applications.length;
    this.Sites = this.data.sites.length;
    const devicesArr = [];
    const slicesArr = [];
    const smallCellsArr = [];
    const unprovisionedArr = [];
    this.data.sites.forEach((site) => {
      devicesArr.push(...site.devices);
      // console.log(devicesArr);
      slicesArr.push(...site.slices);
      // console.log(slicesArr);
      smallCellsArr.push(...site['small-cells']);
      // console.log(smallCellsArr);
    });
    devicesArr.forEach((device) => {
      if (!device.sim) {
        unprovisionedArr.push(device);
      }
    });
    this.devices = devicesArr.length;
    this.Slices = slicesArr.length;
    this.SmallCells = smallCellsArr.length;
    this.unprovisionedDevices = unprovisionedArr.length;
    // console.log(this.services);
    // console.log(response);
  }
}
