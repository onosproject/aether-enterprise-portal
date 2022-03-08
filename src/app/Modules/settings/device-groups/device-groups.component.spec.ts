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
import { MatStepper } from '@angular/material/stepper';

import { DeviceGroupsComponent } from './device-groups.component';

describe('DeviceGroupsComponent', () => {
  let component: DeviceGroupsComponent;
  let fixture: ComponentFixture<DeviceGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceGroupsComponent],
      imports: [ReactiveFormsModule, HttpClientModule, MatDialogModule],
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

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'assignSelectedSite');
    component.ngOnInit();
    // expect(component.assignSelectedSite).toHaveBeenCalled();
  });

  it('should run #editDeviceGroupFormFun()', async () => {
    component.editDeviceGroupFormFun();
  });

  it('should run #editDeviceGroupFormFunClose()', async () => {
    component.editDeviceGroupFormFunClose();
  });

  it('should run #editAddDeviceGroupFun()', async () => {
    component.editAddDeviceGroupFun();
  });

  it('should run #hideRightBxFn()', async () => {
    component.hideRightBxFn();
  });

  it('should run #addNewdeviceGroupFormFun()', async () => {
    spyOn(component, 'newFormGroup');
    component.addNewdeviceGroupFormFun();
    // expect(component.newFormGroup).toHaveBeenCalled();
  });

  it('should run #addNewdeviceGroupFormClose()', async () => {
    component.addNewdeviceGroupFormClose();
  });

  it('should run #collapseSlice()', async () => {
    component.collapseSlice();
  });

  it('should run #openPanel()', async () => {
    component.openPanel();
  });

  it('should run #newFormGroup()', async () => {
    component.newFormGroup();
  });

  it('should run #emptySummaryArray()', async () => {
    component.summaryArray = component.summaryArray;
    spyOn(component.summaryArray, 'splice');
    component.emptySummaryArray();
    // expect(component.summaryArray.splice).toHaveBeenCalled();
  });

  it('should run #emptySelectedDevices()', async () => {
    component.selectedDevices = component.selectedDevices;
    spyOn(component.selectedDevices, 'splice');
    component.emptySelectedDevices();
    // expect(component.selectedDevices.splice).toHaveBeenCalled();
  });

  it('should run #closeExpand()', async () => {
    component.expandDeviceGroups = component.expandDeviceGroups;
    spyOn(component.expandDeviceGroups, 'pop');
    component.closeExpand();
    // expect(component.expandDeviceGroups.pop).toHaveBeenCalled();
  });

  it('should run #firstFormNext()', async () => {
    component.stepper = { selectedIndex: 0 } as MatStepper;
    component.firstFormNext();
  });

  it('should run #firstFormNext()', async () => {
    component.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
    component.firstFormNext();
  });

  it('should run #addNewDeviceG()', async () => {
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

  it('should run #addNewDeviceG()', async () => {
    component.newFormGroup();
    const firstForm = component.firstFormGroup;
    firstForm.value.newDeviceGroup = '';
    firstForm.value.newIpDomain = '';
    firstForm.value.newDescription = '';
    component.addNewDeviceG();
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

  it('should run #onEdit --> invalid (if case)', async () => {
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
});
