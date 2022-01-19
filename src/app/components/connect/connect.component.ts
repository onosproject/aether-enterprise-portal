import { Component, OnInit } from '@angular/core';
import { DeviceGroup, Slice, sliceData } from './slice.model';
import { SitesService } from '../../services/sites/sites.service';

@Component({
  selector: 'aep-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  slices: any = [];
  innerWidth = 1000;
  innerHeight = 500;

  sites: any;
  selected: string = 'freemont';
  sitesResponse: any;

  constructor(public sitesService: SitesService) {
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
      () => {
        // console.log('Site Error', error);
      }
    );
  }

  ngOnInit(): void {
    // this.slices = sliceData;
  }

  onSelectCard(
    value: string,
    siteData: { slices: any[] },
    deviceGroup: {
      'device-group-id': string;
      devices: any[];
    }[],
    device: {
      'serial-number': string;
    }[],
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
            const selecteddevice = [];
            // console.log('|||||||||', deviceGroup[k]['display-name']);
            const devices = [];
            for (let m = 0; m < deviceGroup[k].devices.length; m++) {
              for (let n = 0; n < device.length; n++) {
                if (device[n]['serial-number'] === deviceGroup[k].devices[m]) {
                  devices.push(device[n]);
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
            // groupName = deviceGroup[k]['display-name'];
            // selecteddevice.push({
            //   'display-name': groupName,
            //   devices: devices,
            //   isExpanded: false,
            // });
            // siteData.slices[i]['devices'] = selecteddevice;
          }
        }
      }
    }
    this.getServices(siteData, value, siteIndex);
    // console.log('+++++', siteData.slices[0]);
  }
  getServices(
    siteData: {
      slices: any[];
    },
    value: string,
    siteIndex: number
  ): void {
    for (let i = 0; i < siteData.slices.length; i++) {
      const selectedService = [];
      const service = [];
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
    this.slices = siteData.slices;
    console.log('+++++', this.slices);

    // this.informParent.emit({
    //   siteId: value,
    //   siteData: siteData.slices,
    //   siteIndex: siteIndex,
    // });
  }

  calculateDevices(deviceGroups: DeviceGroup[]): number {
    let noOfDevices: number = 0;
    for (let i = 0; i < deviceGroups.length; i++) {
      noOfDevices += deviceGroups[i].devices.length;
    }
    return noOfDevices;
  }

  calculateSVGHeight(
    noOfDeviceGroups: number,
    isExpanded: boolean,
    deviceGroups: DeviceGroup[]
  ): number {
    // const totalHeight = noOfDeviceGroups * (isExpanded ? 420 : 120);
    // return totalHeight > 450 ? totalHeight : 450;
    let totalHeight = 0;
    for (let i = 0; i < deviceGroups.length; i++) {
      totalHeight += deviceGroups[i].isExpanded ? 420 : 120;
    }
    totalHeight += 400;

    return totalHeight > 450 ? totalHeight : 450;
  }

  calculateDeviceTop(index: number, deviceGroups: DeviceGroup[]): number {
    if (index === 0) {
      return 20;
    } else {
      let height = 20;
      for (let i = 0; i < index; i++) {
        height += deviceGroups[i].isExpanded ? 420 : 120;
      }
      // return index * (isExpaned ? 400 : 100) + 20 * (index + 1);
      return height;
    }
  }

  calculateJointVerticalPosition(
    deviceGroups: DeviceGroup[],
    index: number
  ): number {
    let height =
      deviceGroups.length !== index
        ? deviceGroups[index].isExpanded
          ? 200
          : 50
        : 50;
    for (let i = 0; i < index; i++) {
      height += deviceGroups[i].isExpanded ? 420 : 120;
    }
    return height;
  }
}
