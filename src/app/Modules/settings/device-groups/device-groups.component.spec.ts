/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

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
});
