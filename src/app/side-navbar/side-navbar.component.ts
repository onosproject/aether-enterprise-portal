import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aep-side-navbar',
  templateUrl: './side-navbar.component.html',
  styles: [],
})
export class SideNavbarComponent {
  imgSrc: string;

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

  constructor(public router: Router) {}
}
