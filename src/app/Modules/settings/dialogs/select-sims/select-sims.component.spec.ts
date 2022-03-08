/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material/material.module';
import { Injectable } from '@angular/core';
import { SelectSimsComponent } from './select-sims.component';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { of as observableOf } from 'rxjs';
import { Config } from '../../../../models/config.model';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/site.model';
import { Sim } from 'src/app/models/sim.model';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
class MockDeviceSimService {
  mySim1: Observable<string>;
  private mySimSubject = new Subject<string>();

  getData(): Observable<Config> {
    return observableOf({
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
  }
  getSite(): Observable<Site[]> {
    return observableOf([
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
    ]);
  }
  getSims(): Observable<Sim[]> {
    return observableOf([
      {
        'display-name': 'Sim 11',
        iccid: '123-456-791',
      },
    ]);
  }
  mySim(data: string): void {
    this.mySimSubject.next(data);
  }
}

describe('SelectSimsComponent', () => {
  let component: SelectSimsComponent;
  let fixture: ComponentFixture<SelectSimsComponent>;

  const dialogMock = {
    close: () => {
      return null;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule, MatDialogModule],
      declarations: [SelectSimsComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        {
          provide: DeviceSimService,
          useClass: MockDeviceSimService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ngOnInit()', async () => {
    spyOn(component, 'assignSelectedSite1');
    spyOn(component, 'assignSelectedSims');
    component.ngOnInit();
    expect(component.assignSelectedSite1).toHaveBeenCalled();
    expect(component.assignSelectedSims).toHaveBeenCalled();
  });

  it('should run #assignSelectedSite1()', async () => {
    component.deviceService = component.deviceService;
    spyOn(component.deviceService, 'getSite').and.returnValue(observableOf(''));
    spyOn(component, 'fetchSims');
    component.assignSelectedSite1();
    expect(component.deviceService.getSite).toHaveBeenCalled();
    expect(component.fetchSims).toHaveBeenCalled();
  });

  it('should run #fetchSims()', async () => {
    component.deviceService = component.deviceService;

    spyOn(component.deviceService, 'getData').and.returnValue(
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
    component.selectedSite = 'Fremont, CA';

    component.sims = component.sims;
    spyOn(component.sims, 'push').and.callThrough();

    component.fetchSims();
    expect(component.deviceService.getData).toHaveBeenCalled();
  });

  it('should run #onNoClick()', () => {
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should run #changeSelection()', () => {
    component.changeSelection('');
  });

  it('should run #selectSimFinal()', () => {
    spyOn(component.deviceService, 'mySim').and.callThrough();

    spyOn(component.dialogRef, 'close').and.callThrough();
    component.selectSimFinal();
    expect(component.deviceService.mySim).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should run #assignSelectedSims()', async () => {
    component.deviceService = component.deviceService;
    spyOn(component.deviceService, 'getSims').and.returnValue(observableOf());
    component.assignSelectedSims();
  });
});
