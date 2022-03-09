/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';

import { SelectDevicesComponent } from './select-devices.component';

describe('SelectDevicesComponent', () => {
  let component: SelectDevicesComponent;
  let fixture: ComponentFixture<SelectDevicesComponent>;

  const dialogMock = {
    close: () => {
      return null;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule, MatDialogModule],
      declarations: [SelectDevicesComponent],
      providers: [{ provide: MatDialogRef, useValue: dialogMock }],
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
  // new test by ngentest
  it('should run #onNoClick()', async () => {
    // component.dialogRef = component.dialogRef;
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #changeSelection()', () => {
    component.changeSelection(1);
  });

  // new test by ngentest
  it('should run #selectDeviceFinal()', async () => {
    component.deviceService = component.deviceService;
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.selectDeviceFinal();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
