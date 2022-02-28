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

  // afterEach(() => {
  //   component.ngOnDestroy = function () {};
  //   fixture.destroy();
  // });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #getConfigData()', async () => {
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
        ],
        alerts: 4,
      },
    ];
    component.getConfigData();
  });

  it('should run #onSelectCard()', async () => {
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

    // expect(component.deviceService.mySite).toHaveBeenCalled();
    // expect(component.getServices).toHaveBeenCalled();
  });

  it('should run #getServices()', async () => {
    component.sitesResponse = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ],
    };
    component.sitesService = component.sitesService || {};
    component.sitesService.siteIndex = 'siteIndex';
    component.sitesService.siteId = 'siteId';
    component.sitesService.siteData = 'siteData';
    component.sitesService.sitePlanes = 'sitePlanes';
    component.informParent = component.informParent || {};
    spyOn(component.informParent, 'emit');
    component.sites = component.sites || {};
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
    // expect(component.informParent.emit).toHaveBeenCalled();
  });

  it('should run #getTotalService()', async () => {
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
  });
});

// /*
//  * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {
//   Pipe,
//   PipeTransform,
//   Injectable,
//   CUSTOM_ELEMENTS_SCHEMA,
//   NO_ERRORS_SCHEMA,
//   Directive,
//   Input,
//   Output,
// } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { Observable, of as observableOf, throwError } from 'rxjs';

// import { Component } from '@angular/core';
// import { SitesComponent } from './sites.component';
// import { SitesService } from '../../../../services/sites/sites.service';
// import { DeviceSimService } from 'src/app/services/device-sim.service';
// import { GlobalDataService } from 'src/app/services/global-data.service';

// @Injectable()
// class MockSitesService {
//   GetAllConfig = function () {
//     return observableOf({});
//   };
// }

// @Injectable()
// class MockDeviceSimService {}

// @Injectable()
// class MockGlobalDataService {}

// @Directive({ selector: '[oneviewPermitted]' })
// class OneviewPermittedDirective {
//   @Input() oneviewPermitted;
// }

// @Pipe({ name: 'translate' })
// class TranslatePipe implements PipeTransform {
//   transform(value) {
//     return value;
//   }
// }

// @Pipe({ name: 'phoneNumber' })
// class PhoneNumberPipe implements PipeTransform {
//   transform(value) {
//     return value;
//   }
// }

// @Pipe({ name: 'safeHtml' })
// class SafeHtmlPipe implements PipeTransform {
//   transform(value) {
//     return value;
//   }
// }

// describe('SitesComponent', () => {
//   let fixture;
//   let component;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule, ReactiveFormsModule],
//       declarations: [
//         SitesComponent,
//         TranslatePipe,
//         PhoneNumberPipe,
//         SafeHtmlPipe,
//         OneviewPermittedDirective,
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
//       providers: [
//         { provide: SitesService, useClass: MockSitesService },
//         { provide: DeviceSimService, useClass: MockDeviceSimService },
//         { provide: GlobalDataService, useClass: MockGlobalDataService },
//       ],
//     })
//       .overrideComponent(SitesComponent, {})
//       .compileComponents();
//     fixture = TestBed.createComponent(SitesComponent);
//     component = fixture.debugElement.componentInstance;
//   });

//   afterEach(() => {
//     component.ngOnDestroy = function () {};
//     fixture.destroy();
//   });

//   it('should run #constructor()', async () => {
//     expect(component).toBeTruthy();
//   });

//   it('should run #onSelectCard()', async () => {
//     component.sitesService = component.sitesService || {};
//     component.sitesService.siteIndex = 'siteIndex';
//     component.sitesService.siteId = 'siteId';
//     component.sitesService.siteData = 'siteData';
//     component.sitesService.sitePlanes = 'sitePlanes';
//     component.deviceService = component.deviceService || {};
//     component.sites = component.sites || {};
//     component.sites.siteIndex = {
//       slices: {
//         length: {},
//         i: {
//           alerts: {},
//         },
//         alerts: {},
//       },
//       alerts: {},
//     };
//     component.onSelectCard(
//       {},
//       {
//         slices: {
//           i: {
//             'device-groups': {
//               j: {},
//             },
//             devices: {},
//           },
//         },
//       },
//       {},
//       {},
//       {}
//     );
//     // expect(component.deviceService.mySite).toHaveBeenCalled();
//     // expect(component.getServices).toHaveBeenCalled();
//   });

//   it('should run #getServices()', async () => {
//     component.sitesResponse = component.sitesResponse || {};
//     component.sitesResponse.applications = {
//       k: {
//         'application-id': {},
//       },
//     };
//     component.sitesService = component.sitesService || {};
//     component.sitesService.siteIndex = 'siteIndex';
//     component.sitesService.siteId = 'siteId';
//     component.sitesService.siteData = 'siteData';
//     component.sitesService.sitePlanes = 'sitePlanes';
//     component.informParent = component.informParent || {};
//     component.sites = component.sites || {};
//     component.sites.siteIndex = {
//       alerts: {},
//     };
//     component.getServices(
//       {
//         slices: {
//           i: {
//             applications: {
//               j: {},
//             },
//             services: {},
//           },
//         },
//       },
//       {},
//       {}
//     );
//     // expect(component.informParent.emit).toHaveBeenCalled();
//   });

//   it('should run #getTotalService()', async () => {
//     component.getTotalService({}, {});
//   });
// });
