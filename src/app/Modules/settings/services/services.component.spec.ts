/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { DeviceSimStub } from '../device-sim/device-sim.service.mock';
import { DeleteServiceComponent } from '../dialogs/delete-service/delete-service.component';

import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers: [{ provide: DeviceSimService, useClass: DeviceSimStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.siteApplications = [
      {
        'display-name': 'Network Video Recorder',
        'application-id': 'nvr-application',
        protocol: 'protocol-1',
        portStart: 4201,
        portEnd: 8201,
        address: 'address-1',
        deviceName: 'device-1',
        mbr: 15,
        form: {
          value: {
            appName: 'Network Video Recorder',
            newProtocol: 'protocol-1',
            newPortStart: 4201,
            newPortEnd: 8201,
            newAddress: 'address-1',
          },
        },
      },
      {
        'display-name': 'Occupant Counting Application',
        'application-id': 'occupant-counter',
        protocol: 'protocol-1',
        portStart: 4201,
        portEnd: 8201,
        address: 'address-1',
        deviceName: 'device-1',
        mbr: 15,
      },
      {
        'display-name': 'Expenses Application',
        'application-id': 'expenses-application',
        protocol: 'protocol-1',
        portStart: 4201,
        portEnd: 8201,
        address: 'address-1',
        deviceName: 'device-1',
        mbr: 15,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'assignSelectedSite').and.callThrough();
    component.ngOnInit();
    expect(component.assignSelectedSite).toHaveBeenCalled();
  });

  it('should run #newServiceFormGroup()', async () => {
    component.newServiceFormGroup();
  });

  it('should run #addNewService()', async () => {
    component.addServiceFormGroup = new FormGroup({
      appName: new FormControl('', Validators.required),
      newProtocol: new FormControl('', Validators.required),
      newPortStart: new FormControl('', Validators.required),
      newAddress: new FormControl('', Validators.required),
      newMbr: new FormControl('', Validators.required),
      newPortEnd: new FormControl('', Validators.required),
    });
    component.addNewServiceError = false;
    component.addNewService();
  });

  it('should run #addNewService()', async () => {
    component.addNewServiceError = false;
    component.addNewService();
  });

  it('should run #editTrigger()', async () => {
    // component.editDevices = [0, 1, 2];
    const index = 0;
    component.editServiceFormGroup = new FormGroup({});
    component.editTrigger(index);
  });

  it('should run #editTrigger()', async () => {
    component.editService = [0, 0];
    const index = 0;
    component.editServiceFormGroup = new FormGroup({});
    component.editTrigger(index);
  });

  it('should run #getEditControl()', async () => {
    const param = '0';
    component.getEditControl(component.editServiceFormGroup, param);
  });

  it('should run #closeEdit()', async () => {
    component.editService = component.editService;
    spyOn(component.editService, 'pop');
    component.closeEdit();
    // expect(component.editDevices.pop).toHaveBeenCalled();
  });

  it('should run #fetchData() to get the api data', async () => {
    component.selectedSite = 'fremont';
    expect(component.config.length).toBeGreaterThan(0);
    expect(component.siteApplications.length).toBeGreaterThan(0);
    // expect(component.)
    component.fetchData();
  });

  it('should run #onEdit()', async () => {
    const index = 0;
    component.editServiceFormError = true || false;
    component.onEdit(index);
  });

  it('should run #onEdit()', async () => {
    component.editServiceFormGroup = new FormGroup({
      appName: new FormControl('', Validators.required),
      newProtocol: new FormControl('', Validators.required),
      newPortStart: new FormControl('', Validators.required),
      newAddress: new FormControl('', Validators.required),
      newMbr: new FormControl('', Validators.required),
      newPortEnd: new FormControl('', Validators.required),
    });
    const index = 0;
    component.editServiceFormError = true || false;
    component.onEdit(index);
  });

  it('should run #deleteService()', async () => {
    const index = 0;
    component.deleteService(index);
  });

  it('should run #openDeleteDialog()', async () => {
    const serviceIndex = 0;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof DeleteServiceComponent>);
    component.openDeleteServiceDialog(serviceIndex);
  });

  it('should run #addNewServiceFormFun()', async () => {
    component.addNewServiceFormFun();
  });

  it('should run #editServiceFormFun()', async () => {
    component.editServiceFormFun();
  });

  it('should run #editServiceFormClose()', async () => {
    component.editServiceFormClose();
  });
});
