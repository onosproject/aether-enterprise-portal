/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
// import { trigger, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSlicesComponent } from '../dialogs/delete-slices/delete-slices.component';
import { Config } from 'src/app/models/config.model';
import { Service } from 'src/app/models/service.model';
import { DeviceGroup } from 'src/app/models/device-group.model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'aep-slices1',
  templateUrl: './slices.component.html',
  styles: [],
})
export class SlicesComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  listConnectViewToggle: boolean = true;
  editMissionCriticalSliceForm: boolean = false;
  detailsContent: boolean = false;
  headerContent: boolean = true;

  createNewSlices: boolean = false;
  expandId: boolean = true;
  hideRightBx: boolean = true;
  panelOpenState = false;
  editMissionCriticalSlicesForm: boolean = false;
  editAddDeviceGroup: boolean = false;
  editAddServices: boolean = false;
  isLinear = false;
  // firstFormGroup: FormGroup;
  addNewSliceError: boolean = false;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  summaryForm: FormGroup;

  editAddDeviceGroupFun(): void {
    this.editAddDeviceGroup = true;
  }
  editAddServicesFun(): void {
    this.editAddServices = true;
  }

  constructor(
    private _formBuilder: FormBuilder,
    public deviceService: DeviceSimService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.assignSelectedSite();
  }

  firstFormError: boolean = false;

  firstFormComplete: boolean = false;

  config = [];

  siteDeviceGroups = [];

  numOfDeviceGroups: number = 0;

  totalDevicesArray = [];

  siteSlices = [];

  siteServices = [];

  siteSubscription: Subscription;

  selectedSite: string = '';

  selectedDeviceGroups = [];

  selectedServices = [];

  remainingDeviceGroups = [];

  deviceGroupsInventory = [
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

  servicesInventory: Service[] = [
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

  remainingServices = [];

  expandSlices: number[] = [];

  listViewSlices: number[] = [];

  editSlices: number[] = [];

  selectedAddDeviceGroups = [];

  selectedAddServices = [];

  summaryArray = [];

  summaryBool: boolean = false;

  // dropdowns arrays
  sliceTypes: string[] = ['cameras', 'sensors', 'phones'];
  maximumBitRate: number[] = [1, 5, 10];
  guaranteedBitRate: number[] = [1, 5, 10];
  trafficClass: string[] = ['Sensitive', 'Best-Effort', 'Undesired'];
  uplink: string[] = ['5-6 GHz', '14-14.5 GHz', '27-31 GHz'];
  downlink: string[] = ['3-4 GHz', '11-12 GHz', '17-21 GHz'];

  // formGroups
  firstFormGroup = new FormGroup({});

  summarySliceEditFormGroup = new FormGroup({});

  newFormGroup(): void {
    this.addNewSliceError = false;
    this.firstFormError = false;
    this.firstFormGroup = new FormGroup({
      sliceName: new FormControl('', Validators.required),
      sliceType: new FormControl('', Validators.required),
      mbr: new FormControl('', Validators.required),
      gbr: new FormControl('', Validators.required),
      trafficClass: new FormControl('', Validators.required),
      uplink: new FormControl('', Validators.required),
      downlink: new FormControl('', Validators.required),
    });
  }

  firstFormNext(): void {
    this.firstFormError = false;
    if (this.firstFormGroup.invalid) {
      this.firstFormError = true;
    }
    if (this.firstFormGroup.valid) {
      this.firstFormComplete = true;
      this.stepper.selectedIndex = 1;
    }
  }

  summaryTrigger(): void {
    this.summaryBool = true;
    console.log(this.summaryArray);
    this.summaryArray.push({
      summarySliceName: this.firstFormGroup.value.sliceName,
      summarySliceType: this.firstFormGroup.value.sliceType,
      summaryDownlink: this.firstFormGroup.value.downlink,
      summaryUplink: this.firstFormGroup.value.uplink,
      summaryTrafficClass: this.firstFormGroup.value.trafficClass,
      summarymbr: this.firstFormGroup.value.mbr,
      summarygbr: this.firstFormGroup.value.gbr,
    });
    console.log(this.summaryArray);
    this.summaryArray[0].form = new FormGroup({
      sliceName: new FormControl(this.summaryArray[0].summarySliceName, [
        Validators.required,
      ]),
      sliceType: new FormControl(this.summaryArray[0].summarySliceType, [
        Validators.required,
      ]),
      mbr: new FormControl(this.summaryArray[0].summarymbr, [
        Validators.required,
      ]),
      gbr: new FormControl(this.summaryArray[0].summarygbr, [
        Validators.required,
      ]),
      trafficClass: new FormControl(this.summaryArray[0].summaryTrafficClass, [
        Validators.required,
      ]),
      uplink: new FormControl(this.summaryArray[0].summaryUplink, [
        Validators.required,
      ]),
      downlink: new FormControl(this.summaryArray[0].summaryDownlink, [
        Validators.required,
      ]),
    });
    this.summarySliceEditFormGroup = this.summaryArray[0].form;
  }

  emptySummaryArray(): void {
    this.summaryBool = false;
    this.summaryArray.splice(0, this.summaryArray.length);
  }

  getSummaryControl(summaryForm: FormGroup, param: string): FormControl {
    return summaryForm.get(param) as FormControl;
  }

  changeSelectionDeviceGroups(
    id: string,
    name: string,
    devices: string[],
    deviceGroupIndex: number
  ): void {
    if (this.deviceGroupsInventory[deviceGroupIndex].selected == 0) {
      this.deviceGroupsInventory[deviceGroupIndex].selected = 1;
      const selectedDeviceGroupInfo = {
        'device-group-id': id,
        devices: devices,
        'display-name': name,
        selected: 1,
      };
      console.log(selectedDeviceGroupInfo);
      this.selectedDeviceGroups.push(selectedDeviceGroupInfo);
    } else {
      this.deviceGroupsInventory[deviceGroupIndex].selected = 0;
      for (let i = 0; i < this.selectedDeviceGroups.length; i++) {
        /* istanbul ignore else*/
        if (this.selectedDeviceGroups[i]['device-group-id'] == id) {
          this.selectedDeviceGroups.splice(i, 1);
        }
      }
    }
  }

  deleteSummaryDeviceGroups(deviceGroupIndex: number): void {
    this.selectedDeviceGroups.splice(deviceGroupIndex, 1);
  }

  changeSelectionServices(
    id: string,
    name: string,
    serviceIndex: number
  ): void {
    if (this.servicesInventory[serviceIndex].selected == 0) {
      this.servicesInventory[serviceIndex].selected = 1;
      const selectedServiceInfo = {
        'application-id': id,
        'display-name': name,
        selected: 1,
      };
      this.selectedServices.push(selectedServiceInfo);
    } else {
      this.servicesInventory[serviceIndex].selected = 0;
      for (let i = 0; i < this.selectedServices.length; i++) {
        /* istanbul ignore else*/
        if (this.selectedServices[i]['application-id'] == id) {
          this.selectedServices.splice(i, 1);
        }
      }
    }
  }

  deleteSummaryServices(serviceIndex: number): void {
    this.selectedServices.splice(serviceIndex, 1);
  }

  onSubmit(): void {
    this.addNewSliceError = false;
    if (this.summarySliceEditFormGroup.invalid) {
      this.addNewSliceError = true;
    }
    if (this.summarySliceEditFormGroup.valid && this.firstFormGroup.valid) {
      const applications = [];
      const deviceGroups = [];
      const summaryForm = this.summaryArray[0].form.value;
      this.selectedServices.forEach((service) => {
        applications.push(service);
      });
      this.selectedDeviceGroups.forEach((deviceGroup) => {
        deviceGroups.push(deviceGroup);
      });
      this.siteSlices.push({
        applications: applications,
        'device-groups': deviceGroups,
        'display-name': summaryForm.sliceName + ' Slice',
        'slice-type': summaryForm.sliceType,
        downlink: this.firstFormGroup.value.downlink,
        uplink: this.firstFormGroup.value.uplink,
        'traffic-class': summaryForm.trafficClass,
        mbr: summaryForm.mbr,
        gbr: summaryForm.gbr,
      });
      for (
        let selectedIndex = 0;
        selectedIndex < this.selectedDeviceGroups.length;
        selectedIndex++
      ) {
        for (
          let inventoryIndex = 0;
          inventoryIndex < this.deviceGroupsInventory.length;
          inventoryIndex++
        ) {
          /* istanbul ignore else*/
          if (
            this.deviceGroupsInventory[inventoryIndex]['device-group-id'] ==
            this.selectedDeviceGroups[selectedIndex]['device-group-id']
          ) {
            this.deviceGroupsInventory.splice(inventoryIndex, 1);
          }
        }
      }
      this.selectedDeviceGroups.splice(0, this.selectedDeviceGroups.length);

      for (
        let selectedIndex = 0;
        selectedIndex < this.selectedServices.length;
        selectedIndex++
      ) {
        for (
          let inventoryIndex = 0;
          inventoryIndex < this.servicesInventory.length;
          inventoryIndex++
        ) {
          /* istanbul ignore else*/
          if (
            this.servicesInventory[inventoryIndex]['application-id'] ==
            this.selectedServices[selectedIndex]['application-id']
          ) {
            this.servicesInventory.splice(inventoryIndex, 1);
          }
        }
      }
      this.selectedServices.splice(0, this.selectedServices.length);
      this.emptySummaryArray();
      this.createNewSlices = false;
    }
  }

  assignSelectedSite(): void {
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      this.selectedSite = data;
      this.fetchData();
    });
  }

  fetchData(): void {
    this.createNewSlices = false;
    this.closeExpand();
    this.closeListView();
    this.deviceService.getData().subscribe((result: Config) => {
      const configArray = [];
      configArray.push(result);
      this.config = configArray;
      configArray.map((item) => {
        const sitesSlices = [];
        const sitesDevicesGroups = [];
        const sitesServices = item.applications;
        const sitesConfig = item.sites;
        sitesConfig.map((site) => {
          /* istanbul ignore else*/
          if (site['site-id'] === this.selectedSite) {
            sitesDevicesGroups.push(site['device-groups']);
            sitesDevicesGroups.forEach((siteDeviceGroup) => {
              siteDeviceGroup.forEach(
                (singleDeviceGroup, singleDeviceGroupIndex) => {
                  siteDeviceGroup[singleDeviceGroupIndex].selected = 1;
                }
              );
            });
            sitesServices.forEach((service, serviceIndex) => {
              sitesServices[serviceIndex].selected = 1;
            });
            site.slices.map((slices) => {
              sitesSlices.push(slices);
            });
          }
        });
        this.siteSlices = sitesSlices;
        this.siteServices = sitesServices;
        this.siteDeviceGroups = sitesDevicesGroups;
        this.dataConvert();
      });
    });
  }

  dataConvert(): void {
    const remainingDeviceGroups = [];
    const remainingServices = [];
    this.siteSlices.forEach((slices) => {
      slices['device-groups'].forEach(
        (sliceDeviceGroups, sliceDeviceGroupsIndex) => {
          this.siteDeviceGroups.forEach((deviceGroups) => {
            deviceGroups.forEach((deviceGroup) => {
              /* istanbul ignore else*/
              if (sliceDeviceGroups == deviceGroup['device-group-id']) {
                slices['slice-type'] = sliceDeviceGroups;
                slices['mbr'] = 5;
                slices['gbr'] = 10;
                slices['traffic-class'] = 'Sensitive';
                slices['uplink'] = '5-6 GHz';
                slices['downlink'] = '11-12 GHz';
                const deviceGroupInfo = {
                  'device-group-id': deviceGroup['device-group-id'],
                  devices: deviceGroup.devices,
                  'display-name': deviceGroup['display-name'],
                };
                slices['device-groups'].splice(
                  sliceDeviceGroupsIndex,
                  1,
                  deviceGroupInfo
                );
              }
            });
          });
        }
      );

      slices.applications.forEach((service, serviceIndex) => {
        this.siteServices.forEach((siteService) => {
          /* istanbul ignore else*/
          if (service == siteService['application-id']) {
            const serviceInfo = {
              'application-id': siteService['application-id'],
              'display-name': siteService['display-name'],
            };
            slices.applications.splice(serviceIndex, 1, serviceInfo);
          }
        });
      });
    });
    this.remainingDeviceGroups = remainingDeviceGroups;
    this.remainingServices = remainingServices;
  }

  createNewSlicesFun(): void {
    this.closeExpand();
    this.closeEditView();
    this.newFormGroup();
    this.createNewSlices = true;
  }

  expandTrigger(index: number): void {
    this.createNewSlices = false;
    this.closeExpand();
    const expandSlicesIndex = this.expandSlices.indexOf(index);
    if (expandSlicesIndex >= 0) {
      this.expandSlices.splice(expandSlicesIndex, 1);
    } else {
      this.expandSlices.push(index);
    }
  }

  closeExpand(): void {
    this.closeListView();
    this.expandSlices.pop();
  }

  getTotalDevices(data: DeviceGroup[]): number {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      count = data[i].devices.length + count;
    }
    return count;
  }

  listViewTrigger(index: number): void {
    this.closeListView();
    const listViewIndex = this.listViewSlices.indexOf(index);
    if (listViewIndex >= 0) {
      this.listViewSlices.splice(listViewIndex, 1);
    } else {
      this.listViewSlices.push(index);
    }
  }

  closeListView(): void {
    this.listViewSlices.pop();
  }

  editTrigger(index: number): void {
    this.createNewSlices = false;
    this.closeEditView();
    this.closeExpand();
    const editSlicesIndex = this.editSlices.indexOf(index);
    if (editSlicesIndex >= 0) {
      this.editSlices.splice(editSlicesIndex, 1);
    } else {
      this.siteSlices[index].form = new FormGroup({
        sliceName: new FormControl(this.siteSlices[index]['display-name']),
        sliceType: new FormControl(this.siteSlices[index]['slice-type']),
        mbr: new FormControl(this.siteSlices[index].mbr),
        gbr: new FormControl(this.siteSlices[index].gbr),
        trafficClass: new FormControl(this.siteSlices[index]['traffic-class']),
        uplink: new FormControl(this.siteSlices[index].uplink),
        downlink: new FormControl(this.siteSlices[index].downlink),
      });
      this.editSlices.push(index);
    }
  }

  closeEditView(): void {
    this.editSlices.pop();
  }

  getEditControl(slicesEditForm: FormGroup, param: string): FormControl {
    return slicesEditForm.get(param) as FormControl;
  }

  onEdit(sliceIndex: number): void {
    const slice = this.siteSlices[sliceIndex];
    const editForm = this.siteSlices[sliceIndex].form.value;
    slice['display-name'] = editForm.sliceName;
    slice['slice-type'] = editForm.sliceType;
    slice.mbr = editForm.mbr;
    slice.gbr = editForm.gbr;
    slice['traffic-class'] = editForm.trafficClass;
    slice.uplink = editForm.uplink;
    slice.downlink = editForm.downlink;
    for (
      let selectedIndex = 0;
      selectedIndex < this.selectedAddDeviceGroups.length;
      selectedIndex++
    ) {
      slice['device-groups'].push(this.selectedAddDeviceGroups[selectedIndex]);
      for (
        let inventoryIndex = 0;
        inventoryIndex < this.deviceGroupsInventory.length;
        inventoryIndex++
      ) {
        /* istanbul ignore else*/
        if (
          this.deviceGroupsInventory[inventoryIndex]['device-group-id'] ==
          this.selectedAddDeviceGroups[selectedIndex]['device-group-id']
        ) {
          this.deviceGroupsInventory.splice(inventoryIndex, 1);
        }
      }
    }
    this.selectedAddDeviceGroups.splice(0, this.selectedAddDeviceGroups.length);
    this.editAddDeviceGroup = false;
    for (
      let selectedIndex = 0;
      selectedIndex < this.selectedAddServices.length;
      selectedIndex++
    ) {
      slice.applications.push(this.selectedAddServices[selectedIndex]);
      for (
        let inventoryIndex = 0;
        inventoryIndex < this.servicesInventory.length;
        inventoryIndex++
      ) {
        /* istanbul ignore else*/
        if (
          this.servicesInventory[inventoryIndex]['application-id'] ==
          this.selectedAddServices[selectedIndex]['application-id']
        ) {
          this.servicesInventory.splice(inventoryIndex, 1);
        }
      }
    }
    this.selectedAddServices.splice(0, this.selectedAddServices.length);
    this.editAddServices = false;
    this.closeEditView();
  }

  deleteDeviceGroups(sliceIndex: number, deviceGroupIndex: number): void {
    this.siteSlices[sliceIndex]['device-groups'][deviceGroupIndex].selected = 0;
    this.deviceGroupsInventory.push(
      this.siteSlices[sliceIndex]['device-groups'][deviceGroupIndex]
    );
    this.siteSlices[sliceIndex]['device-groups'].splice(deviceGroupIndex, 1);
  }

  deleteServices(sliceIndex: number, serviceIndex: number): void {
    this.siteSlices[sliceIndex].applications[serviceIndex].selected = 0;
    this.servicesInventory.push(
      this.siteSlices[sliceIndex].applications[serviceIndex]
    );
    this.siteSlices[sliceIndex].applications.splice(serviceIndex, 1);
  }

  deleteSlice(sliceIndex: number): void {
    if (this.siteSlices[sliceIndex] !== undefined) {
      if ('device-groups' in this.siteSlices[sliceIndex]) {
        const deviceGroupInfo = this.siteSlices[sliceIndex]['device-groups'];
        const serviceInfo = this.siteSlices[sliceIndex].applications;
        serviceInfo.selected = 1;
        this.remainingDeviceGroups.push(deviceGroupInfo);
        for (let i = 0; i < this.remainingDeviceGroups.length; i++) {
          this.remainingDeviceGroups[i].selected = 1;
        }
        this.remainingServices.push(serviceInfo);
        this.siteSlices.splice(sliceIndex, 1);
      }
    }
  }

  changeSelectionAddDeviceGroups(
    id: string,
    name: string,
    devices: string[],
    deviceGroupsIndex: number
  ): void {
    if (this.deviceGroupsInventory[deviceGroupsIndex].selected == 0) {
      this.deviceGroupsInventory[deviceGroupsIndex].selected = 1;
      const selectedAddDeviceGroupInfo = {
        'device-group-id': id,
        devices: devices,
        'display-name': name,
        selected: 1,
      };
      this.selectedAddDeviceGroups.push(selectedAddDeviceGroupInfo);
    } else {
      this.deviceGroupsInventory[deviceGroupsIndex].selected = 0;
      for (let i = 0; i < this.selectedAddDeviceGroups.length; i++) {
        /* istanbul ignore else*/
        if (this.selectedAddDeviceGroups[i]['device-group-id'] == id) {
          this.selectedAddDeviceGroups.splice(i, 1);
        }
      }
    }
  }

  changeSelectionAddServices(
    id: string,
    name: string,
    serviceIndex: number
  ): void {
    if (this.servicesInventory[serviceIndex].selected == 0) {
      this.servicesInventory[serviceIndex].selected = 1;
      const selectedAddServiceInfo = {
        'application-id': id,
        'display-name': name,
        selected: 1,
      };
      this.selectedAddServices.push(selectedAddServiceInfo);
    } else {
      this.servicesInventory[serviceIndex].selected = 0;
      for (let i = 0; i < this.selectedAddServices.length; i++) {
        /* istanbul ignore else*/
        if (this.selectedAddServices[i]['application-id'] == id) {
          this.selectedAddServices.splice(i, 1);
        }
      }
    }
  }

  openDeleteDialog(sliceIndex: number): void {
    const dialogRef = this.dialog.open(DeleteSlicesComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore else*/
      if (result == 'true') {
        this.deleteSlice(sliceIndex);
      }
      this.closeEditView();
    });
  }

  calculateSVGHeight(slices: unknown): number {
    const minimumHeight = 135;
    let deviceGroupsHeight = 25;
    let servicesHeight = 25;
    slices['device-groups'].forEach(() => {
      deviceGroupsHeight += 72;
    });
    slices['applications'].forEach(() => {
      servicesHeight += 72;
    });
    /* istanbul ignore else*/
    if (deviceGroupsHeight < minimumHeight && servicesHeight < minimumHeight) {
      return minimumHeight;
    }
    /* istanbul ignore else*/
    if (deviceGroupsHeight > servicesHeight) {
      return deviceGroupsHeight;
    } else {
      return servicesHeight;
    }
  }

  calculateVerticalPosition(index: number): number {
    return 60 + index * 70;
  }
}
