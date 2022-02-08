import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceSimService } from '../services/device-sim.service';
import { GlobalDataService } from '../services/global-data.service';

@Component({
  selector: 'aep-side-navbar',
  templateUrl: './side-navbar.component.html',
  styles: [],
})
export class SideNavbarComponent implements OnInit {
  imgSrc: string;
  url = '';

  sites: any[] = [];

  // elements: any[] = [];

  selectSite: string = this.deviceService.selectedSite;

  @Output() newSiteEvent = new EventEmitter<string>();

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
  currentUrl: string;

  constructor(
    public router: Router,
    public deviceService: DeviceSimService,
    public globalService: GlobalDataService
  ) {
    this.getCurrentRoute();
  }

  ngOnInit(): void {
    this.fetchSites();
    // this.deviceService.mySite('freemont');
  }

  fetchSites(): any {
    this.deviceService.getData().subscribe((result) => {
      result.sites.map((site) => {
        //console.log(site['site-id']);
        const siteID: string = site['site-id'];
        const siteName: string = site['display-name'];
        this.sites.push({ siteID, siteName });
        //console.log(this.sites);
      });
    });
  }

  selectedSite(siteID: string): any {
    this.deviceService.mySite(siteID);
    // this.globalService.mySite(siteID);
    this.newSiteEvent.emit(siteID);
    this.selectSite = siteID;
    this.deviceService.selectedSite = siteID;
    //console.log(this.selectSite);

    //console.log(this.deviceService.selectedSite);
  }

  getCurrentRoute(): any {
    this.currentUrl = this.router.url;
    // console.log(this.router.url, 'Current URL');
  }
}
