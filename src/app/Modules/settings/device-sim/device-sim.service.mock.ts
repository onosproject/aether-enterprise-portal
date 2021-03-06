/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Config } from 'src/app/models/config.model';
import { InventoryDevice } from 'src/app/models/inventory-device.model';
import { SimInventory } from 'src/app/models/sim-inventory.model';
export class DeviceSimStub {
  apiUrl: string = 'https://chronos-dev.onlab.us/chronos-exporter/config';

  promApiUrl: string = 'https://chronos-dev.onlab.us/prometheus/api/v1';

  selectedSite: string = '';

  mySims1: Observable<SimInventory[]>;
  public mySimsSubject = new BehaviorSubject<SimInventory[]>([]);

  mySite1: Observable<string>;
  public mySiteSubject = new BehaviorSubject<string>('');

  mySim1: Observable<string>;
  public mySimSubject = new Subject<string>();

  myDevice: Observable<InventoryDevice[]>;
  public myDeviceSubject = new BehaviorSubject<InventoryDevice[]>([]);

  myDevice1: Observable<InventoryDevice>;
  public myDeviceSubject1 = new BehaviorSubject<InventoryDevice[]>([]);

  constructor() {
    // this.mySim1 = this.mySimSubject.asObservable();
    this.myDevice = this.myDeviceSubject.asObservable();
  }

  getSite(): Observable<string> {
    return of('fremont');
  }

  getSim1(): Observable<string> {
    return of('123-456-789');
  }

  getDevice1(): Observable<InventoryDevice[]> {
    return of([
      {
        'display-name': 'Camera 9',
        imei: '',
        location: 'Corridor 4',
        'serial-number': '7568119',
        type: 'Camera',
        'device-group-in': 'Cameras group',
        'device-group-id-in': 'cameras',
        'slice-in': 'Cameras Slice',
      },
    ]);
  }

  setDevice(data: InventoryDevice[]): void {
    // this.selectedSim = data
    // //console.log(this.selectedSim)
    this.myDeviceSubject.next(data);
  }

  mySims(data: SimInventory[]): void {
    // this.selectedSims = data;
    this.mySimsSubject.next(data);
  }

  myDevices(data: InventoryDevice[]): void {
    this.myDeviceSubject.next(data);
  }

  getData(): Observable<Config> {
    return of({
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ],
      enterprise: [
        {
          'display-name': 'Tesla',
          'enterprise-id': 'tesla',
          image: '/chronos-exporter/images/tesla-logo.png',
        },
      ],
      sites: [
        {
          'device-groups': [
            {
              'device-group-id': 'phones',
              devices: ['752365A', '752908B'],
              'display-name': 'Phones group',
            },
            {
              'device-group-id': 'cameras',
              devices: ['7568112'],
              'display-name': 'Cameras group',
            },
            {
              'device-group-id': 'cameras',
              devices: ['7568118'],
              'display-name': 'Cameras group',
            },
          ],
          devices: [
            {
              'device-group-id-in': 'phones',
              'display-name': 'Phone 1',
              imei: '123-456-7891',
              location: 'Somewhere',
              position: {
                'position-x': 110,
                'position-y': 50,
                'site-plan': 'floor-0',
              },
              'serial-number': '752365A',
              sim: '123-456-789',
              type: 'Pixel 5 Phone',
            },
            {
              'device-group-id-in': 'cameras',
              'display-name': 'Camera 2',
              imei: '123-456-7894',
              location: 'South Gate',
              'serial-number': '7568112',
              sim: '123-456-786',
              type: 'Camera',
            },
            {
              'device-group-id-in': 'cameras',
              'display-name': 'Camera 8',
              imei: '',
              location: 'Corridor 3',
              'serial-number': '7568118',
              type: 'Camera',
            },
          ],
          'display-name': 'Fremont, CA',
          image: '/chronos-exporter/images/los-angeles-us.png',
          sims: [
            {
              'display-name': 'Sim 11',
              iccid: '123-456-791',
            },
          ],
          'site-id': 'fremont',
          'site-plans': [
            {
              isometric: true,
              layers: [
                {
                  'layer-id': 'Structure',
                },
                {
                  'layer-id': 'Text',
                },
              ],
              origin: 'ORIGIN_TOP_LEFT',
              'site-plan-list': [
                {
                  id: 'floor-0',
                  offsets: {
                    'x-offset': 0,
                    'y-offset': 0,
                    'z-offset': 0,
                  },
                  'svg-file':
                    '/chronos-exporter/site-plans/fremont/floor-0.svg',
                },
                {
                  id: 'floor-1',
                  offsets: {
                    'x-offset': 0,
                    'y-offset': 0,
                    'z-offset': 100,
                  },
                  'svg-file':
                    '/chronos-exporter/site-plans/fremont/floor-1.svg',
                },
                {
                  id: 'floor-2',
                  offsets: {
                    'x-offset': 0,
                    'y-offset': 0,
                    'z-offset': 200,
                  },
                  'svg-file':
                    '/chronos-exporter/site-plans/fremont/floor-2.svg',
                },
                {
                  id: 'floor-3',
                  offsets: {
                    'x-offset': 0,
                    'y-offset': 0,
                    'z-offset': 300,
                  },
                  'svg-file':
                    '/chronos-exporter/site-plans/fremont/floor-3.svg',
                },
              ],
            },
          ],
          slices: [
            {
              applications: ['nvr-application', 'occupant-counter'],
              'device-groups': ['cameras'],
              'display-name': 'Cameras Slice',
              'slice-id': 'freemont-slice-cameras',
            },
          ],
          'small-cells': [
            {
              'display-name': 'North Cell',
              'small-cell-id': 'freemont-sc-north',
            },
          ],
        },
      ],
    });
  }
}
