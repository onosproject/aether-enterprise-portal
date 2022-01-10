import { Component, Output, Input, EventEmitter } from '@angular/core';
import { sites } from '../../../../shared/classes/dashboard-data';
import { SitesService } from '../../../../services/sites/sites.service';

@Component({
  selector: 'aep-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent {
  sites: any;
  selected: string = 'freemont';
  sitesResponse: any;

  @Input() message: any;
  @Output() informParent = new EventEmitter();

  constructor(public sitesService: SitesService) {
    // this.sites = sites[0];
    // console.log(sites);
    sitesService.GetAllConfig().subscribe(
      (response) => {
        console.log('Site Response', response);

        this.sitesResponse = response;
        this.sites = this.sitesResponse.sites;
        this.onSelectCard(
          this.sitesResponse.sites[0]['site-id'],
          this.sitesResponse.sites[0],
          this.sitesResponse.sites[0]['device-groups'],
          this.sitesResponse.sites[0].devices,
          0
        );
        // console.log('Site Response', this.sitesResponse);
      },
      (error) => {
        // console.log('Site Error', error);
      }
    );
  }

  onSelectCard(
    value: string,
    siteData: any,
    deviceGroup: any,
    device: any,
    siteIndex: number
  ): void {
    this.selected = value;
    for (let i = 0; i < siteData.slices.length; i++) {
      for (let j = 0; j < siteData.slices[i]['device-groups'].length; j++) {
        for (let k = 0; k < deviceGroup.length; k++) {
          if (
            siteData.slices[i]['device-groups'][j] ===
            deviceGroup[k]['device-group-id']
          ) {
            let groupName = '';
            let selecteddevice = [];
            // console.log('|||||||||', deviceGroup[k]['display-name']);
            let devices = [];
            for (let m = 0; m < deviceGroup[k].devices.length; m++) {
              for (let n = 0; n < device.length; n++) {
                if (device[n]['serial-number'] === deviceGroup[k].devices[m]) {
                  devices.push(device[n]);
                }
              }
            }
            groupName = deviceGroup[k]['display-name'];
            selecteddevice.push({
              'display-name': groupName,
              devices: devices,
            });
            siteData.slices[i]['devices'] = selecteddevice;
          }
        }
      }
    }
    this.getServices(siteData, value, siteIndex);
    // console.log('+++++', siteData.slices);
  }
  getServices(siteData: any, value: string, siteIndex: number) {
    for (let i = 0; i < siteData.slices.length; i++) {
      let selectedService = [];
      let service = [];
      for (let j = 0; j < siteData.slices[i].applications.length; j++) {
        for (let k = 0; k < this.sitesResponse.applications.length; k++) {
          if (
            siteData.slices[i].applications[j] ===
            this.sitesResponse.applications[k]['application-id']
          ) {
            // console.log('|||||||||', this.sitesResponse.applications[k]);
            service.push(this.sitesResponse.applications[k]);
          }
        }
      }
      selectedService.push({
        'display-name': 'Services',
        service: service,
      });
      siteData.slices[i]['services'] = selectedService;
    }
    // console.log('+++++', siteData.slices);
    this.informParent.emit({
      siteId: value,
      siteData: siteData.slices,
      siteIndex: siteIndex,
    });
  }

  getTotalService(slice: any, applications: any) {
    let totalService = 0;
    for (let i = 0; i < slice.length; i++) {
      for (let j = 0; j < slice[i].applications.length; j++) {
        for (let k = 0; k < applications.length; k++) {
          if (applications[k]['application-id'] === slice[i].applications[j]) {
            totalService = 1 + totalService;
          }
        }
      }
    }
    return totalService;
  }
}
