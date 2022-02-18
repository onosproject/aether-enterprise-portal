/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SitesComponent } from "./sites.component";
import { HttpClientModule } from "@angular/common/http";

describe("SitesComponent", () => {
  let component: SitesComponent;
  let fixture: ComponentFixture<SitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SitesComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
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
