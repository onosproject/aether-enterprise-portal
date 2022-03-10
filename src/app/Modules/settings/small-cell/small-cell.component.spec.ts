/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';
import { SmallCellComponent } from './small-cell.component';
import { DecomissionComponent } from '../dialogs/decomission/decomission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecomissionComponent } from '../dialogs/recomission/recomission.component';
describe('SmallCellComponent', () => {
  let component: SmallCellComponent;
  let fixture: ComponentFixture<SmallCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SmallCellComponent,
        DecomissionComponent,
        RecomissionComponent,
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        RouterModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ngOnInit()', () => {
    spyOn(component, 'assignSelectedSite');
    component.ngOnInit();
    expect(component.assignSelectedSite).toHaveBeenCalled();
  });

  it('should run #assignSelectedSite()', async () => {
    component.deviceService = component.deviceService;
    spyOn(component.deviceService, 'getSite').and.returnValue(
      observableOf('fremont')
    );
    spyOn(component, 'fetchConfig');
    component.assignSelectedSite();
    expect(component.deviceService.getSite).toHaveBeenCalled();
    expect(component.selectedSite).toEqual('fremont');
    expect(component.fetchConfig).toHaveBeenCalled();
  });

  it('should run #fetchConfig()', async () => {
    component.siteService = component.siteService;
    spyOn(component.siteService, 'GetAllConfig').and.returnValue(
      observableOf({
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
      })
    );
    component.fetchConfig();
    expect(component.siteService.GetAllConfig).toHaveBeenCalled();
    expect(component.config).toEqual({
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
  });

  it('should run #toggleDisplayDetails()', () => {
    component.displayDetails = [0];
    component.toggleDisplayDetails(0);
    expect(component.displayDetails).toEqual([]);
  });

  it('should run #toggleDisplayDetails()', () => {
    component.displayDetails = [];
    component.toggleDisplayDetails(0);
    expect(component.displayDetails).toEqual([0]);
  });

  it('should run #decomissionSmallCell()', async () => {
    component.dialog = component.dialog;
    spyOn(component.dialog, 'open').and.callThrough();
    component.decomissionSmallCell('');
    expect(component.dialog.open).toHaveBeenCalledWith(DecomissionComponent, {
      width: '450px',
      data: {
        type: '',
      },
    });
  });

  it('should run #recomissionSmallCell()', async () => {
    component.dialog = component.dialog;
    spyOn(component.dialog, 'open').and.callThrough();
    component.recomissionSmallCell();
    expect(component.dialog.open).toHaveBeenCalledWith(RecomissionComponent, {
      width: '450px',
    });
  });
  it('should run #checkSitePlans()', () => {
    component.config = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
        {
          'application-id': 'occupant-counter',
          'display-name': 'Occupant Counting Application',
        },
        {
          'application-id': 'expenses-application',
          'display-name': 'Expenses Application',
        },
        {
          'application-id': 'drone-application',
          'display-name': 'Drone Application',
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
            {
              'device-group-id': 'cameras',
              devices: [
                '7568111',
                '7568112',
                '7568113',
                '7568114',
                '7568115',
                '7568116',
                '7568117',
                '7568118',
                '7568119',
              ],
              'display-name': 'Cameras group',
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
            {
              'display-name': 'Phone 2',
              imei: '123-456-7892',
              location: 'Somewhere',
              position: {
                'position-x': 120,
                'position-y': 60,
                'site-plan': 'floor-0',
              },
              'serial-number': '752908B',
              sim: '123-456-788',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Camera 1',
              imei: '123-456-7893',
              location: 'Front entrance',
              position: {
                'position-x': 130,
                'position-y': 70,
                'site-plan': 'floor-0',
              },
              'serial-number': '7568111',
              sim: '123-456-787',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 2',
              imei: '123-456-7894',
              location: 'South Gate',
              'serial-number': '7568112',
              sim: '123-456-786',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 3',
              imei: '123-456-7895',
              location: 'Store Room 1',
              'serial-number': '7568113',
              sim: '123-456-785',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 4',
              imei: '123-456-7896',
              location: 'Store Room 2',
              'serial-number': '7568114',
              sim: '123-456-784',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 5',
              imei: '123-456-7897',
              location: 'Corridor 1',
              'serial-number': '7568115',
              sim: '123-456-783',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 6',
              imei: '123-456-7898',
              location: 'Corridor 2',
              'serial-number': '7568116',
              sim: '123-456-782',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 7',
              imei: '123-456-7899',
              location: 'Atrium',
              'serial-number': '7568117',
              sim: '123-456-781',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 8',
              imei: '',
              location: 'Corridor 3',
              'serial-number': '7568118',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 9',
              imei: '',
              location: 'Corridor 4',
              'serial-number': '7568119',
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
            {
              'display-name': 'Sim 10',
              iccid: '123-456-790',
            },
            {
              'display-name': 'Sim 9',
              iccid: '123-456-789',
            },
            {
              'display-name': 'Sim 8',
              iccid: '123-456-788',
            },
            {
              'display-name': 'Sim 7',
              iccid: '123-456-787',
            },
            {
              'display-name': 'Sim 6',
              iccid: '123-456-786',
            },
            {
              'display-name': 'Sim 5',
              iccid: '123-456-785',
            },
            {
              'display-name': 'Sim 4',
              iccid: '123-456-784',
            },
            {
              'display-name': 'Sim 3',
              iccid: '123-456-783',
            },
            {
              'display-name': 'Sim 2',
              iccid: '123-456-782',
            },
            {
              'display-name': 'Sim 1',
              iccid: '123-456-781',
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
    };
    component.selectedSite = 'fremont';
    component.checkSitePlans();
    expect(component.sitePlanPresent).toBeTrue();
    expect(component.sitePlanPresentIndex).toEqual(0);
  });

  it('should run #checkSitePlans()', () => {
    component.config = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
        {
          'application-id': 'occupant-counter',
          'display-name': 'Occupant Counting Application',
        },
        {
          'application-id': 'expenses-application',
          'display-name': 'Expenses Application',
        },
        {
          'application-id': 'drone-application',
          'display-name': 'Drone Application',
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
              devices: [
                '18876871',
                '18876872',
                '18876873',
                '18876874',
                '18876875',
              ],
              'display-name': 'Phones group',
            },
            {
              'device-group-id': 'cameras',
              devices: [
                '18876881',
                '18876882',
                '18876883',
                '18876884',
                '18876885',
                '18876886',
                '18876887',
                '18876888',
              ],
              'display-name': 'Cameras group',
            },
          ],
          devices: [
            {
              'display-name': 'Phone 1',
              imei: '123-456-7891',
              location: 'Somewhere',
              'serial-number': '18876871',
              sim: '123-671-789',
              type: 'Pixel 5 Phone',
            },
            {
              'display-name': 'Phone 2',
              imei: '123-671-7892',
              location: 'Somewhere',
              'serial-number': '18876872',
              sim: '123-671-788',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Phone 3',
              imei: '123-671-7893',
              location: 'Somewhere',
              'serial-number': '18876873',
              sim: '123-671-787',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Phone 4',
              imei: '123-671-7894',
              location: 'Somewhere',
              'serial-number': '18876874',
              sim: '123-671-786',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Phone 5',
              imei: '123-671-7895',
              location: 'Somewhere',
              'serial-number': '18876875',
              sim: '123-671-785',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Camera 1',
              imei: '123-671-7896',
              location: 'Front entrance',
              'serial-number': '18876881',
              sim: '123-671-784',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 2',
              imei: '123-671-7897',
              location: 'South Gate',
              'serial-number': '18876882',
              sim: '123-671-783',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 3',
              imei: '123-671-7898',
              location: 'Store Room 1',
              'serial-number': '18876883',
              sim: '123-671-782',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 4',
              imei: '123-671-7899',
              location: 'Store Room 2',
              'serial-number': '18876884',
              sim: '123-671-781',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 5',
              imei: '123-671-7900',
              location: 'Corridor 1',
              'serial-number': '18876885',
              sim: '123-671-780',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 6',
              imei: '123-671-7901',
              location: 'Corridor 2',
              'serial-number': '18876886',
              sim: '123-671-779',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 7',
              imei: '123-671-7902',
              location: 'Atrium',
              'serial-number': '18876887',
              sim: '123-671-778',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 8',
              imei: '',
              location: 'Corridor 2',
              'serial-number': '18876888',
              type: 'Camera',
            },
          ],
          'display-name': 'Berlin, DE',
          image: '/chronos-exporter/images/berlin-deutschland.png',
          sims: [
            {
              'display-name': 'Sim 9',
              iccid: '123-671-789',
            },
            {
              'display-name': 'Sim 8',
              iccid: '123-671-788',
            },
            {
              'display-name': 'Sim 7',
              iccid: '123-671-787',
            },
            {
              'display-name': 'Sim 6',
              iccid: '123-671-786',
            },
            {
              'display-name': 'Sim 5',
              iccid: '123-671-785',
            },
            {
              'display-name': 'Sim 4',
              iccid: '123-671-784',
            },
            {
              'display-name': 'Sim 3',
              iccid: '123-671-783',
            },
            {
              'display-name': 'Sim 2',
              iccid: '123-671-782',
            },
            {
              'display-name': 'Sim 1',
              iccid: '123-671-781',
            },
            {
              'display-name': 'Sim 1a',
              iccid: '123-671-780',
            },
            {
              'display-name': 'Sim 1b',
              iccid: '123-671-779',
            },
            {
              'display-name': 'Sim 1c',
              iccid: '123-671-778',
            },
            {
              'display-name': 'Sim 1d',
              iccid: '123-671-779',
            },
            {
              'display-name': 'Sim 1e',
              iccid: '123-671-780',
            },
            {
              'display-name': 'Sim 1f',
              iccid: '123-671-781',
            },
          ],
          'site-id': 'berlin',
          slices: [
            {
              applications: ['nvr-application', 'occupant-counter'],
              'device-groups': ['cameras'],
              'display-name': 'Cameras Slice',
              'slice-id': 'berlin-slice-cameras',
            },
            {
              applications: ['expenses-application'],
              'device-groups': ['phones'],
              'display-name': 'Phones Slice',
              'slice-id': 'berlin-slice-phones',
            },
          ],
          'small-cells': [
            {
              'display-name': 'North Cell',
              'small-cell-id': 'berlin-sc-north',
            },
            {
              'display-name': 'South Cell',
              'small-cell-id': 'berlin-sc-south',
            },
            {
              'display-name': 'East Cell',
              'small-cell-id': 'berlin-sc-east',
            },
            {
              'display-name': 'West Cell',
              'small-cell-id': 'berlin-sc-west',
            },
          ],
        },
      ],
    };
    component.selectedSite = 'berlin';
    component.viewType = 'List';
    component.checkSitePlans();
    expect(component.sitePlanPresent).toBeFalse();
  });

  it('should run #checkSitePlans()', () => {
    component.config = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
        {
          'application-id': 'occupant-counter',
          'display-name': 'Occupant Counting Application',
        },
        {
          'application-id': 'expenses-application',
          'display-name': 'Expenses Application',
        },
        {
          'application-id': 'drone-application',
          'display-name': 'Drone Application',
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
              devices: [
                '18876871',
                '18876872',
                '18876873',
                '18876874',
                '18876875',
              ],
              'display-name': 'Phones group',
            },
            {
              'device-group-id': 'cameras',
              devices: [
                '18876881',
                '18876882',
                '18876883',
                '18876884',
                '18876885',
                '18876886',
                '18876887',
                '18876888',
              ],
              'display-name': 'Cameras group',
            },
          ],
          devices: [
            {
              'display-name': 'Phone 1',
              imei: '123-456-7891',
              location: 'Somewhere',
              'serial-number': '18876871',
              sim: '123-671-789',
              type: 'Pixel 5 Phone',
            },
            {
              'display-name': 'Phone 2',
              imei: '123-671-7892',
              location: 'Somewhere',
              'serial-number': '18876872',
              sim: '123-671-788',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Phone 3',
              imei: '123-671-7893',
              location: 'Somewhere',
              'serial-number': '18876873',
              sim: '123-671-787',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Phone 4',
              imei: '123-671-7894',
              location: 'Somewhere',
              'serial-number': '18876874',
              sim: '123-671-786',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Phone 5',
              imei: '123-671-7895',
              location: 'Somewhere',
              'serial-number': '18876875',
              sim: '123-671-785',
              type: 'iPhone 11',
            },
            {
              'display-name': 'Camera 1',
              imei: '123-671-7896',
              location: 'Front entrance',
              'serial-number': '18876881',
              sim: '123-671-784',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 2',
              imei: '123-671-7897',
              location: 'South Gate',
              'serial-number': '18876882',
              sim: '123-671-783',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 3',
              imei: '123-671-7898',
              location: 'Store Room 1',
              'serial-number': '18876883',
              sim: '123-671-782',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 4',
              imei: '123-671-7899',
              location: 'Store Room 2',
              'serial-number': '18876884',
              sim: '123-671-781',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 5',
              imei: '123-671-7900',
              location: 'Corridor 1',
              'serial-number': '18876885',
              sim: '123-671-780',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 6',
              imei: '123-671-7901',
              location: 'Corridor 2',
              'serial-number': '18876886',
              sim: '123-671-779',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 7',
              imei: '123-671-7902',
              location: 'Atrium',
              'serial-number': '18876887',
              sim: '123-671-778',
              type: 'Camera',
            },
            {
              'display-name': 'Camera 8',
              imei: '',
              location: 'Corridor 2',
              'serial-number': '18876888',
              type: 'Camera',
            },
          ],
          'display-name': 'Berlin, DE',
          image: '/chronos-exporter/images/berlin-deutschland.png',
          sims: [
            {
              'display-name': 'Sim 9',
              iccid: '123-671-789',
            },
            {
              'display-name': 'Sim 8',
              iccid: '123-671-788',
            },
            {
              'display-name': 'Sim 7',
              iccid: '123-671-787',
            },
            {
              'display-name': 'Sim 6',
              iccid: '123-671-786',
            },
            {
              'display-name': 'Sim 5',
              iccid: '123-671-785',
            },
            {
              'display-name': 'Sim 4',
              iccid: '123-671-784',
            },
            {
              'display-name': 'Sim 3',
              iccid: '123-671-783',
            },
            {
              'display-name': 'Sim 2',
              iccid: '123-671-782',
            },
            {
              'display-name': 'Sim 1',
              iccid: '123-671-781',
            },
            {
              'display-name': 'Sim 1a',
              iccid: '123-671-780',
            },
            {
              'display-name': 'Sim 1b',
              iccid: '123-671-779',
            },
            {
              'display-name': 'Sim 1c',
              iccid: '123-671-778',
            },
            {
              'display-name': 'Sim 1d',
              iccid: '123-671-779',
            },
            {
              'display-name': 'Sim 1e',
              iccid: '123-671-780',
            },
            {
              'display-name': 'Sim 1f',
              iccid: '123-671-781',
            },
          ],
          'site-id': 'berlin',
          slices: [
            {
              applications: ['nvr-application', 'occupant-counter'],
              'device-groups': ['cameras'],
              'display-name': 'Cameras Slice',
              'slice-id': 'berlin-slice-cameras',
            },
            {
              applications: ['expenses-application'],
              'device-groups': ['phones'],
              'display-name': 'Phones Slice',
              'slice-id': 'berlin-slice-phones',
            },
          ],
          'small-cells': [
            {
              'display-name': 'North Cell',
              'small-cell-id': 'berlin-sc-north',
            },
            {
              'display-name': 'South Cell',
              'small-cell-id': 'berlin-sc-south',
            },
            {
              'display-name': 'East Cell',
              'small-cell-id': 'berlin-sc-east',
            },
            {
              'display-name': 'West Cell',
              'small-cell-id': 'berlin-sc-west',
            },
          ],
        },
      ],
    };
    component.selectedSite = 'berlin';
    component.viewType = 'Physical';
    spyOn(component, 'showSnackBar');
    component.checkSitePlans();
    expect(component.sitePlanPresent).toBeFalse();
    expect(component.showSnackBar).toHaveBeenCalled();
  });

  it('should run #showSnackBar()', async () => {
    spyOn(component.snackBar, 'openFromComponent');
    component.showSnackBar();
    expect(component.snackBar.openFromComponent).toHaveBeenCalled();
  });
});
