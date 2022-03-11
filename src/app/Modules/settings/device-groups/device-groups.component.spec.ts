/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { Injectable } from '@angular/core';
import { of as observableOf, of } from 'rxjs';
import { DeviceGroupsComponent } from './device-groups.component';
import { Observable } from 'rxjs';
import { Config } from '../../../models/config.model';
import { DeleteDevicegroupsComponent } from '../dialogs/delete-devicegroups/delete-devicegroups.component';
import { MatStepper } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Injectable()
class MockDeviceSimService {
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

  getSite(): Observable<Config> {
    return observableOf();
  }
}

describe('DeviceGroupsComponent', () => {
  let component: DeviceGroupsComponent;
  let fixture: ComponentFixture<DeviceGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceGroupsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: DeviceSimService,
          useClass: MockDeviceSimService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.deviceInventory = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4331',
        location: 'Basement 2',
        selected: 0,
        'serial-number': '098765B',
        sim: '098-765-433',
        type: 'Phone',
      },
      {
        'display-name': 'Phone 22',
        imei: '098-765-4341',
        location: 'Basement 3',
        selected: 0,
        'serial-number': '098765C',
        sim: '098-765-434',
        type: 'Phone',
      },
    ];
    component.summaryArray = [
      {
        summaryDeviceGroupName: 'Big Phones',
        summaryIpDomain: '128.137.51.006',
        summaryDescription: 'This is a new Big Phones group',
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    spyOn(component, 'assignSelectedSite');
    component.ngOnInit();
    expect(component.assignSelectedSite).toHaveBeenCalled();
  });

  it('should run #editDeviceGroupFormFun()', () => {
    component.editDeviceGroupFormFun();
  });

  it('should run #editDeviceGroupFormFunClose()', () => {
    component.editDeviceGroupFormFunClose();
  });

  it('should run #editAddDeviceGroupFun()', () => {
    component.editAddDeviceGroupFun();
  });

  it('should run #hideRightBxFn()', () => {
    component.hideRightBxFn();
  });

  it('should run #addNewdeviceGroupFormFun()', () => {
    spyOn(component, 'newFormGroup');
    component.addNewdeviceGroupFormFun();
    expect(component.newFormGroup).toHaveBeenCalled();
  });

  it('should run #addNewdeviceGroupFormClose()', () => {
    component.addNewdeviceGroupFormClose();
  });

  it('should run #collapseSlice()', () => {
    component.collapseSlice();
  });

  it('should run #openPanel()', () => {
    component.openPanel();
  });

  it('should run #changeSelection() --> if case', () => {
    const name = 'Phone 21';
    const imei = '098-765-4331';
    const location = 'Basement 2';
    const serialNumber = '098765B';
    const simNumber = '098-765-433';
    const type = 'Phone';
    const deviceIndex = 0;
    const deviceInventory = component.deviceInventory;
    const selectedDevices = component.selectedDevices;
    component.changeSelection(
      name,
      imei,
      location,
      serialNumber,
      simNumber,
      type,
      deviceIndex
    );
    expect(deviceInventory[deviceIndex].selected).toEqual(1);
    expect(selectedDevices.length).toBeGreaterThan(0);
  });

  it('should run #changeSelection() --> else case', () => {
    const name = 'Phone 21';
    const imei = '098-765-4331';
    const location = 'Basement 2';
    const serialNumber = '098765B';
    const simNumber = '098-765-433';
    const type = 'Phone';
    const deviceIndex = 0;
    component.deviceInventory = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4331',
        location: 'Basement 2',
        selected: 1,
        'serial-number': '098765B',
        sim: '098-765-433',
        type: 'Phone',
      },
    ];
    component.selectedDevices = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4331',
        location: 'Basement 2',
        'serial-number': '098765B',
        sim: '098-765-433',
        type: 'Phone',
        selected: 1,
      },
    ];
    const deviceInventory = component.deviceInventory;
    const selectedDevices = component.selectedDevices;
    component.changeSelection(
      name,
      imei,
      location,
      serialNumber,
      simNumber,
      type,
      deviceIndex
    );
    expect(deviceInventory[deviceIndex].selected).toEqual(0);
    expect(selectedDevices.length).toEqual(0);
  });

  it('should run #newFormGroup()', () => {
    component.newFormGroup();
    const newForm = component.firstFormGroup;
    expect(component.addNewDeviceGroupError).toBeFalse();
    expect(newForm.get('newDeviceGroup')).toBeTruthy();
    expect(newForm.get('newIpDomain')).toBeTruthy();
    expect(newForm.get('newDescription')).toBeTruthy();
  });

  it('should run #summaryTrigger()', () => {
    const summaryArray = (component.summaryArray = []);
    component.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
    const newForm = (component.firstFormGroup = component.firstFormGroup);
    newForm.patchValue({
      newDeviceGroup: 'Big Phones Group',
      newIpDomain: '128.137.51.006',
      newDescription: 'This is the description of Big Phones Group',
    });
    component.summaryTrigger();
    expect(component.summaryBool).toBeTrue();
    expect(summaryArray.length).toBeGreaterThan(0);
    expect(summaryArray[0]).toEqual({
      summaryDeviceGroupName: 'Big Phones Group',
      summaryIpDomain: '128.137.51.006',
      summaryDescription: 'This is the description of Big Phones Group',
    });
  });

  it('should run #emptySummaryArray()', () => {
    const summaryArray = (component.summaryArray = component.summaryArray);
    component.emptySummaryArray();
    expect(component.summaryBool).toBeFalse();
    expect(summaryArray.length).toBeLessThan(1);
  });

  it('should run #emptySelectedDevices()', () => {
    component.selectedDevices = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4331',
        location: 'Basement 2',
        'serial-number': '098765B',
        sim: '098-765-433',
        type: 'Phone',
        selected: 1,
      },
    ];
    const selectedDevices = (component.selectedDevices =
      component.selectedDevices);
    component.emptySelectedDevices();
    expect(selectedDevices.length).toEqual(0);
  });

  it('should run #firstFormNext() --> if case', () => {
    component.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
    const newForm = (component.firstFormGroup = component.firstFormGroup);
    newForm.patchValue({
      newDeviceGroup: '',
      newIpDomain: '',
      newDescription: '',
    });
    component.stepper = { selectedIndex: 0 } as MatStepper;
    component.firstFormNext();
    expect(newForm.invalid).toBeTrue();
    expect(component.firstFormError).toBeTrue();
  });
  it('should run #firstFormNext() --> else case', () => {
    component.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
    const newForm = (component.firstFormGroup = component.firstFormGroup);
    newForm.patchValue({
      newDeviceGroup: 'Big Phones Group',
      newIpDomain: '128.137.51.006',
      newDescription: 'This is the description of Big Phones Group',
    });
    const stepperIndex = (component.stepper = {
      selectedIndex: 0,
    } as MatStepper);
    component.firstFormNext();
    expect(component.firstFormComplete).toBeTrue();
    expect(newForm.valid).toBeTrue();
    expect(stepperIndex.selectedIndex).toEqual(1);
  });
  it('should run #addNewDeviceG() --> valid case', () => {
    spyOn(component, 'emptySummaryArray');
    spyOn(component, 'emptySelectedDevices');
    const siteDG = (component.siteDeviceGroups[0] = []);
    const deviceInventory = (component.deviceInventory =
      component.deviceInventory);
    const selectedDevices = (component.selectedDevices = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4331',
        location: 'Basement 2',
        'serial-number': '098765B',
        sim: '098-765-433',
        type: 'Phone',
        selected: 1,
      },
    ]);
    component.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
    const newForm = (component.firstFormGroup = component.firstFormGroup);
    newForm.patchValue({
      newDeviceGroup: 'Big Phones Group',
      newIpDomain: '128.137.51.006',
      newDescription: 'This is the description of Big Phones Group',
    });
    component.summaryArray = [
      {
        summaryDeviceGroupName: 'Big Phones Group',
        summaryIpDomain: '128.137.51.006',
        summaryDescription: 'This is the description of Big Phones Group',
      },
    ];
    component.addNewDeviceG();
    expect(deviceInventory.length).toBeLessThan(2);
    expect(siteDG.length).toBeGreaterThan(0);
    expect(selectedDevices.length).toEqual(0);
    expect(component.emptySummaryArray).toHaveBeenCalled();
    expect(component.emptySelectedDevices).toHaveBeenCalled();
    expect(component.addNewdeviceGroupForm).toBeFalse();
  });
  it('should run #addNewDeviceG() --> invalid case', () => {
    component.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
    const newForm = (component.firstFormGroup = component.firstFormGroup);
    newForm.patchValue({
      newDeviceGroup: '',
      newIpDomain: '',
      newDescription: '',
    });
    component.addNewDeviceG();
    expect(newForm.invalid).toBeTrue();
    expect(component.addNewDeviceGroupError).toBeTrue();
  });

  it('should run #assignSelectedSite()', async () => {
    component.deviceService = component.deviceService;
    spyOn(component.deviceService, 'getSite').and.returnValue(
      observableOf('fremont')
    );
    const expectedSite = 'fremont';
    spyOn(component, 'fetchData');
    component.assignSelectedSite();
    expect(component.selectedSite).toEqual(expectedSite);
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should run #fetchData()', async () => {
    spyOn(component, 'dataConvert');
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
    component.selectedSite = 'fremont';
    component.fetchData();
    const siteDevices = component.siteDevices;
    const siteDeviceGroups = component.siteDeviceGroups;
    const defaultDescription =
      'This is the default description of the current device group.';
    const defaultIpDomain = '162.153.31.005';
    expect(component.deviceService.getData).toHaveBeenCalled();
    expect(component.config.length).toBeGreaterThan(0);
    expect(siteDevices.length).toBeGreaterThan(0);
    expect(siteDevices[0][0].selected).toEqual(1);
    expect(siteDeviceGroups.length).toBeGreaterThan(0);
    expect(siteDeviceGroups[0][0].ipDomain).toEqual(defaultIpDomain);
    expect(siteDeviceGroups[0][0].description).toEqual(defaultDescription);
    expect(component.dataConvert).toHaveBeenCalled();
  });

  it('should run #dataConvert() --> if case', () => {
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'phones',
          devices: ['752365A', '752908B'],
          'display-name': 'Phones group',
          ipDomain: '162.153.31.005',
          description:
            'This is the default description of the current device group.',
        },
      ],
    ];
    const objAfterConvert = {
      'device-group-id': 'phones',
      devices: [
        {
          'display-name': 'Phone 1',
          location: 'Somewhere',
          'serial-number': '752365A',
        },
        {
          'display-name': 'Phone 2',
          location: 'Somewhere',
          'serial-number': '752908B',
        },
      ],
      'display-name': 'Phones group',
      ipDomain: '162.153.31.005',
      description:
        'This is the default description of the current device group.',
    };
    component.siteDevices = [
      [
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
          selected: 1,
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
          selected: 1,
        },
      ],
    ];
    component.dataConvert();
    const deviceGroups = component.siteDeviceGroups;
    expect(deviceGroups[0][0]).toEqual(objAfterConvert);
  });

  it('should run #dataConvert() --> else case', () => {
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'phones',
          devices: ['752365A'],
          'display-name': 'Phones group',
          ipDomain: '162.153.31.005',
          description:
            'This is the default description of the current device group.',
        },
      ],
    ];
    component.siteDevices = [
      [
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
          selected: 1,
        },
      ],
    ];
    const expectedRemainingDevice = [
      {
        deviceInfo: {
          'display-name': 'Phone 2',
          location: 'Somewhere',
          'serial-number': '752908B',
        },
      },
    ];
    component.dataConvert();
    const remainingDevices = component.remainingDevices;
    expect(remainingDevices.length).toBeGreaterThan(0);
    expect(remainingDevices).toEqual(expectedRemainingDevice);
  });

  it('should run #expandTrigger() --> else case', () => {
    spyOn(component, 'closeExpand');
    const expandDeviceGroups = component.expandDeviceGroups;
    const index = 0;
    component.expandTrigger(index);
    expect(component.closeExpand).toHaveBeenCalled();
    expect(expandDeviceGroups.length).toBeGreaterThan(0);
  });

  it('should run #expandTrigger() --> if case', () => {
    spyOn(component, 'closeExpand');
    const expandDeviceGroups = (component.expandDeviceGroups = [0, 0]);
    const index = 0;
    component.expandTrigger(index);
    expect(component.closeExpand).toHaveBeenCalled();
    expect(expandDeviceGroups.length).toBeLessThan(2);
  });

  it('should run #closeExpand()', () => {
    const expandDeviceGroups = (component.expandDeviceGroups = [0, 0]);
    component.closeExpand();
    expect(expandDeviceGroups.length).toBeLessThan(2);
  });

  it('should run #editTrigger() --> if case', () => {
    spyOn(component, 'closeEdit');
    const editDeviceGroup = (component.editDeviceGroup = [0, 0]);
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'phones',
          devices: [],
          'display-name': 'Phones group',
          ipDomain: '162.153.31.005',
          description:
            'This is the default description of the current device group.',
        },
      ],
    ];
    component.editTrigger(0);
    expect(component.closeEdit).toHaveBeenCalled();
    expect(editDeviceGroup.length).toBeLessThan(2);
  });

  it('should run #editTrigger() --> else case', () => {
    spyOn(component, 'closeEdit');
    const index = 0;
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'phones',
          devices: [],
          'display-name': 'Phones group',
          ipDomain: '162.153.31.005',
          description:
            'This is the default description of the current device group.',
        },
      ],
    ];
    component.editTrigger(0);
    const editForm = (component.deviceGroupEditForm =
      component.deviceGroupEditForm);
    const editFormControls = editForm.controls;
    const editConfig = component.siteDeviceGroups[0][index];
    const editDeviceGroup = component.editDeviceGroup;
    expect(component.closeEdit).toHaveBeenCalled();
    expect(editDeviceGroup.length).toBeGreaterThan(0);
    expect(editFormControls.newDeviceGroup.value).toEqual(
      editConfig['display-name']
    );
    expect(editFormControls.newIpDomain.value).toEqual(editConfig.ipDomain);
    expect(editFormControls.newDescription.value).toEqual(
      editConfig.description
    );
    expect(component.deviceGroupEditForm).toEqual(
      component.siteDeviceGroups[0][index].form
    );
  });

  it('should run #closeEdit()', () => {
    const editDeviceGroup = (component.editDeviceGroup = [0, 0]);
    component.closeEdit();
    expect(editDeviceGroup.length).toBeLessThan(2);
  });

  it('should run #getEditControl()', async () => {
    // component.getEditControl({}, {});
  });

  it('should run #deleteDevicesInGroups()', () => {
    const groupIndex = 0;
    const deviceIndex = 0;
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'cameras',
          devices: [],
          'display-name': 'Cameras group',
          ipDomain: '162.153.31.005',
          description:
            'This is the default description of the current device group.',
        },
      ],
    ];
    component.deleteDevicesInGroups(groupIndex, deviceIndex);
    const devicesInGroups = component.siteDeviceGroups[0][groupIndex].devices;
    expect(devicesInGroups.length).toBeLessThan(1);
  });

  it('should run #changeSelectionAddDevices() --> if case', () => {
    const name = 'Phone 21';
    const imei = '098-765-4321';
    const location = 'Basement 1';
    const serialNumber = '098765A';
    const simNumber = '098-765-432';
    const type = 'Phone';
    const deviceIndex = 0;
    const deviceInventory = (component.deviceInventory = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4321',
        location: 'Basement 1',
        selected: 0,
        'serial-number': '098765A',
        sim: '098-765-432',
        type: 'Phone',
      },
    ]);
    const selectedAddDevices = component.selectedAddDevices;
    component.changeSelectionAddDevices(
      name,
      imei,
      location,
      serialNumber,
      simNumber,
      type,
      deviceIndex
    );
    expect(selectedAddDevices.length).toBeGreaterThan(0);
    expect(deviceInventory[deviceIndex].selected).toEqual(1);
  });

  it('should run #changeSelectionAddDevices() --> else case', () => {
    const name = 'Phone 21';
    const imei = '098-765-4321';
    const location = 'Basement 1';
    const serialNumber = '098765A';
    const simNumber = '098-765-432';
    const type = 'Phone';
    const deviceIndex = 0;
    component.deviceInventory = [
      {
        'display-name': 'Phone 20',
        imei: '098-765-4321',
        location: 'Basement 1',
        selected: 1,
        'serial-number': '098765A',
        sim: '098-765-432',
        type: 'Phone',
      },
    ];
    component.selectedAddDevices = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4321',
        location: 'Basement 1',
        'serial-number': '098765A',
        sim: '098-765-432',
        type: 'Phone',
        selected: 1,
      },
    ];
    component.changeSelectionAddDevices(
      name,
      imei,
      location,
      serialNumber,
      simNumber,
      type,
      deviceIndex
    );
    const selectedAddDevices = component.selectedAddDevices;
    expect(selectedAddDevices.length).toBeLessThan(1);
  });

  it('should run #onEdit --> valid (else case)', async () => {
    spyOn(component, 'closeEdit');
    const index = 0;
    component.siteDeviceGroups = [
      [
        {
          description:
            'This is the default description of the current device group.',
          'device-group-id': 'phones',
          devices: [
            {
              'display-name': 'Phone 1',
              location: 'Somewhere',
              'serial-number': '752365A',
            },
            {
              'display-name': 'Phone 2',
              location: 'Somewhere',
              'serial-number': '752908B',
            },
          ],
          'display-name': 'Phones group',
          ipDomain: '162.153.31.005',
        },
      ],
    ];
    component.selectedAddDevices = [
      {
        'display-name': 'Phone 20',
        imei: '098-765-4321',
        location: 'Basement 1',
        'serial-number': '098765A',
        sim: '098-765-432',
        type: 'Phone',
        selected: 1,
      },
    ];
    component.deviceInventory = [
      {
        'display-name': 'Phone 20',
        imei: '098-765-4321',
        location: 'Basement 1',
        selected: 0,
        'serial-number': '098765A',
        sim: '098-765-432',
        type: 'Phone',
      },
    ];
    component.editTrigger(index);
    component.deviceGroupEditForm = component.deviceGroupEditForm;
    const editDGForm = component.deviceGroupEditForm;
    const editDGControls = editDGForm.controls;
    const editDG = component.siteDeviceGroups[0][index];
    const deviceInventory = component.deviceInventory;
    const selectedAddDevices = component.selectedAddDevices;
    editDGControls.newDeviceGroup.setValue('Main Device Group');
    editDGControls.newIpDomain.setValue('191.136.32.003');
    editDGControls.newDescription.setValue('This is a valid description');
    component.onEdit(index);
    expect(editDGForm.valid).toBeTrue();
    expect(component.editDeviceGroupError).toBeFalse();
    expect(editDG.devices.length).toBeGreaterThan(2);
    expect(deviceInventory.length).toBeLessThan(1);
    expect(selectedAddDevices.length).toEqual(0);
    expect(component.closeEdit).toHaveBeenCalled();
  });

  it('should run #onEdit --> invalid (if case)', () => {
    spyOn(component, 'closeEdit');
    const index = 0;
    component.siteDeviceGroups = [
      [
        {
          description:
            'This is the default description of the current device group.',
          'device-group-id': 'phones',
          devices: [
            {
              'display-name': 'Phone 1',
              location: 'Somewhere',
              'serial-number': '752365A',
            },
            {
              'display-name': 'Phone 2',
              location: 'Somewhere',
              'serial-number': '752908B',
            },
          ],
          'display-name': 'Phones group',
          ipDomain: '162.153.31.005',
        },
      ],
    ];
    component.selectedAddDevices = [
      {
        'display-name': 'Phone 20',
        imei: '098-765-4321',
        location: 'Basement 1',
        'serial-number': '098765A',
        sim: '098-765-432',
        type: 'Phone',
        selected: 1,
      },
    ];
    component.deviceInventory = [
      {
        'display-name': 'Phone 20',
        imei: '098-765-4321',
        location: 'Basement 1',
        selected: 0,
        'serial-number': '098765A',
        sim: '098-765-432',
        type: 'Phone',
      },
    ];
    component.editTrigger(index);
    component.deviceGroupEditForm = component.deviceGroupEditForm;
    const editDGForm = component.deviceGroupEditForm;
    const editDGControls = editDGForm.controls;
    editDGControls.newDeviceGroup.setValue('');
    editDGControls.newIpDomain.setValue('');
    editDGControls.newDescription.setValue('');
    component.onEdit(index);
    expect(editDGForm.invalid).toBeTrue();
    expect(component.editDeviceGroupError).toBeTrue();
  });

  it('should run #deleteDeviceGroup()', () => {
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'cameras',
          devices: [],
          'display-name': 'Cameras group',
          ipDomain: '162.153.31.005',
          description:
            'This is the default description of the current device group.',
        },
      ],
    ];
    component.deleteDeviceGroup(0);
    expect(component.siteDeviceGroups[0].length).toBeLessThan(1);
  });

  it('should run #openDeleteDeviceGroupDialog()', async () => {
    component.dialog = component.dialog;
    // spyOn(component.dialog, 'open').and.callThrough();
    const deviceGroupIndex = 0;
    spyOn(component, 'deleteDeviceGroup').withArgs(deviceGroupIndex);
    spyOn(component, 'closeEdit');
    spyOn(component.dialog, 'open')
      .and.callThrough()
      .and.returnValue({
        afterClosed: () => of('true'),
      } as MatDialogRef<typeof DeleteDevicegroupsComponent>);
    component.openDeleteDeviceGroupDialog(deviceGroupIndex);
    expect(component.dialog.open).toHaveBeenCalledWith(
      DeleteDevicegroupsComponent,
      {
        width: '450px',
      }
    );
    expect(component.deleteDeviceGroup).toHaveBeenCalled();
    expect(component.closeEdit).toHaveBeenCalled();
  });
});
