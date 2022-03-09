/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { SitesComponent } from './sites.component';
import { SitesService } from '../../../../services/sites/sites.service';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
class MockSitesService {
  GetAllConfig = function () {
    return observableOf({
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ],
      enterprise: {
        'display-name': 'Tesla',
        'enterprise-id': 'tesla',
        image: '/chronos-exporter/images/tesla-logo.png',
      },
      sites: [
        {
          'device-groups': [
            {
              'device-group-id': 'phones',
              devices: ['752365A', '752908B'],
              'display-name': 'Phones group',
            },
          ],
          devices: [
            {
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
          'site-plans': {
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
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-0.svg',
              },
              {
                id: 'floor-1',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 100,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-1.svg',
              },
              {
                id: 'floor-2',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 200,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-2.svg',
              },
              {
                id: 'floor-3',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 300,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-3.svg',
              },
            ],
          },
          slices: [
            {
              applications: ['nvr-application', 'occupant-counter'],
              'device-groups': ['cameras'],
              'display-name': 'Cameras Slice',
              'slice-id': 'fremont-slice-cameras',
            },
            {
              applications: ['expenses-application'],
              'device-groups': ['phones'],
              'display-name': 'Phones Slice',
              'slice-id': 'fremont-slice-phones',
            },
          ],
          'small-cells': [
            {
              'display-name': 'North Cell',
              position: {
                'position-x': 100,
                'position-y': 50,
                'site-plan': 'floor-0',
              },
              'small-cell-id': 'fremont-sc-north',
            },
            {
              'display-name': 'South Cell',
              position: {
                'position-x': 100,
                'position-y': 150,
                'site-plan': 'floor-1',
              },
              'small-cell-id': 'fremont-sc-south',
            },
            {
              'display-name': 'East Cell',
              position: {
                'position-x': 200,
                'position-y': 100,
                'site-plan': 'floor-2',
              },
              'small-cell-id': 'fremont-sc-east',
            },
            {
              'display-name': 'West Cell',
              position: {
                'position-x': 10,
                'position-y': 100,
                'site-plan': 'floor-0',
              },
              'small-cell-id': 'fremont-sc-west',
            },
          ],
        },
        {
          'device-groups': [
            {
              'device-group-id': 'phones',
              devices: ['752365A', '752908B'],
              'display-name': 'Phones group',
            },
          ],
          devices: [
            {
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
          'site-plans': {
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
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-0.svg',
              },
              {
                id: 'floor-1',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 100,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-1.svg',
              },
              {
                id: 'floor-2',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 200,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-2.svg',
              },
              {
                id: 'floor-3',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 300,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-3.svg',
              },
            ],
          },
          slices: [
            {
              applications: ['nvr-application', 'occupant-counter'],
              'device-groups': ['cameras'],
              'display-name': 'Cameras Slice',
              'slice-id': 'fremont-slice-cameras',
            },
            {
              applications: ['expenses-application'],
              'device-groups': ['phones'],
              'display-name': 'Phones Slice',
              'slice-id': 'fremont-slice-phones',
            },
          ],
          'small-cells': [
            {
              'display-name': 'North Cell',
              position: {
                'position-x': 100,
                'position-y': 50,
                'site-plan': 'floor-0',
              },
              'small-cell-id': 'fremont-sc-north',
            },
            {
              'display-name': 'South Cell',
              position: {
                'position-x': 100,
                'position-y': 150,
                'site-plan': 'floor-1',
              },
              'small-cell-id': 'fremont-sc-south',
            },
            {
              'display-name': 'East Cell',
              position: {
                'position-x': 200,
                'position-y': 100,
                'site-plan': 'floor-2',
              },
              'small-cell-id': 'fremont-sc-east',
            },
            {
              'display-name': 'West Cell',
              position: {
                'position-x': 10,
                'position-y': 100,
                'site-plan': 'floor-0',
              },
              'small-cell-id': 'fremont-sc-west',
            },
          ],
        },
      ],
    });
  };
}

@Injectable()
class MockDeviceSimService {
  mySite1: Observable<string>;
  private mySiteSubject = new BehaviorSubject<string>('');
  mySite(data: string): void {
    this.mySiteSubject.next(data);
  }
}

