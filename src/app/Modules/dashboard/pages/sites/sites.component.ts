import { Component, Output, Input, EventEmitter } from '@angular/core';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { SitesService } from '../../../../services/sites/sites.service';
import { environment } from '../../../../../environments/environment';
import { Site } from 'src/app/models/site.model';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'aep-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent {
  sites: any;
  selected: string = 'freemont';
  sitesResponse: any;
  baseUrl: string = environment.baseUrl.slice(0, -1);

  @Input() message: any;
  @Output() informParent = new EventEmitter();

  constructor(
    public sitesService: SitesService,
    public deviceService: DeviceSimService,
    public globalService: GlobalDataService
  ) {
    // this.sites = sites[0];
    // //console.log(sites);
    sitesService.GetAllConfig().subscribe(
      (response) => {
        // console.log('Site Response', response);

        this.sitesResponse = response;
        this.sites = this.sitesResponse.sites;

        // logic for alerts start
        let valueOfAlerts = 2;
        for (let i = 0; i < this.sites.length; i++) {
          if (i % 2 !== 1 || i === 0) {
            valueOfAlerts += 2;
            if (valueOfAlerts <= 6) {
              this.sites[i]['alerts'] = valueOfAlerts;
            } else {
              valueOfAlerts = 2;
              this.sites[i]['alerts'] = valueOfAlerts;
            }
          } else {
            this.sites[i]['alerts'] = 0;
          }
        }

        // logic for alerts end

        // console.log('Site Response', this.sites);

        this.onSelectCard(
          this.sitesResponse.sites[0]['site-id'],
          this.sitesResponse.sites[0],
          this.sitesResponse.sites[0]['device-groups'],
          this.sitesResponse.sites[0].devices,
          0
        );
        // console.log('Site Response', this.sitesResponse);
      },
      () => {
        // //console.log('Site Error', error);
      }
    );
  }

  onSelectCard(
    value: string,
    siteData: Site,
    deviceGroup: {
      'device-group-id': string;
      devices: any[];
    }[],
    device: {
      'serial-number': string;
    }[],
    siteIndex: number
  ): void {
    this.sitesService.siteIndex = null;
    this.sitesService.siteId = '';
    this.sitesService.siteData = null;
    // this.deviceService.mySite(value);
    setTimeout(() => {
      this.globalService.mySite(value);
    }, 10);
    this.selected = value;
    for (let i = 0; i < siteData.slices.length; i++) {
      const selecteddevice = [];
      for (let j = 0; j < siteData.slices[i]['device-groups'].length; j++) {
        // console.log(
        //   '||||||||||||||||||||',
        //   siteData.slices[i]['device-groups'][j]
        // );
        for (let k = 0; k < deviceGroup.length; k++) {
          // console.log('+++++++++++++++++', deviceGroup[k]['device-group-id']);
          if (
            siteData.slices[i]['device-groups'][j] ===
            deviceGroup[k]['device-group-id']
          ) {
            let groupName = '';
            const devices = [];
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
              isExpanded: false,
            });
            siteData.slices[i]['devices'] = selecteddevice;
          }
        }
      }
    }

    // logic for alerts start

    for (let i = 0; i < this.sites[siteIndex].slices.length; i++) {
      if (this.sites[siteIndex].slices.length - 1 === 1) {
        this.sites[siteIndex].slices[i]['alerts'] =
          this.sites[siteIndex].alerts;
      } else {
        if (i === 0 || i === 1) {
          this.sites[siteIndex].slices[i]['alerts'] =
            this.sites[siteIndex].alerts / 2;
        } else {
          this.sites[siteIndex].slices[i]['alerts'] = 0;
        }
      }
      // console.log('+++++', this.sites[siteIndex].slices[i]);
    }

    if (this.sites[siteIndex].slices.length === 2) {
      this.sites[siteIndex].slices[this.sites[siteIndex].slices.length - 1][
        'alerts'
      ] = 0;
    }
    this.getServices(siteData, value, siteIndex);

    // logic for alerts end

    // console.log('+++++', siteData.slices);
  }
  getServices(siteData: Site, value: string, siteIndex: number): void {
    for (let i = 0; i < siteData.slices.length; i++) {
      const selectedService = [];
      const service = [];
      for (let j = 0; j < siteData.slices[i].applications.length; j++) {
        for (let k = 0; k < this.sitesResponse.applications.length; k++) {
          if (
            siteData.slices[i].applications[j] ===
            this.sitesResponse.applications[k]['application-id']
          ) {
            // //console.log('|||||||||', this.sitesResponse.applications[k]);
            service.push(this.sitesResponse.applications[k]);
          }
        }
      }
      selectedService.push({
        'display-name': 'Services',
        service: service,
        isExpanded: false,
      });
      siteData.slices[i]['services'] = selectedService;
    }
    // console.log('+++++', siteData);
    this.sitesService.siteIndex = siteIndex;
    this.sitesService.siteId = value;
    this.sitesService.siteData = siteData.slices;

    // this.configResponse.siteData.push(siteData.slices)
    let plans = null;
    if (siteData['site-plans']) {
      plans = siteData['site-plans'];
      // console.log('-++-+-+-+-+-+-+-++', siteData);
    }

    this.informParent.emit({
      siteId: value,
      siteData: siteData.slices,
      siteIndex: siteIndex,
      alerts: this.sites[siteIndex].alerts,
      sitePlans: plans,
    });
  }

  getTotalService(
    slice: { applications: unknown[] }[],
    applications: unknown[]
  ): number {
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

  // getTotalDevices(
  //   data: [{ 'display-name': string; devices: []; isExpanded: boolean }]
  // ): number {
  //   let count = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     count = data[i].devices.length + count;
  //   }
  //   return count;
  // }
}
