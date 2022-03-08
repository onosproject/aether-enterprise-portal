/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

import { DeviceSimComponent } from './device-sim.component';

import { DeviceSimService } from '../../../services/device-sim.service';

import { DeviceSimStub } from './device-sim.service.mock';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteDevicesComponent } from '../dialogs/delete-devices/delete-devices.component';
import { DeleteInventoryComponent } from '../dialogs/delete-inventory/delete-inventory.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Meta } from '@angular/platform-browser';

class MetaStub {
  getTag(): HTMLMetaElement {
    return {
      content: 'somecontent',
    } as HTMLMetaElement;
  }
}
// import * as d3 from 'd3';

describe('DeviceSimComponent', () => {
  // let meta: Meta;
  let component: DeviceSimComponent;
  let fixture: ComponentFixture<DeviceSimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule, NoopAnimationsModule],
      declarations: [DeviceSimComponent],
      providers: [
        { provide: DeviceSimService, useClass: DeviceSimStub },
        { provide: Meta, useClass: MetaStub },
      ],
      // providers: [DeviceSimService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.selectedSite = 'fremont';
    component.selectedSimDetails = '123-456-789';
    component.selectedIndexDetails = 0;
    component.apiPreviousDate = '2022-03-07T10:35:26.000Z';
    component.apiCurrentDate = '2022-03-08T10:35:26.000Z';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    spyOn(component.deviceService, 'getData').and.callThrough();
    spyOn(component.deviceService, 'getSite').and.callThrough();
    spyOn(component, 'assignSelectedSim').and.callThrough();
    spyOn(component, 'assignSelectedDevice').and.callThrough();
    spyOn(component, 'assignSelectedSite').and.callThrough();
    component.configService = component.configService;
    spyOn(component.configService, 'fetchDeviceConfig').and.callThrough();
    spyOn(component.configService, 'fetchOther').and.callThrough();
    spyOn(component, 'getLastWeek').and.callThrough();
    component.ngOnInit();
    expect(component.assignSelectedSim).toHaveBeenCalled();
    expect(component.assignSelectedDevice).toHaveBeenCalled();
    expect(component.assignSelectedSite).toHaveBeenCalled();
    expect(component.configService.fetchDeviceConfig).toHaveBeenCalled();
    expect(component.configService.fetchOther).toHaveBeenCalled();
    expect(component.getLastWeek).toHaveBeenCalled();
  });

  it('should run #configDeviceSim()', () => {
    spyOn(component, 'configDeviceSim').and.callThrough();
    component.configDeviceSim();
    expect(component.configDeviceSim).toHaveBeenCalled();
  });

  it('should run #configInventoryDevice()', () => {
    spyOn(component, 'configInventoryDevice').and.callThrough();
    component.configInventoryDevice();
    expect(component.configInventoryDevice).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #getLastWeek()', () => {
    spyOn(component, 'getLastWeek').and.callThrough();
    component.getLastWeek();
    expect(component.lastWeekDates.length).toBeGreaterThan(0);
    expect(component.lastWeekDatesLength).toEqual(
      component.lastWeekDates.length
    );
  });

  it('should run #getDateForZoom()', () => {
    spyOn(component, 'zoomgraph');
    spyOn(component, 'getDateForZoom').and.callThrough();
    const index = 0;
    const date = 'now';
    const string_date = new Date().toISOString();
    const date2 = { date, string_date };
    component.getDateForZoom(index, date2);
    expect(component.selectedDate).toEqual(index);
    expect(component.dateSelected).toEqual(date2);
    expect(component.zoomgraph).toHaveBeenCalled();
  });

  it('should run #zoomgraph() zoomLevel: 1', async () => {
    spyOn(component, 'fetchPromWeek');
    spyOn(component, 'zoomgraph').and.callThrough();
    component.lastWeekDates = [
      {
        date: '17 Feb',
        string_date: '2022-02-17T07:01:55.909Z',
      },
      {
        date: '18 Feb',
        string_date: '2022-02-18T07:01:55.909Z',
      },
    ];
    const value = true;
    const zoomIn = 1;
    component.selectedDate = 0;
    // const index = 0;
    // const sim = '123-456-789';
    // component.detailsTrigger(index, sim)
    component.zoomgraph(value, zoomIn);
    expect(component.zoomIn).toEqual(zoomIn);
    expect(component.apiPreviousDate).toEqual(
      component.lastWeekDates[component.selectedDate].string_date
    );
    expect(component.apiCurrentDate).toEqual(
      component.lastWeekDates[component.selectedDate + 1].string_date
    );
    expect(component.fetchPromWeek).toHaveBeenCalled();
  });

  it('should run #zoomgraph() zoomLevel: 2', async () => {
    spyOn(component, 'fetchPromWeek');
    spyOn(component, 'zoomgraph').and.callThrough();
    component.lastWeekDates = [
      {
        date: '17 Feb',
        string_date: '2022-02-17T07:01:55.909Z',
      },
      {
        date: '18 Feb',
        string_date: '2022-02-18T07:01:55.909Z',
      },
    ];
    const value = true;
    const zoomIn = 2;
    component.selectedDate = 1;
    // const index = 0;
    // const sim = '123-456-789';
    // component.detailsTrigger(index, sim)
    component.zoomgraph(value, zoomIn);
    expect(component.zoomIn).toEqual(zoomIn);
    expect(component.isZoomIn).toBeTrue();
    expect(component.apiPreviousDate).toEqual(
      component.lastWeekDates[component.selectedDate - 1].string_date
    );
    expect(component.apiCurrentDate).toEqual(
      component.lastWeekDates[component.selectedDate].string_date
    );
    expect(component.fetchPromWeek).toHaveBeenCalled();
  });

  it('should run #zoomgraph() zoomLevel: 0', async () => {
    spyOn(component, 'fetchPromWeek');
    spyOn(component, 'zoomgraph').and.callThrough();
    const value = true;
    const zoomIn = 0;
    // component.zoomgraph(true, 0);
    // component.zoomgraph(true, 1);
    const index = 0;
    const sim = '123-456-789';
    component.detailsTrigger(index, sim);
    component.zoomgraph(value, zoomIn);
    expect(component.zoomIn).toEqual(zoomIn);
    expect(component.apiPreviousDate).toEqual(
      component.lastWeekDates[1].string_date
    );
    expect(component.apiCurrentDate).toEqual(
      component.lastWeekDates[component.lastWeekDates.length - 1].string_date
    );
    expect(component.isZoomIn).toBeFalse();
    expect(component.fetchPromWeek).toHaveBeenCalled();
  });

  it('should run #closeEdit()', () => {
    component.editDevices = [0, 0];
    component.closeEdit();
    expect(component.editDevices.length).toBeLessThan(2);
  });

  it('should run #closeEditInventory()', () => {
    component.editInventory = [0, 0];
    component.closeEditInventory();
    expect(component.editInventory.length).toBeLessThan(2);
  });

  it('should run #closeDetails()', () => {
    component.deviceDetails = [0, 0];
    component.closeDetails();
    expect(component.deviceDetails.length).toBeLessThan(2);
  });

  it('should run #fetchData() to get the api data', () => {
    spyOn(component.deviceService, 'getData').and.returnValue(
      of({
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
      })
    );
    spyOn(component, 'fetchData').and.callThrough();
    spyOn(component, 'fetchProm2').and.callThrough();
    component.selectedSite = 'fremont';
    component.fetchData();
    const result = [
      {
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
                'device-group-in': 'Phones group',
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
                'device-group-in': 'Cameras group',
                'display-name': 'Camera 2',
                imei: '123-456-7894',
                location: 'South Gate',
                'serial-number': '7568112',
                sim: '123-456-786',
                type: 'Camera',
                'slice-in': 'Cameras Slice',
              },
              {
                'device-group-id-in': 'cameras',
                'device-group-in': 'Cameras group',
                'display-name': 'Camera 8',
                imei: '',
                location: 'Corridor 3',
                'serial-number': '7568118',
                type: 'Camera',
                'slice-in': 'Cameras Slice',
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
      },
    ];
    const devicesNoSim = [
      {
        'device-group-id-in': 'cameras',
        'device-group-in': 'Cameras group',
        'display-name': 'Camera 8',
        imei: '',
        location: 'Corridor 3',
        'serial-number': '7568118',
        type: 'Camera',
        'slice-in': 'Cameras Slice',
      },
    ];
    const mockSiteConfig = [
      [
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
          'device-group-in': 'Phones group',
        },
        {
          'device-group-id-in': 'cameras',
          'device-group-in': 'Cameras group',
          'display-name': 'Camera 2',
          imei: '123-456-7894',
          location: 'South Gate',
          'serial-number': '7568112',
          sim: '123-456-786',
          type: 'Camera',
          'slice-in': 'Cameras Slice',
        },
        {
          'device-group-id-in': 'cameras',
          'device-group-in': 'Cameras group',
          'display-name': 'Camera 8',
          imei: '',
          location: 'Corridor 3',
          'serial-number': '7568118',
          type: 'Camera',
          'slice-in': 'Cameras Slice',
        },
      ],
    ];
    expect(component.config.length).toBeGreaterThan(0);
    expect(component.config).toEqual(result);
    expect(component.deviceInventory).toEqual(devicesNoSim);
    expect(component.siteConfig).toEqual(mockSiteConfig);
    expect(component.fetchProm2).toHaveBeenCalled();
    // expect(component.)
  });

  it('should run #deleteDevice()', () => {
    spyOn(component, 'deleteDevice').and.callThrough();
    const index = 0;
    component.siteConfig = [
      [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          'serial-number': '752365A',
          sim: '123-456-789',
          type: 'Pixel 5 Phone',
        },
      ],
    ];
    const disassociatedDevice = {
      'display-name': 'Phone 1',
      imei: '123-456-7891',
      location: 'Somewhere',
      'serial-number': '752365A',
      type: 'Pixel 5 Phone',
    };
    component.simInventory = [];
    const addedSim = { simIccid: '123-456-789' };
    component.deleteDevice(index);
    expect(component.simInventory.length).toBeGreaterThan(0);
    expect(component.simInventory[0]).toEqual(addedSim);
    expect(component.deviceInventory.length).toBeGreaterThan(0);
    expect(component.deviceInventory).toContain(disassociatedDevice);
    expect(component.siteConfig[0][index]).toBeUndefined();
    // expect(component.simInventory.push).toHaveBeenCalled;
    // expect(component.deviceInventory.push).toHaveBeenCalled;
    // expect(component.siteConfig[0].splice(index, 1)).toHaveBeenCalled;
  });

  it('should run #cancelSim()', () => {
    spyOn(component, 'cancelSim').and.callThrough();
    const index = 0;
    component.siteConfig = [
      [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          'serial-number': '752365A',
          sim: '123-456-789',
          type: 'Pixel 5 Phone',
        },
      ],
    ];
    const disassociatedDevice = {
      'display-name': 'Phone 1',
      imei: '123-456-7891',
      location: 'Somewhere',
      'serial-number': '752365A',
      type: 'Pixel 5 Phone',
    };
    const addedSim = { simIccid: '123-456-789' };
    component.cancelledSimsStorage = [];
    component.cancelSim(index);
    expect(component.cancelledSimsStorage.length).toBeGreaterThan(0);
    expect(component.cancelledSimsStorage[0]).toEqual(addedSim);
    expect(component.deviceInventory).toContain(disassociatedDevice);
    expect(component.deviceInventory.length).toBeGreaterThan(0);
    expect(component.siteConfig[0][index]).toBeUndefined();
    // expect(component.closeEdit).toHaveBeenCalled();
  });

  it('should run assignSelectedSite()', () => {
    spyOn(component.deviceService, 'getSite').and.returnValue(of('fremont'));
    spyOn(component, 'assignSelectedSite').and.callThrough();
    spyOn(component, 'fetchData').and.callThrough();
    // component.selectedSite = 'fremont';
    const site = 'fremont';
    component.assignSelectedSite();
    expect(component.selectedSite).toEqual(site);
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should run assignSelectedSim()', () => {
    spyOn(component.deviceService, 'getSim1').and.returnValue(
      of('123-456-789')
    );
    component.configDeviceSim();
    const deviceSimForm = component.deviceSimForm;
    spyOn(component, 'assignSelectedSim').and.callThrough();
    component.assignSelectedSim();
    const sim = '123-456-789';
    expect(deviceSimForm.value.newSim).toEqual(sim);
  });

  it('should run #addNewDevice1() --> invalid', () => {
    component.configDeviceSim();
    const deviceSimForm = component.deviceSimForm;
    spyOn(component, 'addNewDevice1').and.callThrough();
    deviceSimForm.value.newSim = '';
    deviceSimForm.value.deviceName = '';
    deviceSimForm.value.deviceLocation = '';
    deviceSimForm.value.deviceSerialNum = '';
    component.addNewDeviceSimError = true || false;
    component.addNewDevice1();
    expect(deviceSimForm.invalid).toBeTrue();
    expect(component.addNewDeviceSimError).toBeTrue();
  });

  it('should run #addNewDevice1()', () => {
    component.activeNewDevice = true;
    component.configDeviceSim();
    const deviceSimForm = component.deviceSimForm;
    const deviceSimControls = deviceSimForm.controls;
    deviceSimControls.newSim.setValue('123-456-789');
    deviceSimControls.deviceName.setValue('New Device');
    deviceSimControls.deviceLocation.setValue('New Location');
    deviceSimControls.deviceSerialNum.setValue('752365A');
    component.siteConfig = [
      [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          'serial-number': '752365A',
          sim: '123-456-789',
          type: 'Pixel 5 Phone',
        },
      ],
    ];
    // component.addNewDeviceSimError = true || false;
    component.addNewDevice1();
    expect(deviceSimForm.valid).toBeTrue();
    expect(component.siteConfig[0].length).toBeGreaterThan(1);
    expect(component.activeNewDevice).toBeFalse();
    expect(component.addNewDeviceSimError).toBeFalse();
  });

  it('should run #editTrigger() --> else case', () => {
    // component.editDevices = [0, 1, 2];
    spyOn(component, 'closeEdit');
    spyOn(component, 'closeDetails');
    const index = 0;
    component.siteConfig = [
      [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          'serial-number': '752365A',
          sim: '123-456-789',
          type: 'Pixel 5 Phone',
        },
      ],
    ];
    component.editTrigger(index);
    const editForm = (component.deviceSimEditForm =
      component.deviceSimEditForm);
    const editFormControls = editForm.controls;
    const editConfig = component.siteConfig[0][index];
    expect(component.closeEdit).toHaveBeenCalled();
    expect(component.closeDetails).toHaveBeenCalled();
    expect(editFormControls.newSim.value).toEqual(editConfig.sim);
    expect(editFormControls.deviceName.value).toEqual(
      editConfig['display-name']
    );
    expect(editFormControls.deviceLocation.value).toEqual(editConfig.location);
    expect(editFormControls.deviceSerialNum.value).toEqual(
      editConfig['serial-number']
    );
    expect(component.editDevices.length).toBeGreaterThan(0);
    expect(component.deviceSimEditForm).toEqual(
      component.siteConfig[0][index].form
    );
  });

  it('should run #editTrigger() --> if case', () => {
    spyOn(component, 'closeEdit');
    spyOn(component, 'closeDetails');
    component.editDevices = [0, 0];
    const index = 0;
    component.siteConfig = [
      [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          'serial-number': '752365A',
          sim: '123-456-789',
          type: 'Pixel 5 Phone',
        },
        {
          'display-name': 'Phone 2',
          imei: '123-456-7892',
          location: 'Somewhere',
          'serial-number': '752365B',
          sim: '123-456-780',
          type: 'Pixel 6 Phone',
        },
      ],
    ];
    component.deviceSimEditForm = new FormGroup({});
    component.editTrigger(index);
    expect(component.closeEdit).toHaveBeenCalled();
    expect(component.closeDetails).toHaveBeenCalled();
  });

  it('should run #getEditControl()', () => {
    const index = 0;
    const param = 'newSim';
    const param1 = 'deviceName';
    const param2 = 'deviceLocation';
    const param3 = 'deviceSerialNum';
    // component.siteApplications = [
    //   {
    //     address: 'address-1',
    //     'application-id': 'nvr-application',
    //     deviceName: 'device-1',
    //     'display-name': 'Network Video Recorder',
    //     mbr: 15,
    //     portEnd: 8201,
    //     portStart: 4201,
    //     protocol: 'protocol-1',
    //   },
    // ];
    component.editTrigger(index);
    const editForm = (component.deviceSimEditForm =
      component.deviceSimEditForm);
    component.getEditControl(editForm, param);
    component.getEditControl(editForm, param1);
    component.getEditControl(editForm, param2);
    component.getEditControl(editForm, param3);
    const gotControl = editForm.get(param) as FormControl;
    const gotControl1 = editForm.get(param1) as FormControl;
    const gotControl2 = editForm.get(param2) as FormControl;
    const gotControl3 = editForm.get(param3) as FormControl;
    // const editFormControls = editForm.controls;
    expect(component.getEditControl(editForm, param)).toEqual(gotControl);
    expect(component.getEditControl(editForm, param1)).toEqual(gotControl1);
    expect(component.getEditControl(editForm, param2)).toEqual(gotControl2);
    expect(component.getEditControl(editForm, param3)).toEqual(gotControl3);
    // expect(editForm.get('appName')).toEqual(editFormControls.appName);
    // expect(editForm.get('newProtocol')).toEqual(editFormControls.newProtocol);
    // expect(editForm.get('newPortStart')).toEqual(editFormControls.newPortStart);
    // expect(editForm.get('newAddress')).toEqual(editFormControls.newAddress);
    // expect(editForm.get('newMbr')).toEqual(editFormControls.newMbr);
    // expect(editForm.get('newPortEnd')).toEqual(editFormControls.newPortEnd);
  });

  it('should run #openDialog()', () => {
    component.openDialog();
  });

  it('should run #openDialog1()', () => {
    component.openDialog1();
  });

  it('should run #openDeleteDialog()', () => {
    // component.siteConfig = [
    //   [
    //     {
    //       'display-name': 'Phone 1',
    //       imei: '123-456-7891',
    //       location: 'Somewhere',
    //       'serial-number': '752365A',
    //       sim: '123-456-789',
    //       type: 'Pixel 5 Phone',
    //     },
    //     {
    //       'display-name': 'Phone 2',
    //       imei: '123-456-7892',
    //       location: 'Somewhere',
    //       'serial-number': '752365B',
    //       sim: '123-456-780',
    //       type: 'Pixel 6 Phone',
    //     },
    //   ],
    // ];
    const deviceIndex = 0;
    spyOn(component, 'deleteDevice').withArgs(deviceIndex);
    spyOn(component, 'closeEdit');
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof DeleteDevicesComponent>);
    component.openDeleteDialog(deviceIndex);
    expect(component.deleteDevice).toHaveBeenCalled();
    expect(component.closeEdit).toHaveBeenCalled();
  });

  it('should run #actualEdit()', () => {
    component.siteConfig = [
      [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          'serial-number': '752365A',
          sim: '123-456-789',
          type: 'Pixel 5 Phone',
          form: {
            value: {
              deviceLocation: 'Somewhere',
              deviceName: 'Phone 1',
              deviceSerialNum: '752365A',
              newSim: '123-456-789',
            },
          },
        },
        {
          'display-name': 'Phone 2',
          imei: '123-456-7892',
          location: 'Somewhere',
          'serial-number': '752365B',
          sim: '123-456-780',
          type: 'Pixel 6 Phone',
        },
      ],
    ];
    const index = 0;
    component.editDeviceSimError = true || false;
    // component.deviceSimEditForm.patchValue({
    //   newSim: '123-456-932',
    //   deviceName: 'Phone 56',
    //   deviceLocation: 'upper-floor',
    //   deviceSerialNum: '253273A',
    // });
    // expect(component.deviceSimEditForm.valid).toEqual(true);
    component.actualEdit(index);
  });

  it('should run #actualEdit()', () => {
    component.deviceSimEditForm = new FormGroup({
      newSim: new FormControl('', Validators.required),
      deviceName: new FormControl('', Validators.required),
      deviceLocation: new FormControl('', Validators.required),
      deviceSerialNum: new FormControl('', Validators.required),
    });
    const index = 0;
    component.editDeviceSimError = true || false;
    // component.deviceSimEditForm.patchValue({
    //   newSim: '123-456-932',
    //   deviceName: 'Phone 56',
    //   deviceLocation: 'upper-floor',
    //   deviceSerialNum: '253273A',
    // });
    // expect(component.deviceSimEditForm.valid).toEqual(true);
    component.actualEdit(index);
  });

  it('should run #addNewDeviceInventory()', () => {
    component.inventoryDeviceSimForm = new FormGroup({
      inventoryDeviceName: new FormControl('', Validators.required),
      inventoryDeviceLocation: new FormControl('', Validators.required),
      inventoryDeviceSerialNum: new FormControl('', Validators.required),
      inventoryDeviceType: new FormControl('', Validators.required),
    });
    component.addNewInventoryDeviceError = true || false;
    component.addNewDeviceInventory();
  });

  it('should run #addNewDeviceInventory()', () => {
    component.deviceInventory = [
      {
        'display-name': 'Camera 8',
        imei: '',
        location: 'Corridor 3',
        'serial-number': '7568118',
        type: 'Camera',
      },
    ];
    component.addNewInventoryDeviceError = true || false;
    component.addNewDeviceInventory();
  });

  it('should run #inventoryEditTrigger()', () => {
    component.deviceInventory = [
      {
        'display-name': 'Camera 8',
        imei: '',
        location: 'Corridor 3',
        'serial-number': '7568118',
        type: 'Camera',
      },
    ];
    // component.inventoryEditForm = new FormGroup({});
    const index = 0;
    component.addNewDevice = true || false;
    component.inventoryEditTrigger(index);
  });

  it('should run #inventoryEditTrigger()', () => {
    component.editInventory = [0, 0];
    component.deviceInventory = [
      {
        'display-name': 'Camera 8',
        imei: '',
        location: 'Corridor 3',
        'serial-number': '7568118',
        type: 'Camera',
      },
    ];
    // component.inventoryEditForm = new FormGroup({});
    const index = 0;
    component.addNewDevice = true || false;
    component.inventoryEditTrigger(index);
  });

  it('should run #getEditInventoryControl()', () => {
    const param = '0';
    component.getEditInventoryControl(component.inventoryEditForm, param);
  });

  it('should run #actualInventoryEdit()', () => {
    component.deviceInventory = [
      {
        'display-name': 'Camera 8',
        imei: '',
        location: 'Corridor 3',
        'serial-number': '7568118',
        type: 'Camera',
        sim: '123-456-780',
        form: {
          value: {
            inventoryDeviceLocation: 'Corridor 3',
            inventoryDeviceName: 'Camera 8',
            inventoryDeviceSerialNum: '7568118',
            inventoryDeviceType: 'Camera',
          },
        },
      },
    ];
    const inventoryDeviceIndex = 0;
    component.editInventoryDeviceError = true || false;
    component.actualInventoryEdit(inventoryDeviceIndex);
  });

  it('should run #actualInventoryEdit()', () => {
    component.inventoryEditForm = new FormGroup({
      inventoryDeviceName: new FormControl('', Validators.required),
      inventoryDeviceLocation: new FormControl('', Validators.required),
      inventoryDeviceSerialNum: new FormControl('', Validators.required),
      inventoryDeviceType: new FormControl('', Validators.required),
    });
    const inventoryDeviceIndex = 0;
    component.editInventoryDeviceError = true || false;
    component.actualInventoryEdit(inventoryDeviceIndex);
  });

  it('should run #deleteInventoryDevice()', () => {
    const inventoryDeviceIndex = 0;
    component.deleteInventoryDevice(inventoryDeviceIndex);
  });

  it('should run #openDeleteInventoryDialog()', () => {
    const inventoryDeviceIndex = 0;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof DeleteInventoryComponent>);
    component.openDeleteInventoryDialog(inventoryDeviceIndex);
  });

  it('should run #detailsTrigger()', () => {
    const index = 0;
    const sim = '123-456-789';
    // component.selectedDate = -1;
    // component.zoomIn = 0;
    // component.isZoomIn = true || false;
    // component.deviceSimsDetailsProgressToggleDay = true || false;
    // component.deviceSimsDetailsProgressToggleWeek = true || false;
    // component.selectedSimDetails = sim;
    // component.selectedIndexDetails = index;
    component.detailsTrigger(index, sim);
  });

  it('should run #detailsTrigger()', () => {
    component.deviceDetails = [0, 0];
    const index = 0;
    const sim = '123-456-789';
    // component.selectedDate = -1;
    // component.zoomIn = 0;
    // component.isZoomIn = true || false;
    // component.deviceSimsDetailsProgressToggleDay = true || false;
    // component.deviceSimsDetailsProgressToggleWeek = true || false;
    // component.selectedSimDetails = sim;
    // component.selectedIndexDetails = index;
    component.detailsTrigger(index, sim);
  });

  // it('should run #fetchPromApiWeek()', () => {
  //   const site = 'fremont';
  //   const iccid = '123-456-789';
  //   // component.fetchPromApiWeek(site, iccid);
  // });

  it('should run #fetchPromWeek()', () => {
    spyOn(component, 'fetchPromApiWeek').and.returnValue(
      of({
        status: 'success',
        data: {
          result: [
            {
              metric: {
                __name__: 'device_connected_status',
                device_status: 'Active',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                serial_number: '752365A',
                site: 'fremont',
              },
              values: [
                [1645249991.788, '1'],
                [1645491191.788, '0'],
                [1645249991.788, '1'],
              ],
            },
          ],
        },
      })
    );
    spyOn(component, 'fetchDotsApiWeek').and.returnValue(
      of({
        status: 'success',
        data: {
          result: [
            {
              metric: {
                __name__: 'device_connected_status',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '752908B: core event number-10127',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-24T14:42:48.363628138Z',
              },
              values: [
                [1645713852, '1'],

                [1645713852, '4'],
                [1645713852, '5'],
              ],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10021',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:13:50.2829109Z',
              },
              values: [[1645713852, '2']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10023',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:22:25.296128912Z',
              },
              values: [[1645713852, '3']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10031',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:42:38.368040384Z',
              },
              values: [[1645713852, '4']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10033',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T22:06:36.407900416Z',
              },
              values: [[1645713852, '5']],
            },
          ],
        },
      })
    );
    const site = 'fremont';
    const iccid = '123-456-789';
    const index = 0;
    component.fetchPromWeek(site, iccid, index);
  });

  it('should run #fetchProm()', () => {
    spyOn(component, 'fetchPromApi').and.returnValue(
      of({
        status: 'success',
        data: {
          result: [
            {
              metric: {
                __name__: 'device_connected_status',
                device_status: 'Active',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                serial_number: '752365A',
                site: 'fremont',
              },
              values: [
                [1645249991.788, '1'],
                [1645491191.788, '0'],
                [1645791191.788, '1'],
              ],
            },
          ],
        },
      })
    );
    spyOn(component, 'fetchDotsApi').and.returnValue(
      of({
        status: 'success',
        data: {
          result: [
            {
              metric: {
                __name__: 'device_connected_status',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '752908B: core event number-10127',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-24T14:42:48.363628138Z',
              },
              values: [
                [1645713852, '1'],

                [1645713852, '4'],
                [1645713852, '5'],
              ],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10021',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:13:50.2829109Z',
              },
              values: [[1645713852, '2']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10023',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:22:25.296128912Z',
              },
              values: [[1645713852, '3']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10031',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:42:38.368040384Z',
              },
              values: [[1645713852, '4']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10033',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T22:06:36.407900416Z',
              },
              values: [[1645713852, '5']],
            },
          ],
        },
      })
    );
    const site = 'fremont';
    const iccid = '123-456-789';
    const index = 0;
    // component.valuesArrayFinal[0].times = [];
    component.fetchProm(site, iccid, index);
  });

  it('should run #fetchDotsApi()', () => {
    const site = 'fremont';
    const iccid = '123-456-789';
    component.fetchDotsApi(site, iccid);
  });

  it('should run #fetchDotsApiWeek()', () => {
    const site = 'fremont';
    const iccid = '123-456-789';
    component.fetchDotsApiWeek(site, iccid);
  });

  // it('should run #displayChart()', () => {
  //   const index = 0;
  //   const chartData = [
  //     {
  //       activeStatus: '1',
  //       times: [
  //         {
  //           display: 'rect',
  //           ending_time: 1640960880000,
  //           starting_time: 1640874480000,
  //         },
  //         {
  //           display: 'circle',
  //           starting_time: 1540874480000,
  //         },
  //       ],
  //     },
  //   ];
  //   component.displayChart(chartData, index);
  //   document
  //     .getElementById('#device_timeline' + index)
  //     .dispatchEvent(new MouseEvent('mouseover'));
  // });

  it('should run #displaySmallChart()', () => {
    const index = 0;
    const chartData = [];

    component.displaySmallChart(chartData, index);
  });

  it('should run #fetchProm2()', () => {
    spyOn(component, 'fetchPromApi').and.returnValue(
      of({
        status: 'success',
        data: {
          result: [
            {
              metric: {
                __name__: 'device_connected_status',
                device_status: 'Active',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                serial_number: '752365A',
                site: 'fremont',
              },
              values: [
                [1645249991.788, '1'],
                [1645491191.788, '0'],
                [1645791191.788, '1'],
              ],
            },
          ],
        },
      })
    );
    spyOn(component, 'fetchDotsApi').and.returnValue(
      of({
        status: 'success',
        data: {
          result: [
            {
              metric: {
                __name__: 'device_connected_status',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '752908B: core event number-10127',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-24T14:42:48.363628138Z',
              },
              values: [
                [1645713852, '1'],

                [1645713852, '4'],
                [1645713852, '5'],
              ],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10021',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:13:50.2829109Z',
              },
              values: [[1645713852, '2']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10023',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:22:25.296128912Z',
              },
              values: [[1645713852, '3']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10031',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T21:42:38.368040384Z',
              },
              values: [[1645713852, '4']],
            },
            {
              metric: {
                __name__: 'device_connection_event_core',
                iccid: '123-456-789',
                instance: 'chronos-exporter:2112',
                job: 'chronos-exporter',
                msg: '7568111: core event number-10033',
                serial_number: '752365A',
                site: 'fremont',
                time: '2022-02-23T22:06:36.407900416Z',
              },
              values: [[1645713852, '5']],
            },
          ],
        },
      })
    );
    const site = 'fremont';
    const iccid = '123-456-789';
    const index = 0;
    component.fetchProm2(site, iccid, index);
  });

  it('should run #deviceSimsDetailsProgressToggleDayFun()', () => {
    component.deviceSimsDetailsProgressToggleDayFun();
  });

  it('should run #deviceSimsDetailsProgressToggleWeekFun()', () => {
    const index = 0;
    const sim = '123-456-789';
    component.detailsTrigger(index, sim);
    component.deviceSimsDetailsProgressToggleWeekFun();
  });

  it('should run #activeNewDeviceForm()', () => {
    component.activeNewDeviceForm();
  });

  it('should run #simsView()', () => {
    component.simsView();
  });

  it('should run #inventoryDeviceTab()', () => {
    component.inventoryDeviceTab();
  });

  it('should run #inventorySimsTab()', () => {
    component.inventorySimsTab();
  });

  it('should run #cancelledSims()', () => {
    component.cancelledSims();
  });
});
