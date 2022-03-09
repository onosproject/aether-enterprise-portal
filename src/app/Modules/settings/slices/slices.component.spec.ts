/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlicesComponent } from './slices.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms/';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { DeviceSimService } from 'src/app/services/device-sim.service';
// import { DeviceSimStub } from '../device-sim/device-sim.service.mock';
import { DeleteSlicesComponent } from '../dialogs/delete-slices/delete-slices.component';
import { of } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';

describe('Slices1Component', () => {
  let component: SlicesComponent;
  let fixture: ComponentFixture<SlicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlicesComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
      ],
      // providers: [{ provide: DeviceSimService, useClass: DeviceSimStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.summaryArray = [
      {
        summaryDownlink: '3-4 GHz',
        summarySliceName: 'new',
        summarySliceType: 'cameras',
        summaryTrafficClass: 'Sensitive',
        summaryUplink: '5-6 GHz',
        summarygbr: 1,
        summarymbr: 1,
      },
    ];
    component.deviceGroupsInventory = [
      {
        'device-group-id': 'sensors',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'Sensors Group',
        selected: 0,
      },
      {
        'device-group-id': 'IOT',
        devices: ['000IOT1', '000IOT2', '000IOT3'],
        'display-name': 'IOT Group',
        selected: 0,
      },
      {
        'device-group-id': 'Other',
        devices: ['000OTH1', '000OTH2', '000OTH3'],
        'display-name': 'Others Group',
        selected: 0,
      },
    ];
    component.servicesInventory = [
      {
        'application-id': 'VC-application',
        'display-name': 'Voice Control',
        selected: 0,
      },
      {
        'application-id': 'SC-application',
        'display-name': 'Sensor Control',
        selected: 0,
      },
      {
        'application-id': 'EC-application',
        'display-name': 'Error Control',
        selected: 0,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #editAddDeviceGroupFun()', () => {
    component.editAddDeviceGroupFun();
    expect(component.editAddDeviceGroup).toBeTrue();
  });

  it('should run #editAddServicesFun()', () => {
    component.editAddServicesFun();
    expect(component.editAddServices).toBeTrue();
  });

  it('should run #newFormGroup()', () => {
    component.newFormGroup();
    expect(component.addNewSliceError).toBeFalse();
    expect(component.firstFormError).toBeFalse();
    expect(component.firstFormGroup.value).toEqual({
      sliceName: '',
      sliceType: '',
      mbr: '',
      gbr: '',
      trafficClass: '',
      uplink: '',
      downlink: '',
    });
  });

  it('should run #firstFormNext() -> invalid case', () => {
    component.newFormGroup();
    spyOn(component, 'firstFormNext').and.callThrough();
    component.firstFormNext();
    component.firstFormGroup = component.firstFormGroup;
    const form = component.firstFormGroup;
    const formControls = form.controls;
    formControls.sliceName.setValue('');
    formControls.sliceType.setValue('');
    formControls.mbr.setValue('');
    formControls.gbr.setValue('');
    formControls.trafficClass.setValue('');
    formControls.uplink.setValue('');
    formControls.downlink.setValue('');
    expect(form.invalid).toBeTrue();
    expect(component.firstFormError).toBeTrue();
  });

  it('should run #firstFormNext() -> valid case', () => {
    component.newFormGroup();
    component.firstFormGroup = component.firstFormGroup;
    const form = component.firstFormGroup;
    const formControls = form.controls;
    // spyOn(component, 'firstFormNext').and.callThrough();
    formControls.sliceName.setValue('sensors');
    formControls.sliceType.setValue('sensors');
    formControls.mbr.setValue(5);
    formControls.gbr.setValue(5);
    formControls.trafficClass.setValue('Sensitive');
    formControls.uplink.setValue('14-14.5 GHz');
    formControls.downlink.setValue('3-4 GHz');
    component.stepper = { selectedIndex: 0 } as MatStepper;
    component.firstFormNext();
    expect(form.valid).toBeTrue();
    // expect(component.)
  });

  it('should run #summaryTrigger', () => {
    component.summaryArray = [];
    const summaryArray = component.summaryArray;
    component.newFormGroup();
    component.firstFormGroup = component.firstFormGroup;
    const form = component.firstFormGroup;
    const formControls = form.controls;
    formControls.sliceName.setValue('new sensors');
    formControls.sliceType.setValue('new sensors');
    formControls.mbr.setValue(5);
    formControls.gbr.setValue(5);
    formControls.trafficClass.setValue('Sensitive');
    formControls.uplink.setValue('14-14.5 GHz');
    formControls.downlink.setValue('3-4 GHz');
    component.summaryTrigger();
    const summaryObj = summaryArray[0];
    component.summarySliceEditFormGroup = component.summarySliceEditFormGroup;
    const summaryEditForm = component.summarySliceEditFormGroup;
    spyOn(component, 'summaryTrigger');
    const summaryEditControl = summaryEditForm.controls;
    expect(component.summaryBool).toBeTrue();
    expect(component.summaryArray.length).toBeGreaterThan(0);
    expect(summaryObj.summarySliceName).toEqual('new sensors');
    expect(summaryObj.summarySliceType).toEqual('new sensors');
    expect(summaryObj.summaryDownlink).toEqual('3-4 GHz');
    expect(summaryObj.summaryUplink).toEqual('14-14.5 GHz');
    expect(summaryObj.summaryTrafficClass).toEqual('Sensitive');
    expect(summaryObj.summarymbr).toEqual(5);
    expect(summaryObj.summarygbr).toEqual(5);
    expect(summaryEditControl.sliceName.value).toEqual(
      summaryObj.summarySliceName
    );
    expect(summaryEditControl.sliceType.value).toEqual(
      summaryObj.summarySliceType
    );
    expect(summaryEditControl.mbr.value).toEqual(summaryObj.summarymbr);
    expect(summaryEditControl.gbr.value).toEqual(summaryObj.summarygbr);
    expect(summaryEditControl.trafficClass.value).toEqual(
      summaryObj.summaryTrafficClass
    );
    expect(summaryEditControl.uplink.value).toEqual(summaryObj.summaryUplink);
    expect(summaryEditControl.downlink.value).toEqual(
      summaryObj.summaryDownlink
    );
  });

  it('should run #emptySummaryArray()', () => {
    component.emptySummaryArray();
    expect(component.summaryBool).toBeFalse();
    expect(component.summaryArray.length).toEqual(0);
  });

  it('should run #getSummaryControl()', () => {
    component.summaryArray = component.summaryArray;
    const param = 'sliceName';
    const param1 = 'sliceType';
    const param2 = 'mbr';
    const param3 = 'gbr';
    const param4 = 'trafficClass';
    const param5 = 'uplink';
    const param6 = 'downlink';
    component.summaryArray[0].form = new FormGroup({
      sliceName: new FormControl(component.summaryArray[0].summarySliceName, [
        Validators.required,
      ]),
      sliceType: new FormControl(component.summaryArray[0].summarySliceType, [
        Validators.required,
      ]),
      mbr: new FormControl(component.summaryArray[0].summarymbr, [
        Validators.required,
      ]),
      gbr: new FormControl(component.summaryArray[0].summarygbr, [
        Validators.required,
      ]),
      trafficClass: new FormControl(
        component.summaryArray[0].summaryTrafficClass,
        [Validators.required]
      ),
      uplink: new FormControl(component.summaryArray[0].summaryUplink, [
        Validators.required,
      ]),
      downlink: new FormControl(component.summaryArray[0].summaryDownlink, [
        Validators.required,
      ]),
    });
    component.summarySliceEditFormGroup = component.summaryArray[0].form;
    component.summarySliceEditFormGroup = component.summarySliceEditFormGroup;
    const getControl = component.getSummaryControl(
      component.summarySliceEditFormGroup,
      param
    );
    const getControl1 = component.getSummaryControl(
      component.summarySliceEditFormGroup,
      param1
    );
    const getControl2 = component.getSummaryControl(
      component.summarySliceEditFormGroup,
      param2
    );
    const getControl3 = component.getSummaryControl(
      component.summarySliceEditFormGroup,
      param3
    );
    const getControl4 = component.getSummaryControl(
      component.summarySliceEditFormGroup,
      param4
    );
    const getControl5 = component.getSummaryControl(
      component.summarySliceEditFormGroup,
      param5
    );
    const getControl6 = component.getSummaryControl(
      component.summarySliceEditFormGroup,
      param6
    );
    const summaryEditForm = component.summarySliceEditFormGroup;
    const gotControl = summaryEditForm.get(param) as FormControl;
    const gotControl1 = summaryEditForm.get(param1) as FormControl;
    const gotControl2 = summaryEditForm.get(param2) as FormControl;
    const gotControl3 = summaryEditForm.get(param3) as FormControl;
    const gotControl4 = summaryEditForm.get(param4) as FormControl;
    const gotControl5 = summaryEditForm.get(param5) as FormControl;
    const gotControl6 = summaryEditForm.get(param6) as FormControl;
    expect(getControl).toEqual(gotControl);
    expect(getControl1).toEqual(gotControl1);
    expect(getControl2).toEqual(gotControl2);
    expect(getControl3).toEqual(gotControl3);
    expect(getControl4).toEqual(gotControl4);
    expect(getControl5).toEqual(gotControl5);
    expect(getControl6).toEqual(gotControl6);
  });

  it('should run #changeSelectionDeviceGroups() --> if case', () => {
    const id = 'cameras';
    const name = 'cameras';
    const devices = ['000SEN1', '000SEN2', '000SEN3'];
    const deviceGroupIndex = 0;
    const deviceGroupInventory = component.deviceGroupsInventory;
    const selectedDeviceGroups = component.selectedDeviceGroups;
    component.changeSelectionDeviceGroups(id, name, devices, deviceGroupIndex);
    expect(deviceGroupInventory[deviceGroupIndex].selected).toEqual(1);
    expect(selectedDeviceGroups.length).toBeGreaterThan(0);
  });

  it('should run #changeSelectionDeviceGroups() --> else case', () => {
    const id = 'cameras';
    const name = 'cameras';
    const devices = ['000SEN1', '000SEN2', '000SEN3'];
    const deviceGroupIndex = 0;
    component.deviceGroupsInventory = [
      {
        'device-group-id': 'sensors',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'Sensors Group',
        selected: 1,
      },
    ];
    component.selectedDeviceGroups = [
      {
        'device-group-id': 'cameras',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'cameras',
        selected: 1,
      },
    ];
    const deviceGroupInventory = component.deviceGroupsInventory;
    const selectedDeviceGroups = component.selectedDeviceGroups;
    component.changeSelectionDeviceGroups(id, name, devices, deviceGroupIndex);
    expect(deviceGroupInventory[deviceGroupIndex].selected).toEqual(0);
    expect(selectedDeviceGroups.length).toEqual(0);
  });

  it('should run #deleteSummaryDeviceGroups()', () => {
    component.selectedDeviceGroups = [
      {
        'device-group-id': 'cameras',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'cameras',
        selected: 1,
      },
    ];
    const selectedDeviceGroups = component.selectedDeviceGroups;
    const deviceGroupIndex = 0;
    component.deleteSummaryDeviceGroups(deviceGroupIndex);
    expect(selectedDeviceGroups.length).toEqual(0);
  });

  it('should run #changeSelectionServices() --> if case', () => {
    component.servicesInventory = component.servicesInventory;
    const id = 'SC-application';
    const name = 'Sensor Control';
    const serviceIndex = 0;
    const servicesInventory = component.servicesInventory;
    const selectedServices = component.selectedServices;
    component.changeSelectionServices(id, name, serviceIndex);
    expect(servicesInventory[serviceIndex].selected).toEqual(1);
    expect(selectedServices.length).toBeGreaterThan(0);
  });

  it('should run #changeSelectionServices() --> else case', () => {
    component.servicesInventory = component.servicesInventory;
    const id = 'SC-application';
    const name = 'Sensor Control';
    const serviceIndex = 0;
    component.servicesInventory = [
      {
        'application-id': 'SC-application',
        'display-name': 'Sensor Control',
        selected: 1,
      },
    ];
    component.selectedServices = [
      {
        'application-id': 'SC-application',
        'display-name': 'Sensor Control',
        selected: 1,
      },
    ];
    const selectedServices = component.selectedServices;
    const servicesInventory = component.servicesInventory;
    component.changeSelectionServices(id, name, serviceIndex);
    expect(servicesInventory[serviceIndex].selected).toEqual(0);
    expect(selectedServices.length).toEqual(0);
  });

  it('should run #deleteSummaryServices()', () => {
    component.selectedServices = [
      {
        'application-id': 'SC-application',
        'display-name': 'Sensor Control',
        selected: 1,
      },
    ];
    const selectedServices = component.selectedServices;
    const serviceIndex = 0;
    component.deleteSummaryServices(serviceIndex);
    expect(selectedServices.length).toEqual(0);
  });

  it('should run #onSubmit() --> valid case', () => {
    spyOn(component, 'emptySummaryArray');
    component.servicesInventory = [
      {
        'application-id': 'SC-application',
        'display-name': 'Sensor Control',
        selected: 1,
      },
    ];
    component.selectedServices = [
      {
        'application-id': 'SC-application',
        'display-name': 'Sensor Control',
        selected: 1,
      },
    ];
    component.deviceGroupsInventory = [
      {
        'device-group-id': 'sensors',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'Sensors Group',
        selected: 1,
      },
    ];
    component.selectedDeviceGroups = [
      {
        'device-group-id': 'sensors',
        'display-name': 'Sensors Group',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        selected: 1,
      },
    ];
    const deviceGroupsInventory = (component.deviceGroupsInventory =
      component.deviceGroupsInventory);
    const selectedDeviceGroups = component.selectedDeviceGroups;
    const servicesInventory = (component.servicesInventory =
      component.servicesInventory);
    const selectedServices = component.selectedServices;
    const siteSlices = (component.siteSlices = []);
    component.summaryArray = [
      {
        summarySliceName: 'sensors',
        summarySliceType: 'sensors',
        summaryDownlink: '3-4 GHz',
        summaryUplink: '14-14.5 GHz',
        summaryTrafficClass: 'Sensitive',
        summarymbr: 5,
        summarygbr: 5,
        form: {
          value: {
            sliceName: 'sensors',
            sliceType: 'sensors',
            mbr: 5,
            gbr: 5,
            trafficClass: 'Sensitive',
            uplink: '14-14.5 GHz',
            downlink: '3-4 GHz',
          },
        },
      },
    ];
    component.firstFormGroup = new FormGroup({
      sliceName: new FormControl('', Validators.required),
      sliceType: new FormControl('', Validators.required),
      mbr: new FormControl('', Validators.required),
      gbr: new FormControl('', Validators.required),
      trafficClass: new FormControl('', Validators.required),
      uplink: new FormControl('', Validators.required),
      downlink: new FormControl('', Validators.required),
    });
    component.firstFormGroup = component.firstFormGroup;
    const firstForm = (component.firstFormGroup = component.firstFormGroup);
    firstForm.patchValue({
      sliceName: 'sensors',
      sliceType: 'sensors',
      mbr: 5,
      gbr: 5,
      trafficClass: 'Sensitive',
      uplink: '14-14.5 GHz',
      downlink: '3-4 GHz',
    });
    component.summaryArray[0].form = new FormGroup({
      sliceName: new FormControl(component.summaryArray[0].summarySliceName, [
        Validators.required,
      ]),
      sliceType: new FormControl(component.summaryArray[0].summarySliceType, [
        Validators.required,
      ]),
      mbr: new FormControl(component.summaryArray[0].summarymbr, [
        Validators.required,
      ]),
      gbr: new FormControl(component.summaryArray[0].summarygbr, [
        Validators.required,
      ]),
      trafficClass: new FormControl(
        component.summaryArray[0].summaryTrafficClass,
        [Validators.required]
      ),
      uplink: new FormControl(component.summaryArray[0].summaryUplink, [
        Validators.required,
      ]),
      downlink: new FormControl(component.summaryArray[0].summaryDownlink, [
        Validators.required,
      ]),
    });
    component.summarySliceEditFormGroup = component.summaryArray[0].form;
    const sliceSummaryForm = (component.summarySliceEditFormGroup =
      component.summarySliceEditFormGroup);
    sliceSummaryForm.patchValue({
      sliceName: 'sensors',
      sliceType: 'sensors',
      mbr: 5,
      gbr: 5,
      trafficClass: 'Sensitive',
      uplink: '14-14.5 GHz',
      downlink: '3-4 GHz',
    });
    component.onSubmit();
    expect(firstForm.valid).toBeTrue();
    expect(sliceSummaryForm.valid).toBeTrue();
    expect(siteSlices.length).toBeGreaterThan(0);
    expect(deviceGroupsInventory.length).toBeLessThan(1);
    expect(selectedDeviceGroups.length).toEqual(0);
    expect(servicesInventory.length).toBeLessThan(1);
    expect(selectedServices.length).toEqual(0);
    expect(component.emptySummaryArray).toHaveBeenCalled();
    expect(component.createNewSlices).toBeFalse();
  });

  it('should run #onSubmit() --> invalid case', () => {
    // component.summaryArray = [];
    component.summaryArray[0].form = new FormGroup({
      sliceName: new FormControl(component.summaryArray[0].summarySliceName, [
        Validators.required,
      ]),
      sliceType: new FormControl(component.summaryArray[0].summarySliceType, [
        Validators.required,
      ]),
      mbr: new FormControl(component.summaryArray[0].summarymbr, [
        Validators.required,
      ]),
      gbr: new FormControl(component.summaryArray[0].summarygbr, [
        Validators.required,
      ]),
      trafficClass: new FormControl(
        component.summaryArray[0].summaryTrafficClass,
        [Validators.required]
      ),
      uplink: new FormControl(component.summaryArray[0].summaryUplink, [
        Validators.required,
      ]),
      downlink: new FormControl(component.summaryArray[0].summaryDownlink, [
        Validators.required,
      ]),
    });
    component.summarySliceEditFormGroup = component.summaryArray[0].form;
    const sliceSummaryForm = (component.summarySliceEditFormGroup =
      component.summarySliceEditFormGroup);
    const sliceSummaryControls = sliceSummaryForm.controls;
    sliceSummaryControls.sliceName.setValue('');
    sliceSummaryControls.sliceType.setValue('');
    sliceSummaryControls.mbr.setValue('');
    sliceSummaryControls.gbr.setValue('');
    sliceSummaryControls.trafficClass.setValue('');
    sliceSummaryControls.uplink.setValue('');
    sliceSummaryControls.downlink.setValue('');
    component.onSubmit();
    expect(sliceSummaryForm.invalid).toBeTrue();
    expect(component.addNewSliceError).toBeTrue();
  });

  it('should run #dataConvert()', () => {
    const siteSlices = (component.siteSlices = [
      {
        applications: ['nvr-application'],
        'device-groups': ['cameras'],
        'display-name': 'Cameras Slice',
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        mbr: 5,
        gbr: 10,
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
        downlink: '11-12 GHz',
      },
    ]);
    const siteServices = (component.siteServices = [
      {
        'application-id': 'nvr-application',
        'display-name': 'Network Video Recorder',
        selected: 1,
      },
    ]);
    component.siteDeviceGroups = [
      [
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
          selected: 1,
        },
      ],
    ];
    component.dataConvert();
    expect(siteSlices[0].applications[0]['application-id']).toEqual(
      siteServices[0]['application-id']
    );
    expect(siteSlices[0].applications[0]['display-name']).toEqual(
      siteServices[0]['display-name']
    );
    expect(siteSlices[0]['device-groups'][0]['device-group-id']).toEqual(
      'cameras'
    );
    expect(siteSlices[0]['device-groups'][0]['devices']).toEqual([
      '7568111',
      '7568112',
      '7568113',
      '7568114',
      '7568115',
      '7568116',
      '7568117',
      '7568118',
      '7568119',
    ]);
    expect(siteSlices[0]['device-groups'][0]['display-name']).toEqual(
      'Cameras group'
    );
  });

  it('should run #fetchData()', () => {
    spyOn(component, 'closeExpand');
    spyOn(component, 'closeListView');
    spyOn(component, 'dataConvert');
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
    component.selectedSite = 'fremont';
    component.fetchData();
    expect(component.closeExpand).toHaveBeenCalled();
    expect(component.closeListView).toHaveBeenCalled();
    expect(component.dataConvert).toHaveBeenCalled();
    expect(component.siteSlices.length).toBeGreaterThan(0);
    expect(component.siteServices.length).toBeGreaterThan(0);
    expect(component.siteDeviceGroups.length).toBeGreaterThan(0);
  });

  it('should run #createNewSlicesFun()', () => {
    spyOn(component, 'closeExpand');
    spyOn(component, 'closeEditView');
    spyOn(component, 'newFormGroup');
    component.createNewSlicesFun();
    expect(component.closeExpand).toHaveBeenCalled();
    expect(component.closeEditView).toHaveBeenCalled();
    expect(component.newFormGroup).toHaveBeenCalled();
    expect(component.createNewSlices).toBeTrue();
  });

  it('should run #expandTrigger() --> else case', () => {
    spyOn(component, 'closeExpand');
    const expandSlices = (component.expandSlices = []);
    const index = 0;
    component.expandTrigger(index);
    expect(component.createNewSlices).toBeFalse();
    expect(component.closeExpand).toHaveBeenCalled();
    expect(expandSlices.length).toBeGreaterThan(0);
  });

  it('should run #expandTrigger()', () => {
    spyOn(component, 'closeExpand');
    const expandSlices = (component.expandSlices = [0, 0]);
    const index = 0;
    component.expandTrigger(index);
    expect(component.createNewSlices).toBeFalse();
    expect(component.closeExpand).toHaveBeenCalled();
    expect(expandSlices.length).toBeLessThan(2);
  });

  it('should run #closeExpand()', () => {
    spyOn(component, 'closeListView');
    const expandSlices = (component.expandSlices = [0, 0]);
    component.closeExpand();
    expect(component.closeListView).toHaveBeenCalled();
    expect(expandSlices.length).toBeLessThan(2);
  });

  it('should run #getTotalDevices()', () => {
    const data = [
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
        selected: 1,
      },
    ];
    component.getTotalDevices(data);
    const totalCount = component.getTotalDevices(data);
    expect(totalCount).toEqual(9);
  });

  it('should run #listViewTrigger()', () => {
    spyOn(component, 'closeListView');
    component.listViewSlices = [];
    const index = 0;
    component.listViewTrigger(index);
    expect(component.closeListView).toHaveBeenCalled();
    expect(component.listViewSlices.length).toBeGreaterThan(0);
  });

  it('should run #listViewTrigger()', () => {
    spyOn(component, 'closeListView');
    component.listViewSlices = [0, 0];
    const index = 0;
    component.listViewTrigger(index);
    expect(component.closeListView).toHaveBeenCalled();
    expect(component.listViewSlices.length).toBeLessThan(2);
  });

  it('should run #closeListView()', () => {
    component.listViewSlices = [0, 0];
    component.closeListView();
    expect(component.listViewSlices.length).toBeLessThan(2);
  });

  it('should run #editTrigger() --> else case', () => {
    const editSlices = (component.editSlices = component.editSlices);
    const index = 0;
    const siteSlices = (component.siteSlices = [
      {
        applications: ['nvr-application'],
        'device-groups': [
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
        'display-name': 'Cameras Slice',
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        mbr: 5,
        gbr: 10,
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
        downlink: '11-12 GHz',
      },
    ]);
    component.editTrigger(index);
    const sliceEditForm = (component.siteSlices[index].form =
      component.siteSlices[index].form);
    const sliceEditFormControl = sliceEditForm.controls;
    const indexSiteSlice = siteSlices[0];
    expect(component.createNewSlices).toBeFalse();
    expect(sliceEditFormControl.sliceName.value).toEqual(
      indexSiteSlice['display-name']
    );
    expect(sliceEditFormControl.sliceType.value).toEqual(
      indexSiteSlice['slice-type']
    );
    expect(sliceEditFormControl.mbr.value).toEqual(indexSiteSlice.mbr);
    expect(sliceEditFormControl.gbr.value).toEqual(indexSiteSlice.gbr);
    expect(sliceEditFormControl.trafficClass.value).toEqual(
      indexSiteSlice['traffic-class']
    );
    expect(sliceEditFormControl.uplink.value).toEqual(indexSiteSlice.uplink);
    expect(sliceEditFormControl.downlink.value).toEqual(
      indexSiteSlice.downlink
    );
    expect(editSlices.length).toBeGreaterThan(0);
  });

  it('should run #editTrigger() --> if case', () => {
    spyOn(component, 'closeEditView');
    spyOn(component, 'closeExpand');
    const editSlices = (component.editSlices = [0, 0]);
    const index = 0;
    component.editTrigger(index);
    expect(component.createNewSlices).toBeFalse();
    expect(component.closeEditView).toHaveBeenCalled();
    expect(component.closeExpand).toHaveBeenCalled();
    expect(editSlices.length).toBeLessThan(2);
  });

  it('should run #closeEditView()', () => {
    component.editSlices = [0, 0];
    component.closeEditView();
    expect(component.editSlices.length).toBeLessThan(2);
  });

  it('should run #deleteDeviceGroups()', () => {
    component.siteSlices = [
      {
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
          },
          {
            'application-id': 'occupant-counter',
            'display-name': 'Occupant Counting Application',
          },
        ],
        'device-groups': [
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
            selected: 1,
          },
        ],
        'display-name': 'Cameras Slice',
        downlink: '11-12 GHz',
        gbr: 10,
        mbr: 5,
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
      },
    ];
    const sliceIndex = 0;
    const deviceGroupIndex = 0;
    component.deviceGroupsInventory = [];
    component.deleteDeviceGroups(sliceIndex, deviceGroupIndex);
    expect(component.siteSlices[sliceIndex]['device-groups'].length).toEqual(0);
    expect(component.deviceGroupsInventory.length).toBeGreaterThan(0);
  });

  it('should run #deleteServices()', () => {
    component.siteSlices = [
      {
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
            selected: 1,
          },
          {
            'application-id': 'occupant-counter',
            'display-name': 'Occupant Counting Application',
            selected: 1,
          },
        ],
        'device-groups': [
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
        'display-name': 'Cameras Slice',
        downlink: '11-12 GHz',
        gbr: 10,
        mbr: 5,
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
      },
    ];
    const sliceIndex = 0;
    const serviceIndex = 0;
    component.deleteServices(sliceIndex, serviceIndex);
    expect(component.siteSlices[sliceIndex].applications.length).toEqual(1);
    expect(component.servicesInventory.length).toBeGreaterThan(0);
  });

  it('should run #deleteSlice()', () => {
    component.siteSlices = [
      {
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
          },
          {
            'application-id': 'occupant-counter',
            'display-name': 'Occupant Counting Application',
          },
        ],
        'device-groups': [
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
        'display-name': 'Cameras Slice',
        downlink: '11-12 GHz',
        gbr: 10,
        mbr: 5,
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
      },
    ];
    const sliceIndex = 0;
    component.remainingDeviceGroups = [];
    component.remainingServices = [];
    component.deleteSlice(sliceIndex);
    spyOn(component, 'deleteSlice').and.callThrough();
    expect(component.remainingDeviceGroups.length).toBeGreaterThan(0);
    expect(component.remainingServices.length).toBeGreaterThan(0);
    expect(component.siteSlices.length).toBeLessThan(1);
  });

  it('should run #changeSelectionAddDeviceGroups()', () => {
    component.deviceGroupsInventory = component.deviceGroupsInventory;
    const id = 'cameras';
    const name = 'cameras';
    const devices = ['000SEN1', '000SEN2', '000SEN3'];
    const deviceGroupIndex = 0;
    component.changeSelectionAddDeviceGroups(
      id,
      name,
      devices,
      deviceGroupIndex
    );
    expect(component.selectedAddDeviceGroups.length).toBeGreaterThan(0);
  });

  it('should run #changeSelectionAddDeviceGroups()', () => {
    component.deviceGroupsInventory = [
      {
        'device-group-id': 'sensors',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'Sensors Group',
        selected: 1,
      },
    ];
    component.selectedAddDeviceGroups = [
      {
        'device-group-id': 'sensors',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'Sensors Group',
        selected: 1,
      },
    ];
    const id = 'sensors';
    const name = 'Sensors Group';
    const devices = ['000SEN1', '000SEN2', '000SEN3'];
    const deviceGroupIndex = 0;
    component.changeSelectionAddDeviceGroups(
      id,
      name,
      devices,
      deviceGroupIndex
    );
    expect(component.selectedAddDeviceGroups.length).toBeLessThan(1);
  });

  it('should run #changeSelectionAddServices()', () => {
    component.servicesInventory = component.servicesInventory;
    const id = 'VC-application';
    const name = 'Voice Control';
    const serviceIndex = 0;
    component.changeSelectionAddServices(id, name, serviceIndex);
    expect(component.selectedAddServices.length).toBeGreaterThan(0);
  });

  it('should run #changeSelectionAddServices()', () => {
    component.servicesInventory = [
      {
        'application-id': 'VC-application',
        'display-name': 'Voice Control',
        selected: 1,
      },
    ];
    component.selectedAddServices = [
      {
        'application-id': 'VC-application',
        'display-name': 'Voice Control',
        selected: 1,
      },
    ];
    const id = 'VC-application';
    const name = 'Voice Control';
    const serviceIndex = 0;
    component.changeSelectionAddServices(id, name, serviceIndex);
    expect(component.selectedAddServices.length).toBeLessThan(1);
  });

  it('should run #openDeleteDialog()', () => {
    component.siteSlices = [
      {
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
          },
          {
            'application-id': 'occupant-counter',
            'display-name': 'Occupant Counting Application',
          },
        ],
        'device-groups': [
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
        'display-name': 'Cameras Slice',
        downlink: '11-12 GHz',
        gbr: 10,
        mbr: 5,
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
      },
    ];
    const sliceIndex = 0;
    spyOn(component, 'deleteSlice').withArgs(sliceIndex);
    spyOn(component, 'closeEditView');
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof DeleteSlicesComponent>);
    component.openDeleteDialog(sliceIndex);
    expect(component.deleteSlice).toHaveBeenCalled();
    expect(component.closeEditView).toHaveBeenCalled();
  });

  it('should run #calculateSVGHeight() --> else case', () => {
    const slices = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
        {
          'application-id': 'occupant-counter',
          'display-name': 'Occupant Counting Application',
        },
      ],
      'device-groups': [
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
      'display-name': 'Cameras Slice',
      downlink: '11-12 GHz',
      gbr: 10,
      mbr: 5,
      'slice-id': 'fremont-slice-cameras',
      'slice-type': 'cameras',
      'traffic-class': 'Sensitive',
      uplink: '5-6 GHz',
    };
    component.calculateSVGHeight(slices);
    const returnValue = component.calculateSVGHeight(slices);
    expect(returnValue).toEqual(169);
  });

  it('should run #calculateSVGHeight() --> second if case', () => {
    const slices = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
        {
          'application-id': 'occupant-counter',
          'display-name': 'Occupant Counting Application',
        },
      ],
      'device-groups': [
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
      'display-name': 'Cameras Slice',
      downlink: '11-12 GHz',
      gbr: 10,
      mbr: 5,
      'slice-id': 'fremont-slice-cameras',
      'slice-type': 'cameras',
      'traffic-class': 'Sensitive',
      uplink: '5-6 GHz',
    };
    component.calculateSVGHeight(slices);
    const returnValue = component.calculateSVGHeight(slices);
    expect(returnValue).toEqual(241);
  });

  it('should run #calculateSVGHeight() --> first if case', () => {
    const slices = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ],
      'device-groups': [
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
      'display-name': 'Cameras Slice',
      downlink: '11-12 GHz',
      gbr: 10,
      mbr: 5,
      'slice-id': 'fremont-slice-cameras',
      'slice-type': 'cameras',
      'traffic-class': 'Sensitive',
      uplink: '5-6 GHz',
    };
    component.calculateSVGHeight(slices);
    const returnValue = component.calculateSVGHeight(slices);
    expect(returnValue).toEqual(135);
  });

  it('should run #calculateVerticalPosition()', () => {
    const index = 0;
    component.calculateVerticalPosition(index);
    const returnValue = component.calculateVerticalPosition(index);
    expect(returnValue).toEqual(60);
  });
});
