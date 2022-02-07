import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  apiUrl: string = 'https://chronos-dev.onlab.us/chronos-exporter/config';

  selectedSite: string = '';

  currentSite: string = '';

  untouchedTotalConfig: any[] = [];

  totalConfig: any[];

  // * session Active

  loggedIn: boolean = true;

  // * Device-sim Storage

  deviceSims = new BehaviorSubject<any>([]);

  deviceInventory = new BehaviorSubject<any>([]);

  // * Device-Groups Storage

  activatedDevices = new BehaviorSubject<any>([]);

  mySite1: Observable<any>;
  private mySiteSubject = new BehaviorSubject<any>('');

  constructor(public http: HttpClient) {}

  mySite(data: string): any {
    this.selectedSite = data;
    console.log(this.selectedSite);
    this.mySiteSubject.next(data);
    // this.fetchDeviceSims(data);
    // this.fetchDeviceInventory(data);
    // this.fetchActivatedDevices(data);
    this.loggedIn = false;
  }

  getSite(): Observable<any> {
    return this.mySiteSubject.asObservable();
  }

  getCurrentSite(): void {
    this.getSite().subscribe((data) => {
      this.selectedSite = data;
    });
  }

  getData(): any {
    const headers = {
      Accept: 'application/json',
    };
    return this.http.get(this.apiUrl, { headers });
  }

  fetchUntouchedCompleteData(): any {
    this.getData().subscribe((untouchedTotalResult) => {
      this.untouchedTotalConfig.push(untouchedTotalResult);
      console.log(
        '-----------> Global Untouched Total config Data is: ',
        this.untouchedTotalConfig
      );
    });
  }

  fetchCompleteData(): any {
    // this.getSite().subscribe((site) => {
    // this.currentSite = site;
    const totalConfigArray: any[] = [];
    console.log('-------------> The selected Site is: ', this.selectedSite);
    this.getData().subscribe((totalResult) => {
      totalConfigArray.push(totalResult);
      console.log(
        '-----------> Global Total config Data is: ',
        this.totalConfig
      );
      console.log(
        '-----------> Local Total config Data is: ',
        totalConfigArray
      );
      totalConfigArray[0].sites.forEach((sitesConfig) => {
        console.log('-----------> These are Sites config: ', sitesConfig);
        if (sitesConfig['site-id'] === 'fremont') {
          sitesConfig['domain-list'] = [
            '128.137.51.006',
            '162.153.31.005',
            '191.136.32.003',
            '196.125.23.002',
            '198.123.21.001',
          ];
          sitesConfig['sims-inventory'] = [
            {
              'display-name': 'Sim 01',
              iccid: '823-456-189',
            },
            {
              'display-name': 'Sim 02',
              iccid: '823-456-289',
            },
            {
              'display-name': 'Sim 03',
              iccid: '823-456-389',
            },
            {
              'display-name': 'Sim 04',
              iccid: '823-456-489',
            },
            {
              'display-name': 'Sim 05',
              iccid: '823-456-519',
            },
          ];
        } else if (sitesConfig['site-id'] === 'berlin') {
          sitesConfig['device-groups-inventory'] = {};
          sitesConfig['device-inventory'] = [
            {
              'display-name': 'Phone 30',
              imei: '098-765-5321',
              location: 'Basement 001',
              selected: 0,
              'serial-number': '098865A',
              // sim: '098-765-532',
              type: 'Phone',
            },
            {
              'display-name': 'Phone 31',
              imei: '098-765-5331',
              location: 'Basement 002',
              selected: 0,
              'serial-number': '098865B',
              // sim: '098-765-533',
              type: 'Phone',
            },
            {
              'display-name': 'Phone 32',
              imei: '098-765-5341',
              location: 'Basement 003',
              selected: 0,
              'serial-number': '098865C',
              // sim: '098-765-534',
              type: 'Phone',
            },
            {
              'display-name': 'Phone 33',
              imei: '098-765-5351',
              location: 'Basement 004',
              selected: 0,
              'serial-number': '098865D',
              // sim: '098-765-535',
              type: 'Phone',
            },
            {
              'display-name': 'Phone 34',
              imei: '098-765-5361',
              location: 'Basement 005',
              selected: 0,
              'serial-number': '098865E',
              // sim: '098-765-536',
              type: 'Phone',
            },
            {
              'display-name': 'Camera 30',
              imei: '099-765-5371',
              location: 'Floor 010',
              selected: 0,
              'serial-number': '099865A',
              // sim: '099-765-537',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 31',
              imei: '099-765-5381',
              location: 'Floor 012',
              selected: 0,
              'serial-number': '099865B',
              // sim: '099-765-538',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 32',
              imei: '099-765-5391',
              location: 'Floor 013',
              selected: 0,
              'serial-number': '099865C',
              // sim: '099-765-539',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 33',
              imei: '099-765-5401',
              location: 'Floor 014',
              selected: 0,
              'serial-number': '099865D',
              // sim: '099-765-540',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 34',
              imei: '099-765-5411',
              location: 'Floor 015',
              selected: 0,
              'serial-number': '099865E',
              // sim: '099-765-541',
              type: 'Camera',
            },
          ];
          sitesConfig['domain-list'] = [
            '328.137.51.006',
            '362.153.31.005',
            '391.136.32.003',
            '396.125.23.002',
            '398.123.21.001',
          ];
          sitesConfig['sims-inventory'] = [
            {
              'display-name': 'Sim 06',
              iccid: '823-456-689',
            },
            {
              'display-name': 'Sim 07',
              iccid: '823-456-789',
            },
            {
              'display-name': 'Sim 08',
              iccid: '823-456-889',
            },
            {
              'display-name': 'Sim 09',
              iccid: '823-456-989',
            },
            {
              'display-name': 'Sim 10',
              iccid: '823-456-099',
            },
          ];
        }
        sitesConfig['device-groups'].forEach((sitesDeviceGroups) => {
          sitesDeviceGroups.devices.forEach(
            (sitesDGdevices, sitesDGdevicesIndex) => {
              // console.log(sitesDGdevices, sitesDGdevicesIndex);

              sitesConfig.services = [];
              sitesConfig['services-inventory'] = [];
              sitesConfig.devices.forEach((sitesDevices) => {
                sitesDevices.selected = 0;
                if (sitesDevices['serial-number'] === sitesDGdevices) {
                  const deviceInfo: any = {
                    'display-name': sitesDevices['display-name'],
                    imei: sitesDevices.imei,
                    location: sitesDevices.location,
                    'serial-number': sitesDevices['serial-number'],
                    sim: sitesDevices.sim,
                    type: sitesDevices.type,
                    selected: 1,
                  };
                  sitesDeviceGroups.devices.splice(
                    sitesDGdevicesIndex,
                    1,
                    deviceInfo
                  );
                }
              });
            }
          );
        });
      });
      this.totalConfig = totalConfigArray;
    });
    console.log(this.totalConfig);
    // });
  }

  // * Device-SIM data

  getDeviceSims(): Observable<any> {
    console.log(this.deviceSims);
    return this.deviceSims.asObservable();
  }

  fetchDeviceSims(site: string): any {
    console.log(this.totalConfig);
    // this.getSite().subscribe((site) => {
    this.currentSite = site;
    console.log(site);
    this.totalConfig[0].sites.forEach((siteConfig) => {
      console.log(siteConfig);
      if (this.currentSite === siteConfig['site-id']) {
        console.log('lol');
        console.log(this.currentSite);
        this.deviceSims.next(siteConfig.devices);
      }
    });
    // });
  }

  getDeviceInventory(): Observable<any> {
    console.log(this.deviceInventory);
    return this.deviceInventory.asObservable();
  }

  fetchDeviceInventory(site: string): any {
    // console.log(this.deviceInventory);

    this.currentSite = site;
    this.totalConfig[0].sites.forEach((siteConfig) => {
      // console.log(siteConfig);
      if (this.currentSite === siteConfig['site-id']) {
        // console.log('lol', siteConfig);
        this.deviceInventory.next(siteConfig['device-inventory']);
      }
    });
  }

  // * Device-Groups data

  getActivatedDevices(): Observable<any> {
    console.log(this.activatedDevices);
    return this.activatedDevices.asObservable();
  }

  fetchActivatedDevices(site: string): any {
    console.log(this.activatedDevices);
    this.currentSite = site;
    this.totalConfig[0].sites.forEach((siteConfig) => {
      if (this.currentSite === siteConfig['site-id']) {
        const activatedDevices: any[] = [];
        siteConfig.devices.forEach((device) => {
          if (device.sim) {
            activatedDevices.push(device);
          }
        });
        this.activatedDevices.next(activatedDevices);
      }
    });
  }
}
