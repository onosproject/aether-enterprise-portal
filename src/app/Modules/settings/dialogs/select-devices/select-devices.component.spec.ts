/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material/material.module';

import { SelectDevicesComponent } from './select-devices.component';

describe('SelectDevicesComponent', () => {
  let component: SelectDevicesComponent;
  let fixture: ComponentFixture<SelectDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule],
      declarations: [SelectDevicesComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #onNoClick()', async () => {
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should run #changeSelection()', () => {
    component.inventoryDevices = [
      {
        'display-name': 'Device 1',
        location: 'floor 1',
        'serial-number': '12345',
        type: 'device',
      },
    ];
    component.changeSelection('12345');
    expect(component.selectedDevice).toEqual({
      'display-name': 'Device 1',
      location: 'floor 1',
      'serial-number': '12345',
      type: 'device',
    });
  });

  it('should run #selectDeviceFinal()', async () => {
    component.selectedDevice = {
      'display-name': 'Device 1',
      location: 'floor 1',
      'serial-number': '12345',
      type: 'device',
    };
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.selectDeviceFinal();
    let device = [];
    component.deviceService.getDevice1().subscribe((value) => (device = value));
    expect(device).toEqual([
      {
        'display-name': 'Device 1',
        location: 'floor 1',
        'serial-number': '12345',
        type: 'device',
      },
    ]);
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should run #getInventory()', async () => {
    component.deviceService.myDevices([
      {
        'display-name': 'Device 1',
        location: 'floor 1',
        'serial-number': '12345',
        type: 'device',
      },
    ]);
    component.getInventory();
    expect(component.inventoryDevices).toEqual([
      {
        'display-name': 'Device 1',
        location: 'floor 1',
        'serial-number': '12345',
        type: 'device',
      },
    ]);
  });
});
