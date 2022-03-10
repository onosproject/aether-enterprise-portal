/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteServiceComponent } from '../dialogs/delete-service/delete-service.component';

@Component({
  selector: 'aep-services',
  templateUrl: './services.component.html',
  styles: [],
})
export class ServicesComponent implements OnInit {
  //var
  anankiFormGroup: FormGroup;
  addNewServiceForm: boolean = false;
  editServiceForm: boolean = false;

  // new Data
  protocolList: string[] = [
    'protocol-1',
    'protocol-2',
    'protocol-3',
    'protocol-4',
    'protocol-5',
  ];
  portStartList: number[] = [4201, 4202, 4203, 4204, 4205, 4206];
  portEndList: number[] = [8201, 8202, 8203, 8204, 8205, 8206];
  mbrList: number[] = [1, 5, 10, 15, 20];

  config = [];

  selectedSite: string = '';

  siteApplications = [];

  siteSubscription: Subscription;

  editService: number[] = [];

  addServiceFormGroup = new FormGroup({});

  addNewServiceError: boolean = false;

  editServiceFormGroup = new FormGroup({});

  editServiceFormError: boolean = false;

  constructor(
    public deviceService: DeviceSimService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.assignSelectedSite();
  }

  newServiceFormGroup(): void {
    this.addServiceFormGroup = new FormGroup({
      appName: new FormControl('', Validators.required),
      newProtocol: new FormControl('', Validators.required),
      newPortStart: new FormControl('', Validators.required),
      newAddress: new FormControl('', Validators.required),
      newMbr: new FormControl('', Validators.required),
      newPortEnd: new FormControl('', Validators.required),
    });
  }

  assignSelectedSite(): void {
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      this.selectedSite = data;
      this.fetchData();
    });
  }

  addNewService(): void {
    this.addNewServiceError = false;
    /* istanbul ignore else*/
    if (this.addServiceFormGroup.invalid) {
      this.addNewServiceError = true;
    }
    /* istanbul ignore else*/ if (this.addServiceFormGroup.valid) {
      this.siteApplications.push({
        'display-name': this.addServiceFormGroup.value.appName,
        protocol: this.addServiceFormGroup.value.newProtocol,
        portStart: this.addServiceFormGroup.value.newPortStart,
        address: this.addServiceFormGroup.value.newAddress,
        mbr: this.addServiceFormGroup.value.newMbr,
        portEnd: this.addServiceFormGroup.value.newPortEnd,
        deviceName: 'device-1',
      });
      this.addNewServiceForm = !this.addNewServiceForm;
      this.addNewServiceError = false;
    }
  }

  editTrigger(serviceIndex: number): void {
    this.addNewServiceForm = false;
    this.editServiceFormError = false;
    this.closeEdit();
    const editServiceIndex = this.editService.indexOf(serviceIndex);
    if (editServiceIndex >= 0) {
      this.editService.splice(editServiceIndex, 1);
    } else {
      this.siteApplications[serviceIndex].form = new FormGroup({
        appName: new FormControl(
          this.siteApplications[serviceIndex]['display-name'],
          Validators.required
        ),
        newProtocol: new FormControl(
          this.siteApplications[serviceIndex].protocol,
          Validators.required
        ),
        newPortStart: new FormControl(
          this.siteApplications[serviceIndex].portStart,
          Validators.required
        ),
        newAddress: new FormControl(
          this.siteApplications[serviceIndex].address,
          Validators.required
        ),
        newMbr: new FormControl(
          this.siteApplications[serviceIndex].mbr,
          Validators.required
        ),
        newPortEnd: new FormControl(
          this.siteApplications[serviceIndex].portEnd,
          Validators.required
        ),
      });
      this.editService.push(serviceIndex);
      this.editServiceFormGroup = this.siteApplications[serviceIndex].form;
    }
  }

  getEditControl(editServiceForm: FormGroup, param: string): FormControl {
    return editServiceForm.get(param) as FormControl;
  }

  closeEdit(): void {
    this.editService.pop();
  }

  fetchData(): void {
    this.deviceService.getData().subscribe((result) => {
      const configArray = [];
      const siteSlices = [];
      const siteApplications = [];
      const globalApplications = [];
      configArray.push(result);
      this.config = configArray;
      configArray.forEach((config) => {
        config.applications.forEach((configApp) => {
          globalApplications.push(configApp);
        });
        config.sites.forEach((siteConfig) => {
          /* istanbul ignore else*/
          if (siteConfig['site-id'] == this.selectedSite) {
            siteSlices.push(siteConfig.slices);
            siteSlices[0].forEach((siteSlice) => {
              siteSlice.applications.forEach((application) => {
                siteApplications.push({ application });
              });
              for (
                let siteAppIndex = 0;
                siteAppIndex < siteApplications.length;
                siteAppIndex++
              ) {
                for (
                  let appIndex = 0;
                  appIndex < globalApplications.length;
                  appIndex++
                ) {
                  if (
                    siteApplications[siteAppIndex].application ==
                    globalApplications[appIndex]['application-id']
                  ) {
                    const appInfo = {
                      'display-name':
                        globalApplications[appIndex]['display-name'],
                      'application-id':
                        globalApplications[appIndex]['application-id'],
                    };
                    siteApplications.splice(siteAppIndex, 1, appInfo);
                  }
                }
              }
            });
            for (let i = 0; i < siteApplications.length; i++) {
              siteApplications[i].protocol = 'protocol-1';
              siteApplications[i].portStart = 4201;
              siteApplications[i].portEnd = 8201;
              siteApplications[i].address = 'address-1';
              siteApplications[i].deviceName = 'device-1';
              siteApplications[i].mbr = 15;
            }
          }
        });
      });
      this.siteApplications = siteApplications;
      // console.log(this.siteApplications);
    });
  }

  onEdit(serviceIndex: number): void {
    this.editServiceFormError = false;
    /* istanbul ignore else*/
    if (this.editServiceFormGroup.invalid) {
      this.editServiceFormError = true;
    }
    /* istanbul ignore else*/
    if (this.editServiceFormGroup.valid) {
      const service = this.siteApplications[serviceIndex];
      const editForm = this.siteApplications[serviceIndex].form.value;
      service['display-name'] = editForm.appName;
      service.protocol = editForm.newProtocol;
      service.portStart = editForm.newPortStart;
      service.portEnd = editForm.newPortEnd;
      service.address = editForm.newAddress;
      service.mbr = editForm.newMbr;
      service.deviceName = 'device-1';
      this.closeEdit();
    }
  }

  deleteService(serviceIndex: number): void {
    this.siteApplications.splice(serviceIndex, 1);
  }

  openDeleteServiceDialog(serviceIndex: number): void {
    const dialogRef = this.dialog.open(DeleteServiceComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore else*/
      if (result == 'true') {
        this.deleteService(serviceIndex);
      }
      this.closeEdit();
    });
  }

  addNewServiceFormFun(): void {
    this.newServiceFormGroup();
    this.closeEdit();
    this.addNewServiceForm = true;
    this.editServiceForm = false;
  }
}