@Injectable()
class MockGlobalDataService {}

// @Directive({ selector: '[oneviewPermitted]' })
// class OneviewPermittedDirective {
//   @Input() oneviewPermitted;
// }

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

describe('SitesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        SitesComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: SitesService, useClass: MockSitesService },
        { provide: DeviceSimService, useClass: MockDeviceSimService },
        { provide: GlobalDataService, useClass: MockGlobalDataService },
      ],
    })
      .overrideComponent(SitesComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(SitesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run #getConfigData()', async () => {
    spyOn(component.sitesService, 'GetAllConfig').and.returnValue(
      observableOf({
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
          },
        ],
        enterprise: {
          'display-name': 'Tesla',
          'enterprise-id': 'tesla',
          image: '/chronos-exporter/images/tesla-logo.png',
        },
        sites: [
          {
            'device-groups': [
              {
                'device-group-id': 'phones',
                devices: ['752365A', '752908B'],
                'display-name': 'Phones group',
              },
            ],
            devices: [
              {
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
            'site-plans': {
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
            slices: [
              {
                applications: ['nvr-application', 'occupant-counter'],
                'device-groups': ['cameras'],
                'display-name': 'Cameras Slice',
                'slice-id': 'fremont-slice-cameras',
              },
              {
                applications: ['expenses-application'],
                'device-groups': ['phones'],
                'display-name': 'Phones Slice',
                'slice-id': 'fremont-slice-phones',
              },
            ],
            'small-cells': [
              {
                'display-name': 'North Cell',
                position: {
                  'position-x': 100,
                  'position-y': 50,
                  'site-plan': 'floor-0',
                },
                'small-cell-id': 'fremont-sc-north',
              },
              {
                'display-name': 'South Cell',
                position: {
                  'position-x': 100,
                  'position-y': 150,
                  'site-plan': 'floor-1',
                },
                'small-cell-id': 'fremont-sc-south',
              },
              {
                'display-name': 'East Cell',
                position: {
                  'position-x': 200,
                  'position-y': 100,
                  'site-plan': 'floor-2',
                },
                'small-cell-id': 'fremont-sc-east',
              },
              {
                'display-name': 'West Cell',
                position: {
                  'position-x': 10,
                  'position-y': 100,
                  'site-plan': 'floor-0',
                },
                'small-cell-id': 'fremont-sc-west',
              },
            ],
          },
        ],
      })
    );

    spyOn(component, 'onSelectCard').and.callThrough();
    component.getConfigData();
    expect(component.sitesService.GetAllConfig).toHaveBeenCalled();
    expect(component.sitesResponse).toEqual({
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ],
      enterprise: {
        'display-name': 'Tesla',
        'enterprise-id': 'tesla',
        image: '/chronos-exporter/images/tesla-logo.png',
      },
      sites: [
        {
          alerts: 4,
          'device-groups': [
            {
              'device-group-id': 'phones',
              devices: ['752365A', '752908B'],
              'display-name': 'Phones group',
            },
          ],
          devices: [
            {
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
          'site-plans': {
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
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-0.svg',
              },
              {
                id: 'floor-1',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 100,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-1.svg',
              },
              {
                id: 'floor-2',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 200,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-2.svg',
              },
              {
                id: 'floor-3',
                offsets: {
                  'x-offset': 0,
                  'y-offset': 0,
                  'z-offset': 300,
                },
                'svg-file': '/chronos-exporter/site-plans/fremont/floor-3.svg',
              },
            ],
          },
          slices: [
            {
              alerts: 4,
              applications: ['nvr-application', 'occupant-counter'],
              'device-groups': ['cameras'],
              'display-name': 'Cameras Slice',
              'slice-id': 'fremont-slice-cameras',
              services: [
                {
                  'display-name': 'Services',
                  service: [
                    {
                      'application-id': 'nvr-application',
                      'display-name': 'Network Video Recorder',
                    },
                  ],
                  isExpanded: false,
                },
              ],
            },
            {
              alerts: 0,
              applications: ['expenses-application'],
              'device-groups': ['phones'],
              'display-name': 'Phones Slice',
              'slice-id': 'fremont-slice-phones',
              devices: [
                {
                  'display-name': 'Phones group',
                  devices: [
                    {
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
                  ],
                  isExpanded: false,
                },
              ],
              services: [
                {
                  'display-name': 'Services',
                  service: [],
                  isExpanded: false,
                },
              ],
            },
          ],
          'small-cells': [
            {
              'display-name': 'North Cell',
              position: {
                'position-x': 100,
                'position-y': 50,
                'site-plan': 'floor-0',
              },
              'small-cell-id': 'fremont-sc-north',
            },
            {
              'display-name': 'South Cell',
              position: {
                'position-x': 100,
                'position-y': 150,
                'site-plan': 'floor-1',
              },
              'small-cell-id': 'fremont-sc-south',
            },
            {
              'display-name': 'East Cell',
              position: {
                'position-x': 200,
                'position-y': 100,
                'site-plan': 'floor-2',
              },
              'small-cell-id': 'fremont-sc-east',
            },
            {
              'display-name': 'West Cell',
              position: {
                'position-x': 10,
                'position-y': 100,
                'site-plan': 'floor-0',
              },
              'small-cell-id': 'fremont-sc-west',
            },
          ],
        },
      ],
    });
    expect(component.sites).toEqual([
      {
        alerts: 4,
        'device-groups': [
          {
            'device-group-id': 'phones',
            devices: ['752365A', '752908B'],
            'display-name': 'Phones group',
          },
        ],
        devices: [
          {
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
        'site-plans': {
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
              'svg-file': '/chronos-exporter/site-plans/fremont/floor-0.svg',
            },
            {
              id: 'floor-1',
              offsets: {
                'x-offset': 0,
                'y-offset': 0,
                'z-offset': 100,
              },
              'svg-file': '/chronos-exporter/site-plans/fremont/floor-1.svg',
            },
            {
              id: 'floor-2',
              offsets: {
                'x-offset': 0,
                'y-offset': 0,
                'z-offset': 200,
              },
              'svg-file': '/chronos-exporter/site-plans/fremont/floor-2.svg',
            },
            {
              id: 'floor-3',
              offsets: {
                'x-offset': 0,
                'y-offset': 0,
                'z-offset': 300,
              },
              'svg-file': '/chronos-exporter/site-plans/fremont/floor-3.svg',
            },
          ],
        },
        slices: [
          {
            alerts: 4,
            applications: ['nvr-application', 'occupant-counter'],
            'device-groups': ['cameras'],
            'display-name': 'Cameras Slice',
            'slice-id': 'fremont-slice-cameras',
            services: [
              {
                'display-name': 'Services',
                service: [
                  {
                    'application-id': 'nvr-application',
                    'display-name': 'Network Video Recorder',
                  },
                ],
                isExpanded: false,
              },
            ],
          },
          {
            alerts: 0,
            applications: ['expenses-application'],
            'device-groups': ['phones'],
            'display-name': 'Phones Slice',
            'slice-id': 'fremont-slice-phones',
            devices: [
              {
                'display-name': 'Phones group',
                devices: [
                  {
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
                ],
                isExpanded: false,
              },
            ],
            services: [
              {
                'display-name': 'Services',
                service: [],
                isExpanded: false,
              },
            ],
          },
        ],
        'small-cells': [
          {
            'display-name': 'North Cell',
            position: {
              'position-x': 100,
              'position-y': 50,
              'site-plan': 'floor-0',
            },
            'small-cell-id': 'fremont-sc-north',
          },
          {
            'display-name': 'South Cell',
            position: {
              'position-x': 100,
              'position-y': 150,
              'site-plan': 'floor-1',
            },
            'small-cell-id': 'fremont-sc-south',
          },
          {
            'display-name': 'East Cell',
            position: {
              'position-x': 200,
              'position-y': 100,
              'site-plan': 'floor-2',
            },
            'small-cell-id': 'fremont-sc-east',
          },
          {
            'display-name': 'West Cell',
            position: {
              'position-x': 10,
              'position-y': 100,
              'site-plan': 'floor-0',
            },
            'small-cell-id': 'fremont-sc-west',
          },
        ],
      },
    ]);
  });

  it('should run #onSelectCard()', () => {
    component.sites = [
      {
        'device-groups': [],
        devices: [],
        'display-name': 'Fremont, CA',
        image: '/chronos-exporter/images/los-angeles-us.png',
        sims: [],
        slices: [
          {
            applications: [],
            'device-groups': [],
            'display-name': 'Cameras Slice',
            'slice-id': 'fremont-slice-cameras',
            devices: [],
            alerts: 0,
          },
          {
            applications: [],
            'device-groups': [],
            'display-name': 'Cameras Slice',
            'slice-id': 'fremont-slice-cameras',
            devices: [],
            alerts: 0,
          },
          {
            applications: [],
            'device-groups': [],
            'display-name': 'Cameras Slice',
            'slice-id': 'fremont-slice-cameras',
            devices: [],
            alerts: 0,
          },
        ],
        alerts: 4,
      },
    ];
    spyOn(component, 'getServices');
    spyOn(component.deviceService, 'mySite');
    component.onSelectCard(
      'fremont',

      {
        'device-groups': [],
        devices: [],
        'display-name': 'Fremont, CA',
        image: '/chronos-exporter/images/los-angeles-us.png',
        sims: [],
        slices: [
          {
            applications: [],
            'device-groups': ['cameras'],
            'display-name': 'Cameras Slice',
            'slice-id': 'fremont-slice-cameras',
            devices: [],
          },
        ],
      },

      [
        {
          'device-group-id': 'cameras',
          devices: ['752365A'],
          'display-name': 'Cameras group',
        },
      ],
      [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          position: {},
          'serial-number': '752365A',
        },
      ],
      0
    );
    expect(component.deviceService.mySite).toHaveBeenCalled();
    expect(component.getServices).toHaveBeenCalled();
    expect(component.sitesService.siteIndex).toBeNull();
    expect(component.sitesService.siteId).toEqual('');
    expect(component.sitesService.siteData).toBeNull();
    expect(component.sitesService.sitePlanes).toBeNull();
    expect(component.selected).toEqual('fremont');
  });

  it('should run #getServices()', () => {
    component.sitesResponse = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ],
    };
    spyOn(component.informParent, 'emit');
    component.sites.siteIndex = {
      alerts: {},
    };
    component.getServices(
      {
        slices: [
          {
            'device-groups': [],
            devices: [],
            'display-name': 'Fremont, CA',
            image: '/chronos-exporter/images/los-angeles-us.png',
            sims: [],
            applications: ['nvr-application'],
          },
        ],
        'site-plans': {
          isometric: true,
          layers: [],
          origin: 'ORIGIN_TOP_LEFT',
          'site-plan-list': [],
        },
      },
      '',
      0
    );
    expect(component.informParent.emit).toHaveBeenCalled();
    expect(component.sitesService.siteIndex).toEqual(0);
    expect(component.sitesService.siteId).toEqual('');
    expect(component.sitesService.siteData).toEqual([
      {
        'device-groups': [],
        devices: [],
        'display-name': 'Fremont, CA',
        image: '/chronos-exporter/images/los-angeles-us.png',
        sims: [],
        applications: ['nvr-application'],
        services: [
          {
            'display-name': 'Services',
            service: [
              {
                'application-id': 'nvr-application',
                'display-name': 'Network Video Recorder',
              },
            ],
            isExpanded: false,
          },
        ],
      },
    ]);
    expect(component.sitesService.sitePlanes).toEqual({
      isometric: true,
      layers: [],
      origin: 'ORIGIN_TOP_LEFT',
      'site-plan-list': [],
    });
  });

  it('should run #getTotalService()', () => {
    component.getTotalService(
      [
        {
          applications: ['nvr-application'],
          'device-groups': [],
          'display-name': 'Drone Slice',
          'slice-id': 'bengaluru-slice-drones',
        },
      ],
      [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ]
    );
    const value = component.getTotalService(
      [
        {
          applications: ['nvr-application'],
          'device-groups': [],
          'display-name': 'Drone Slice',
          'slice-id': 'bengaluru-slice-drones',
        },
      ],
      [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ]
    );
    expect(value).toEqual(1);
  });
});
