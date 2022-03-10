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
import { MatDialogModule } from '@angular/material/dialog';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
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

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should run #ngOnInit()', () => {
    spyOn(component, 'assignSelectedSite');
    component.ngOnInit();
    expect(component.assignSelectedSite).toHaveBeenCalled();
  });

  it('should run #changeSelection()', () => {
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

    component.selectedDevices = [
      {
        'display-name': 'Phone 21',
        imei: '098-765-4331',
        location: 'Basement 2',
        'serial-number': '098765A',
        sim: '098-765-433',
        type: 'Phone',
        selected: 1,
      },
    ];
    spyOn(component.selectedDevices, 'push');
    spyOn(component.selectedDevices, 'splice');

    component.changeSelection(
      'Phone 21',
      '098-765-4331',
      'Basement 2',
      '098765A',
      '098-765-433',
      'Phone',
      0
    );

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

    component.changeSelection(
      'Phone 21',
      '098-765-4331',
      'Basement 2',
      '098765A',
      '098-765-433',
      'Phone',
      0
    );
    expect(component.selectedDevices.push).toHaveBeenCalled();
    expect(component.selectedDevices.splice).toHaveBeenCalled();
  });

  it('should run #newFormGroup()', () => {
    component.newFormGroup();
  });

  it('should run #summaryTrigger()', () => {
    component.summaryArray = component.summaryArray;
    spyOn(component.summaryArray, 'push');
    component.firstFormGroup = component.firstFormGroup;
    component.summaryTrigger();
    expect(component.summaryArray.push).toHaveBeenCalled();
  });

  it('should run #emptySummaryArray()', () => {
    component.summaryArray = component.summaryArray;
    spyOn(component.summaryArray, 'splice');
    component.emptySummaryArray();
    expect(component.summaryArray.splice).toHaveBeenCalled();
  });

  it('should run #emptySelectedDevices()', () => {
    component.selectedDevices = component.selectedDevices;
    spyOn(component.selectedDevices, 'splice');
    component.emptySelectedDevices();
    expect(component.selectedDevices.splice).toHaveBeenCalled();
  });

  it('should run #firstFormNext()', () => {
    component.stepper = { selectedIndex: 0 } as MatStepper;
    component.firstFormNext();
  });
  it('should run #firstFormNext()', () => {
    component.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
    component.firstFormNext();
  });
  it('should run #addNewDeviceG()', () => {
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
    component.siteDeviceGroups[0] = [];
    component.summaryArray = [
      {
        summaryDeviceGroupName: 'Big Phones Group',
        summaryIpDomain: '128.137.51.006',
        summaryDescription: 'A new Phones Group',
      },
    ];
    component.addNewDeviceG();
  });
  it('should run #addNewDeviceG()', () => {
    component.newFormGroup();
    const firstForm = component.firstFormGroup;
    firstForm.value.newDeviceGroup = '';
    firstForm.value.newIpDomain = '';
    firstForm.value.newDescription = '';
    component.addNewDeviceG();
  });

  it('should run #assignSelectedSite()', async () => {
    component.deviceService = component.deviceService;
    spyOn(component.deviceService, 'getSite').and.returnValue(observableOf());
    spyOn(component, 'fetchData').and.callThrough();
    component.assignSelectedSite();
    expect(component.deviceService.getSite).toHaveBeenCalled();
  });

  it('should run #fetchData()', async () => {
    component.deviceService = component.deviceService;
    component.selectedSite = 'fremont';
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
    component.fetchData();
    expect(component.deviceService.getData).toHaveBeenCalled();
  });

  it('should run #dataConvert()', () => {
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'phones',
          devices: [
            {
              'display-name': 'Phone 1',
              location: 'Somewhere',
              'serial-number': '18876871',
            },
          ],
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
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          'serial-number': '18876871',
          sim: '123-671-789',
        },
      ],
    ];
    component.dataConvert();
  });

  it('should run #expandTrigger()', () => {
    spyOn(component, 'closeExpand');
    component.expandDeviceGroups = component.expandDeviceGroups;
    spyOn(component.expandDeviceGroups, 'indexOf');
    spyOn(component.expandDeviceGroups, 'splice').and.callThrough();
    spyOn(component.expandDeviceGroups, 'push');
    component.expandTrigger(0);
    expect(component.closeExpand).toHaveBeenCalled();
    expect(component.expandDeviceGroups.indexOf).toHaveBeenCalled();
    expect(component.expandDeviceGroups.push).toHaveBeenCalled();
  });

  it('should run #closeExpand()', () => {
    component.expandDeviceGroups = component.expandDeviceGroups;
    spyOn(component.expandDeviceGroups, 'pop');
    component.closeExpand();
    expect(component.expandDeviceGroups.pop).toHaveBeenCalled();
  });

  it('should run #editTrigger()', () => {
    spyOn(component, 'closeEdit');
    component.editDeviceGroup = [];
    spyOn(component.editDeviceGroup, 'indexOf');
    spyOn(component.editDeviceGroup, 'splice').and.callThrough();
    spyOn(component.editDeviceGroup, 'push');
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
    expect(component.editDeviceGroup.indexOf).toHaveBeenCalled();
    expect(component.editDeviceGroup.push).toHaveBeenCalled();
  });

  it('should run #closeEdit()', () => {
    component.editDeviceGroup = component.editDeviceGroup;
    spyOn(component.editDeviceGroup, 'pop');
    component.closeEdit();
    expect(component.editDeviceGroup.pop).toHaveBeenCalled();
  });

  it('should run #getEditControl()', async () => {
    // component.getEditControl({}, {});
  });

  it('should run #deleteDevicesInGroups()', () => {
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

    component.deleteDevicesInGroups(0, 0);
  });

  it('should run #changeSelectionAddDevices()', () => {
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
    component.selectedAddDevices = [
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
    spyOn(component.selectedAddDevices, 'push');
    spyOn(component.selectedAddDevices, 'splice');

    component.changeSelectionAddDevices(
      'Phone 21',
      '098-765-4331',
      'Basement 2',
      '098765A',
      '098-765-433',
      'Phone',
      0
    );

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

    component.changeSelectionAddDevices(
      'Phone 21',
      '098-765-4331',
      'Basement 2',
      '098765A',
      '098-765-433',
      'Phone',
      0
    );

    expect(component.selectedAddDevices.push).toHaveBeenCalled();
    expect(component.selectedAddDevices.splice).toHaveBeenCalled();
  });

  it('should run #changeSelectionAddDevices()', () => {
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
    spyOn(component.selectedAddDevices, 'push');
    spyOn(component.selectedAddDevices, 'splice').and.callThrough();

    component.changeSelectionAddDevices(
      'Phone 21',
      '098-765-4331',
      'Basement 2',
      '098765A',
      '098-765-433',
      'Phone',
      0
    );

    expect(component.selectedAddDevices.push).toHaveBeenCalled();
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
  });

  it('should run #openDeleteDeviceGroupDialog()', async () => {
    component.dialog = component.dialog;
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDeleteDeviceGroupDialog(0);
    expect(component.dialog.open).toHaveBeenCalledWith(
      DeleteDevicegroupsComponent,
      {
        width: '450px',
      }
    );
  });
});
