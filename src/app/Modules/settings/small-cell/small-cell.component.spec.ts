/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
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
      imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule],
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
});
