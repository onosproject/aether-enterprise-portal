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
// import * as d3 from 'd3';

describe('DeviceSimComponent', () => {
  let component: DeviceSimComponent;
  let fixture: ComponentFixture<DeviceSimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule, NoopAnimationsModule],
      declarations: [DeviceSimComponent],
      providers: [{ provide: DeviceSimService, useClass: DeviceSimStub }],
      // providers: [DeviceSimService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should run #configDeviceSim()', async () => {
    spyOn(component, 'configDeviceSim').and.callThrough();
    component.configDeviceSim();
    expect(component.configDeviceSim).toHaveBeenCalled();
  });

  it('should run #configInventoryDevice()', async () => {
    spyOn(component, 'configInventoryDevice').and.callThrough();
    component.configInventoryDevice();
    expect(component.configInventoryDevice).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #getLastWeek()', async () => {
    spyOn(component, 'getLastWeek').and.callThrough();
    component.getLastWeek();
    expect(component.getLastWeek).toHaveBeenCalled();
    expect(component.lastWeekDates.length).toBeGreaterThan(0);
    expect(component.lastWeekDatesLength).toEqual(
      component.lastWeekDates.length
    );
  });

  it('should run #getDateForZoom()', async () => {
    spyOn(component, 'getDateForZoom').and.callThrough();
    const index = 0;
    const date = 'now';
    const string_date = new Date().toISOString();
    const date2 = { date, string_date };
    component.getDateForZoom(index, date2);
    expect(component.selectedDate).toEqual(index);
    expect(component.dateSelected).toEqual(date2);
  });

  it('should run #zoomgraph() zoomLevel: 1', async () => {
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
    component.zoomgraph(value, zoomIn);
    expect(component.zoomIn).toEqual(zoomIn);
    expect(component.apiPreviousDate).toEqual(
      component.lastWeekDates[component.selectedDate].string_date
    );
    expect(component.apiCurrentDate).toEqual(
      component.lastWeekDates[component.selectedDate + 1].string_date
    );
  });

  it('should run #zoomgraph() zoomLevel: 2', async () => {
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
    component.zoomgraph(value, zoomIn);
    expect(component.zoomIn).toEqual(zoomIn);
    expect(component.isZoomIn).toBeTrue();
    expect(component.apiPreviousDate).toEqual(
      component.lastWeekDates[component.selectedDate - 1].string_date
    );
    expect(component.apiCurrentDate).toEqual(
      component.lastWeekDates[component.selectedDate].string_date
    );
  });

  it('should run #zoomgraph() zoomLevel: 0', async () => {
    spyOn(component, 'zoomgraph').and.callThrough();
    const value = true;
    const zoomIn = 0;
    // component.zoomgraph(true, 0);
    // component.zoomgraph(true, 1);
    component.zoomgraph(value, zoomIn);
    expect(component.zoomIn).toEqual(zoomIn);
    expect(component.apiPreviousDate).toEqual(
      component.lastWeekDates[1].string_date
    );
    expect(component.apiCurrentDate).toEqual(
      component.lastWeekDates[component.lastWeekDates.length - 1].string_date
    );
    expect(component.isZoomIn).toBeFalse();
  });

  it('should run #closeEdit()', async () => {
    component.editDevices = component.editDevices;
    spyOn(component.editDevices, 'pop');
    component.closeEdit();
    // expect(component.editDevices.pop).toHaveBeenCalled();
  });

  it('should run #closeEditInventory()', async () => {
    component.editInventory = component.editInventory;
    spyOn(component.editInventory, 'pop');
    component.closeEditInventory();
    // expect(component.editInventory.pop).toHaveBeenCalled();
  });

  it('should run #closeDetails()', async () => {
    component.deviceDetails = component.deviceDetails;
    spyOn(component.deviceDetails, 'pop');
    component.closeDetails();
    // expect(component.deviceDetails.pop).toHaveBeenCalled();
  });

  it('should run #fetchData() to get the api data', async () => {
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

  it('should run #deleteDevice()', async () => {
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

  it('should run #cancelSim()', async () => {
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

  it('should run assignSelectedSite()', async () => {
    spyOn(component, 'assignSelectedSite').and.callThrough();
    spyOn(component, 'fetchData').and.callThrough();
    // component.selectedSite = 'fremont';
    const site = 'fremont';
    component.assignSelectedSite();
    expect(component.selectedSite).toEqual(site);
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should run assignSelectedSim()', async () => {
    component.configDeviceSim();
    const deviceSimForm = component.deviceSimForm;
    spyOn(component, 'assignSelectedSim').and.callThrough();
    component.assignSelectedSim();
    const sim = '123-456-789';
    expect(deviceSimForm.value.newSim).toEqual(sim);
  });

  it('should run #addNewDevice1()', async () => {
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

  it('should run #addNewDevice1()', async () => {
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
    component.addNewDeviceSimError = true || false;
    component.addNewDevice1();
  });

  it('should run #editTrigger()', async () => {
    // component.editDevices = [0, 1, 2];
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
    component.deviceSimEditForm = new FormGroup({});
    component.editTrigger(index);
  });

  it('should run #editTrigger()', async () => {
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
  });

  it('should run #getEditControl()', async () => {
    const param = 'newSim';
    component.getEditControl(component.deviceSimEditForm, param);
  });

  it('should run #openDialog()', async () => {
    component.openDialog();
  });

  it('should run #openDialog1()', async () => {
    component.openDialog1();
  });

  it('should run #openDeleteDialog()', async () => {
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

  it('should run #actualEdit()', async () => {
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

  it('should run #actualEdit()', async () => {
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

  it('should run #addNewDeviceInventory()', async () => {
    component.inventoryDeviceSimForm = new FormGroup({
      inventoryDeviceName: new FormControl('', Validators.required),
      inventoryDeviceLocation: new FormControl('', Validators.required),
      inventoryDeviceSerialNum: new FormControl('', Validators.required),
      inventoryDeviceType: new FormControl('', Validators.required),
    });
    component.addNewInventoryDeviceError = true || false;
    component.addNewDeviceInventory();
  });

  it('should run #addNewDeviceInventory()', async () => {
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

  it('should run #inventoryEditTrigger()', async () => {
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

  it('should run #inventoryEditTrigger()', async () => {
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

  it('should run #getEditInventoryControl()', async () => {
    const param = '0';
    component.getEditInventoryControl(component.inventoryEditForm, param);
  });

  it('should run #actualInventoryEdit()', async () => {
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

  it('should run #actualInventoryEdit()', async () => {
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

  it('should run #deleteInventoryDevice()', async () => {
    const inventoryDeviceIndex = 0;
    component.deleteInventoryDevice(inventoryDeviceIndex);
  });

  it('should run #openDeleteInventoryDialog()', async () => {
    const inventoryDeviceIndex = 0;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof DeleteInventoryComponent>);
    component.openDeleteInventoryDialog(inventoryDeviceIndex);
  });

  it('should run #detailsTrigger()', async () => {
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

  it('should run #detailsTrigger()', async () => {
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

  // it('should run #fetchPromApiWeek()', async () => {
  //   const site = 'fremont';
  //   const iccid = '123-456-789';
  //   // component.fetchPromApiWeek(site, iccid);
  // });

  it('should run #fetchPromWeek()', async () => {
    const site = 'fremont';
    const iccid = '123-456-789';
    const index = 0;
    component.fetchPromWeek(site, iccid, index);
  });

  it('should run #fetchProm()', async () => {
    const site = 'fremont';
    const iccid = '123-456-789';
    const index = 0;
    // component.valuesArrayFinal[0].times = [];
    component.fetchProm(site, iccid, index);
  });

  it('should run #fetchDotsApi()', async () => {
    const site = 'fremont';
    const iccid = '123-456-789';
    component.fetchDotsApi(site, iccid);
  });

  // it('should run #displayChart()', async () => {
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

  it('should run #displaySmallChart()', async () => {
    const index = 0;
    const chartData = [];

    component.displaySmallChart(chartData, index);
  });

  it('should run #fetchProm2()', async () => {
    const site = 'fremont';
    const iccid = '123-456-789';
    const index = 0;
    component.fetchProm2(site, iccid, index);
  });

  it('should run #deviceSimsDetailsProgressToggleDayFun()', async () => {
    component.deviceSimsDetailsProgressToggleDayFun();
  });

  it('should run #deviceSimsDetailsProgressToggleWeekFun()', async () => {
    component.deviceSimsDetailsProgressToggleWeekFun();
  });

  it('should run #activeNewDeviceForm()', async () => {
    component.activeNewDeviceForm();
  });

  it('should run #simsView()', async () => {
    component.simsView();
  });

  it('should run #inventoryDeviceTab()', async () => {
    component.inventoryDeviceTab();
  });

  it('should run #inventorySimsTab()', async () => {
    component.inventorySimsTab();
  });

  it('should run #cancelledSims()', async () => {
    component.cancelledSims();
  });
});
