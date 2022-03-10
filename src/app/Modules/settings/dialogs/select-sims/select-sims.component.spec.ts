/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material/material.module';
import { SelectSimsComponent } from './select-sims.component';
import { MatDialogModule } from '@angular/material/dialog';

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
      providers: [{ provide: MatDialogRef, useValue: dialogMock }],
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
    spyOn(component, 'assignSelectedSims');
    component.ngOnInit();
    expect(component.assignSelectedSims).toHaveBeenCalled();
  });

  it('should run #onNoClick()', () => {
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should run #changeSelection()', () => {
    component.changeSelection('1234');
    expect(component.selectedSim).toEqual('1234');
  });

  it('should run #selectSimFinal()', async () => {
    component.selectedSim = '1234';
    spyOn(component.dialogRef, 'close').and.callThrough();
    component.selectSimFinal();
    let sim = '';
    component.deviceService.getSim1().subscribe((value) => {
      sim = value;
    });
    expect(sim).toEqual('1234');
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should run #assignSelectedSims()', async () => {
    component.deviceService.mySims([{ iccid: '1234' }]);
    component.assignSelectedSims();
    expect(component.inventorySims).toEqual([{ iccid: '1234' }]);
  });
});
