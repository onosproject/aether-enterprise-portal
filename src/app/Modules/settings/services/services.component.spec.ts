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
      imports: [HttpClientModule, MatDialogModule, ReactiveFormsModule],
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

  it('should run #assignSelectedSIte()', () => {
    spyOn(component.deviceService, 'getSite').and.returnValue(of('fremont'));
    spyOn(component, 'fetchData');
    component.assignSelectedSite();
    const site = 'fremont';
    expect(component.deviceService.getSite).toHaveBeenCalled();
    expect(component.selectedSite).toEqual(site);
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should run #newServiceFormGroup()', () => {
    spyOn(component, 'newServiceFormGroup').and.callThrough();
    component.newServiceFormGroup();
    expect(component.addServiceFormGroup.controls.appName.value).toEqual('');
    expect(component.addServiceFormGroup.controls.newProtocol.value).toEqual(
      ''
    );
    expect(component.addServiceFormGroup.controls.newPortStart.value).toEqual(
      ''
    );
    expect(component.addServiceFormGroup.controls.newAddress.value).toEqual('');
    expect(component.addServiceFormGroup.controls.newMbr.value).toEqual('');
    expect(component.addServiceFormGroup.controls.newPortEnd.value).toEqual('');
  });

  it('should run #addNewService() --> invalid case', () => {
    component.addServiceFormGroup = new FormGroup({
      appName: new FormControl('', Validators.required),
      newProtocol: new FormControl('', Validators.required),
      newPortStart: new FormControl('', Validators.required),
      newAddress: new FormControl('', Validators.required),
      newMbr: new FormControl('', Validators.required),
      newPortEnd: new FormControl('', Validators.required),
    });
    const addServiceForm = component.addServiceFormGroup;
    spyOn(component, 'addNewService').and.callThrough();
    addServiceForm.controls.appName.setValue('');
    addServiceForm.controls.newProtocol.setValue('');
    addServiceForm.controls.newPortStart.setValue('');
    addServiceForm.controls.newAddress.setValue('');
    addServiceForm.controls.newMbr.setValue('');
    addServiceForm.controls.newPortEnd.setValue('');
    component.addNewService();
    expect(addServiceForm.invalid).toBeTrue();
    expect(component.addNewServiceError).toBeTrue();
  });

  it('should run #addNewService() --> valid case', () => {
    component.addNewServiceForm = true;
    component.addServiceFormGroup = new FormGroup({
      appName: new FormControl('', Validators.required),
      newProtocol: new FormControl('', Validators.required),
      newPortStart: new FormControl('', Validators.required),
      newAddress: new FormControl('', Validators.required),
      newMbr: new FormControl('', Validators.required),
      newPortEnd: new FormControl('', Validators.required),
    });
    const addServiceForm = component.addServiceFormGroup;
    const addServiceFormControls = component.addServiceFormGroup.controls;
    component.siteApplications = [];
    addServiceFormControls.appName.setValue('Main control App');
    addServiceFormControls.newProtocol.setValue('Protocol-5');
    addServiceFormControls.newPortStart.setValue(4203);
    addServiceFormControls.newAddress.setValue('Some Address');
    addServiceFormControls.newMbr.setValue(5);
    addServiceFormControls.newPortEnd.setValue(8203);
    spyOn(component, 'addNewService').and.callThrough();
    component.addNewService();
    expect(addServiceForm.valid).toBeTrue();
    expect(component.siteApplications.length).toBeGreaterThan(0);
    expect(component.addNewServiceForm).toBeFalse();
    expect(component.addNewServiceError).toBeFalse();
  });

  it('should run #editTrigger() --> else case', () => {
    spyOn(component, 'closeEdit');
    const index = 0;
    component.siteApplications = [
      {
        address: 'address-1',
        'application-id': 'nvr-application',
        deviceName: 'device-1',
        'display-name': 'Network Video Recorder',
        mbr: 15,
        portEnd: 8201,
        portStart: 4201,
        protocol: 'protocol-1',
      },
    ];
    component.editTrigger(index);
    component.editServiceFormGroup = component.editServiceFormGroup;
    const editFormControl = component.editServiceFormGroup.controls;
    const indexSiteApp = component.siteApplications[index];
    expect(component.addNewServiceForm).toBeFalse();
    expect(component.editServiceFormError).toBeFalse();
    expect(component.closeEdit).toHaveBeenCalled();
    expect(editFormControl.appName.value).toEqual(indexSiteApp['display-name']);
    expect(editFormControl.newProtocol.value).toEqual(indexSiteApp.protocol);
    expect(editFormControl.newPortStart.value).toEqual(indexSiteApp.portStart);
    expect(editFormControl.newAddress.value).toEqual(indexSiteApp.address);
    expect(editFormControl.newMbr.value).toEqual(indexSiteApp.mbr);
    expect(editFormControl.newPortEnd.value).toEqual(indexSiteApp.portEnd);
    expect(component.editServiceFormGroup).toEqual(
      component.siteApplications[index].form
    );
  });

  it('should run #editTrigger() --> if case', () => {
    spyOn(component, 'closeEdit');
    component.editService = [0, 0];
    const index = 0;
    component.editServiceFormGroup = new FormGroup({});
    component.editTrigger(index);
    expect(component.addNewServiceForm).toBeFalse();
    expect(component.editServiceFormError).toBeFalse();
    expect(component.closeEdit).toHaveBeenCalled();
    expect(component.editService.length).toBeLessThan(2);
  });

  it('should run #getEditControl()', () => {
    const index = 0;
    const param = 'appName';
    const param1 = 'newProtocol';
    const param2 = 'newPortStart';
    const param3 = 'newAddress';
    const param4 = 'newMbr';
    const param5 = 'newPortEnd';
    component.siteApplications[index].form = new FormGroup({
      appName: new FormControl(
        component.siteApplications[index]['display-name'],
        Validators.required
      ),
      newProtocol: new FormControl(
        component.siteApplications[index].protocol,
        Validators.required
      ),
      newPortStart: new FormControl(
        component.siteApplications[index].portStart,
        Validators.required
      ),
      newAddress: new FormControl(
        component.siteApplications[index].address,
        Validators.required
      ),
      newMbr: new FormControl(
        component.siteApplications[index].mbr,
        Validators.required
      ),
      newPortEnd: new FormControl(
        component.siteApplications[index].portEnd,
        Validators.required
      ),
    });
    component.editServiceFormGroup = component.siteApplications[index].form;
    component.editServiceFormGroup = component.editServiceFormGroup;
    component.getEditControl(component.editServiceFormGroup, param);
    component.getEditControl(component.editServiceFormGroup, param1);
    component.getEditControl(component.editServiceFormGroup, param2);
    component.getEditControl(component.editServiceFormGroup, param3);
    component.getEditControl(component.editServiceFormGroup, param4);
    component.getEditControl(component.editServiceFormGroup, param5);
    const editForm = component.editServiceFormGroup;
    const gotControl = editForm.get(param) as FormControl;
    const gotControl1 = editForm.get(param1) as FormControl;
    const gotControl2 = editForm.get(param2) as FormControl;
    const gotControl3 = editForm.get(param3) as FormControl;
    const gotControl4 = editForm.get(param4) as FormControl;
    const gotControl5 = editForm.get(param5) as FormControl;
    // const editFormControls = component.editServiceFormGroup.controls;
    expect(
      component.getEditControl(component.editServiceFormGroup, param)
    ).toEqual(gotControl);
    expect(
      component.getEditControl(component.editServiceFormGroup, param1)
    ).toEqual(gotControl1);
    expect(
      component.getEditControl(component.editServiceFormGroup, param2)
    ).toEqual(gotControl2);
    expect(
      component.getEditControl(component.editServiceFormGroup, param3)
    ).toEqual(gotControl3);
    expect(
      component.getEditControl(component.editServiceFormGroup, param4)
    ).toEqual(gotControl4);
    expect(
      component.getEditControl(component.editServiceFormGroup, param5)
    ).toEqual(gotControl5);
  });

  it('should run #closeEdit()', () => {
    component.editService = [0, 0];
    spyOn(component, 'closeEdit').and.callThrough();
    component.closeEdit();
    expect(component.editService.length).toBeLessThan(2);
    // expect(component.editDevices.pop).toHaveBeenCalled();
  });

  it('should run #fetchData() to get the api data', () => {
    component.selectedSite = 'fremont';
    // expect(component.)
    component.fetchData();
    const globalServices = [
      {
        'display-name': 'Network Video Recorder',
        'application-id': 'nvr-application',
      },
    ];
    const defaultMissingData = [
      {
        protocol: 'protocol-1',
        portStart: 4201,
        portEnd: 8201,
        address: 'address-1',
        deviceName: 'device-1',
        mbr: 15,
      },
    ];
    const globalData = globalServices[0];
    const defData = defaultMissingData[0];
    const siteService = component.siteApplications[0];
    expect(component.config.length).toBeGreaterThan(0);
    expect(component.siteApplications.length).toBeGreaterThan(0);
    expect(siteService['display-name']).toEqual(globalData['display-name']);
    expect(siteService['application-id']).toEqual(globalData['application-id']);
    expect(siteService['protocol']).toEqual(defData.protocol);
    expect(siteService['portStart']).toEqual(defData.portStart);
    expect(siteService['portEnd']).toEqual(defData.portEnd);
    expect(siteService['address']).toEqual(defData.address);
    expect(siteService['deviceName']).toEqual(defData.deviceName);
    expect(siteService['mbr']).toEqual(defData.mbr);
  });

  it('should run #onEdit() --> valid case', () => {
    spyOn(component, 'closeEdit');
    const index = 0;
    component.siteApplications = [
      {
        address: 'address-1',
        'application-id': 'nvr-application',
        deviceName: 'device-1',
        'display-name': 'Network Video Recorder',
        mbr: 15,
        portEnd: 8201,
        portStart: 4201,
        protocol: 'protocol-1',
      },
    ];
    component.editServiceFormError = true || false;
    component.siteApplications[index].form = new FormGroup({
      appName: new FormControl(
        component.siteApplications[index]['display-name'],
        Validators.required
      ),
      newProtocol: new FormControl(
        component.siteApplications[index].protocol,
        Validators.required
      ),
      newPortStart: new FormControl(
        component.siteApplications[index].portStart,
        Validators.required
      ),
      newAddress: new FormControl(
        component.siteApplications[index].address,
        Validators.required
      ),
      newMbr: new FormControl(
        component.siteApplications[index].mbr,
        Validators.required
      ),
      newPortEnd: new FormControl(
        component.siteApplications[index].portEnd,
        Validators.required
      ),
    });
    component.editServiceFormGroup = component.siteApplications[index].form;
    component.editServiceFormGroup = component.editServiceFormGroup;
    const editServiceForm = component.editServiceFormGroup;
    const editServiceFormControls = editServiceForm.controls;
    const selectedService = component.siteApplications[0];
    editServiceFormControls.appName.setValue('Packet Analyzer');
    editServiceFormControls.newProtocol.setValue('protocol-3');
    editServiceFormControls.newPortStart.setValue(4203);
    editServiceFormControls.newAddress.setValue('somewhere new');
    editServiceFormControls.newMbr.setValue(10);
    editServiceFormControls.newPortEnd.setValue(8203);
    component.onEdit(index);
    expect(editServiceForm.valid).toBeTrue();
    expect(selectedService['display-name']).toEqual('Packet Analyzer');
    expect(selectedService.protocol).toEqual('protocol-3');
    expect(selectedService.portStart).toEqual(4203);
    expect(selectedService.portEnd).toEqual(8203);
    expect(selectedService.address).toEqual('somewhere new');
    expect(selectedService.mbr).toEqual(10);
    expect(selectedService.deviceName).toEqual('device-1');
    expect(component.closeEdit).toHaveBeenCalled();
  });

  it('should run #onEdit() --> invalid case', () => {
    const index = 0;
    component.siteApplications[index].form = new FormGroup({
      appName: new FormControl(
        component.siteApplications[index]['display-name'],
        Validators.required
      ),
      newProtocol: new FormControl(
        component.siteApplications[index].protocol,
        Validators.required
      ),
      newPortStart: new FormControl(
        component.siteApplications[index].portStart,
        Validators.required
      ),
      newAddress: new FormControl(
        component.siteApplications[index].address,
        Validators.required
      ),
      newMbr: new FormControl(
        component.siteApplications[index].mbr,
        Validators.required
      ),
      newPortEnd: new FormControl(
        component.siteApplications[index].portEnd,
        Validators.required
      ),
    });
    component.editServiceFormGroup = component.siteApplications[index].form;
    component.editServiceFormGroup = component.editServiceFormGroup;
    const editServiceForm = component.editServiceFormGroup;
    const editServiceFormControls = editServiceForm.controls;
    editServiceFormControls.appName.setValue('');
    editServiceFormControls.newProtocol.setValue('');
    editServiceFormControls.newPortStart.setValue('');
    editServiceFormControls.newAddress.setValue('');
    editServiceFormControls.newMbr.setValue('');
    editServiceFormControls.newPortEnd.setValue('');
    component.onEdit(index);
    expect(editServiceForm.invalid).toBeTrue();
    expect(component.editServiceFormError).toBeTrue();
  });

  it('should run #deleteService()', () => {
    const index = 0;
    component.siteApplications = [
      {
        address: 'address-1',
        'application-id': 'nvr-application',
        deviceName: 'device-1',
        'display-name': 'Network Video Recorder',
        mbr: 15,
        portEnd: 8201,
        portStart: 4201,
        protocol: 'protocol-1',
      },
    ];
    component.deleteService(index);
    expect(component.siteApplications.length).toBeLessThan(1);
  });

  it('should run #openDeleteDialog()', () => {
    spyOn(component, 'closeEdit');
    spyOn(component, 'deleteService');
    const serviceIndex = 0;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof DeleteServiceComponent>);
    component.openDeleteServiceDialog(serviceIndex);
    expect(component.deleteService).toHaveBeenCalled();
    expect(component.closeEdit).toHaveBeenCalled();
  });

  it('should run #addNewServiceFormFun()', () => {
    spyOn(component, 'newServiceFormGroup');
    spyOn(component, 'closeEdit');
    component.addNewServiceFormFun();
    expect(component.newServiceFormGroup).toHaveBeenCalled();
    expect(component.closeEdit).toHaveBeenCalled();
    expect(component.addNewServiceForm).toBeTrue();
    expect(component.editServiceForm).toBeFalse();
  });
});
