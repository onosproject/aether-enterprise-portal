/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDevicegroupsComponent } from '../dialogs/delete-devicegroups/delete-devicegroups.component';
import { MatStepper } from '@angular/material/stepper';

import { DeviceGroupsHelperService } from './device-groups-helper.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

// * model imports
import { SelectedDevice as selectedDeviceModel } from 'src/app/models/selected-device.model';
import { InventoryDevice as inventoryDevice } from 'src/app/models/inventory-device.model';
import { DeviceGroupSummary as deviceGroupSummary } from 'src/app/models/device-group-summary.model';

@Component({
  selector: 'aep-device-groups',
  templateUrl: './device-groups.component.html',
  styleUrls: [],
})
export class DeviceGroupsComponent implements OnInit {
  expandDeviceGroups: number[] = [];

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  addNewdeviceGroupForm: boolean = false;
  expandId: boolean = true;
  hideRightBx: boolean = true;
  panelOpenState = false;
  editDeviceGroupForm: boolean = false;
  editAddDeviceGroup: boolean = false;
  isLinear = false;

  selectedSite: string = '';

  siteSubscription: Subscription;

  siteDeviceGroups = [];

  siteDevices = [];

  deviceInventory: inventoryDevice[] = [
    {
      'display-name': 'Phone 20',
      imei: '098-765-4321',
      location: 'Basement 1',
      selected: 0,
      'serial-number': '098765A',
      sim: '098-765-432',
      type: 'Phone',
    },
    {
      'display-name': 'Phone 21',
      imei: '098-765-4331',
      location: 'Basement 2',
      selected: 0,
      'serial-number': '098765B',
      sim: '098-765-433',
      type: 'Phone',
    },
    {
      'display-name': 'Phone 22',
      imei: '098-765-4341',
      location: 'Basement 3',
      selected: 0,
      'serial-number': '098765C',
      sim: '098-765-434',
      type: 'Phone',
    },
    {
      'display-name': 'Phone 23',
      imei: '098-765-4351',
      location: 'Basement 4',
      selected: 0,
      'serial-number': '098765D',
      sim: '098-765-435',
      type: 'Phone',
    },
    {
      'display-name': 'Phone 24',
      imei: '098-765-4361',
      location: 'Basement 5',
      selected: 0,
      'serial-number': '098765E',
      sim: '098-765-436',
      type: 'Phone',
    },
    {
      'display-name': 'Camera 20',
      imei: '099-765-4371',
      location: 'Floor 10',
      selected: 0,
      'serial-number': '099765A',
      sim: '099-765-437',
      type: 'Camera',
    },
    {
      'display-name': 'Camera 21',
      imei: '099-765-4381',
      location: 'Floor 12',
      selected: 0,
      'serial-number': '099765B',
      sim: '099-765-438',
      type: 'Camera',
    },
    {
      'display-name': 'Camera 22',
      imei: '099-765-4391',
      location: 'Floor 13',
      selected: 0,
      'serial-number': '099765C',
      sim: '099-765-439',
      type: 'Camera',
    },
    {
      'display-name': 'Camera 23',
      imei: '099-765-4401',
      location: 'Floor 14',
      selected: 0,
      'serial-number': '099765D',
      sim: '099-765-440',
      type: 'Camera',
    },
    {
      'display-name': 'Camera 24',
      imei: '099-765-4411',
      location: 'Floor 15',
      selected: 0,
      'serial-number': '099765E',
      sim: '099-765-441',
      type: 'Camera',
    },
  ];

  domainList: string[] = [
    '128.137.51.006',
    '162.153.31.005',
    '191.136.32.003',
    '196.125.23.002',
    '198.123.21.001',
  ];

  summaryBool = false;

  summaryArray: deviceGroupSummary[] = [];

  config = [];

  selectedDevices: selectedDeviceModel[] = [];

  editDeviceGroup: number[] = [];

  selectedAddDevices: selectedDeviceModel[] = [];

  remainingDevices = [];

  editDeviceGroupFormFun(): void {
    this.editDeviceGroupForm = true;
    // this.hideRightBx = false;
  }
  editDeviceGroupFormFunClose(): void {
    this.editDeviceGroupForm = false;
    // this.hideRightBx = true;
  }
  editAddDeviceGroupFun(): void {
    this.editAddDeviceGroup = true;
  }

  hideRightBxFn(): void {
    //this.hideRightBx = false;
    this.panelOpenState = true;
  }

  addNewdeviceGroupFormFun(): void {
    this.newFormGroup();
    this.addNewdeviceGroupForm = true;
  }
  addNewdeviceGroupFormClose(): void {
    this.addNewdeviceGroupForm = false;
  }
  collapseSlice(): void {
    this.panelOpenState = true;
    this.hideRightBx = true;
  }
  openContent: boolean = false;
  openPanel(): void {
    this.panelOpenState = false;
    this.hideRightBx = false;
    this.openContent = true;
  }

  // forms
  firstFormGroup = new FormGroup({});

  secondFormGroup = new FormGroup({});

  addNewDeviceGroupError: boolean = false;

  firstFormError: boolean = false;

  firstFormComplete: boolean = false;

  editDeviceGroupError: boolean = false;

  deviceGroupEditForm = new FormGroup({});

  constructor(
    public deviceService: DeviceSimService,
    public dialog: MatDialog,
    public deviceGroupsHelper: DeviceGroupsHelperService,
    public globalService: GlobalDataService
  ) {}

  ngOnInit(): void {
    this.assignSelectedSite();
  }

  changeSelection(
    name: string,
    imei: string,
    location: string,
    serialNumber: string,
    simNumber: string,
    type: string,
    deviceIndex: number
  ): void {
    if (this.deviceInventory[deviceIndex].selected == 0) {
      this.deviceInventory[deviceIndex].selected = 1;
      const selectedDeviceInfo = {
        'display-name': name,
        imei: imei,
        location: location,
        'serial-number': serialNumber,
        sim: simNumber,
        type: type,
        selected: 1,
      };
      this.selectedDevices.push(selectedDeviceInfo);
      console.log(this.selectedDevices);
    } else {
      this.deviceInventory[deviceIndex].selected = 0;
      for (let i = 0; i < this.selectedDevices.length; i++) {
        if (this.selectedDevices[i]['serial-number'] == serialNumber) {
          this.selectedDevices.splice(i, 1);
        }
      }
    }
  }

  newFormGroup(): void {
    this.firstFormError = false;
    this.addNewDeviceGroupError = false;
    this.firstFormGroup = new FormGroup({
      newDeviceGroup: new FormControl('', Validators.required),
      newIpDomain: new FormControl('', Validators.required),
      newDescription: new FormControl('', Validators.required),
    });
  }

  summaryTrigger(): void {
    this.summaryBool = true;
    this.summaryArray.push({
      summaryDeviceGroupName: this.firstFormGroup.value.newDeviceGroup,
      summaryIpDomain: this.firstFormGroup.value.newIpDomain,
      summaryDescription: this.firstFormGroup.value.newDescription,
    });
  }

  emptySummaryArray(): void {
    this.summaryBool = false;
    this.summaryArray.splice(0, this.summaryArray.length);
  }

  emptySelectedDevices(): void {
    this.selectedDevices.splice(0, this.selectedDevices.length);
  }

  firstFormNext(): void {
    this.firstFormError = false;
    /* istanbul ignore else */
    if (this.firstFormGroup.invalid) {
      this.firstFormError = true;
    }
    /* istanbul ignore else */
    if (this.firstFormGroup.valid) {
      this.firstFormComplete = true;

      this.stepper.selectedIndex = 1;
    }
  }

  addNewDeviceG(): void {
    this.addNewDeviceGroupError = false;
    /* istanbul ignore else */
    if (this.firstFormGroup.invalid) {
      this.addNewDeviceGroupError = true;
    }
    /* istanbul ignore else */

    if (this.firstFormGroup.valid) {
      const selectedDevices = [];
      this.selectedDevices.forEach((device) => {
        selectedDevices.push(device);
      });
      this.siteDeviceGroups[0].push({
        'display-name': this.summaryArray[0].summaryDeviceGroupName + 'Group',
        description: this.summaryArray[0].summaryDescription,
        ipDomain: this.summaryArray[0].summaryIpDomain,
        devices: selectedDevices,
      });
      for (
        let selectedIndex = 0;
        selectedIndex < this.selectedDevices.length;
        selectedIndex++
      ) {
        for (
          let inventoryIndex = 0;
          inventoryIndex < this.deviceInventory.length;
          inventoryIndex++
        ) {
          for (
            let domainIndex = 0;
            domainIndex < this.domainList.length;
            domainIndex++
          ) {
            if (
              this.deviceInventory[inventoryIndex]['serial-number'] ==
              this.selectedDevices[selectedIndex]['serial-number']
            ) {
              this.deviceInventory.splice(inventoryIndex, 1);
            }
          }
        }
      }
      this.selectedDevices.splice(0, this.selectedDevices.length);
      this.emptySummaryArray();
      this.addNewdeviceGroupForm = !this.addNewdeviceGroupForm;
      this.emptySelectedDevices();
      this.addNewdeviceGroupForm = false;
    }
  }

  assignSelectedSite(): void {
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      this.selectedSite = data;
      this.fetchData();
    });
  }

  activatedDevices = [];

  fetchData(): void {
    this.deviceService.getData().subscribe((result) => {
      const configArray = [];
      configArray.push(result);
      this.config = configArray;
      configArray.map((item) => {
        const sitesDevicesGroups = [];
        const sitesConfig = item.sites;
        const sitesDevices = [];
        sitesConfig.map((site) => {
          /* istanbul ignore else */
          if (site['site-id'] === this.selectedSite) {
            sitesDevicesGroups.push(site['device-groups']);
            sitesDevicesGroups[0].forEach((deviceGroup) => {
              deviceGroup.ipDomain = '162.153.31.005';
              deviceGroup.description =
                'This is the default description of the current device group.';
            });
          }
          /* istanbul ignore else */
          if (site['site-id'] === this.selectedSite) {
            sitesDevices.push(site.devices);
            sitesDevices.forEach((siteDevice) => {
              siteDevice.forEach((singleDevice) => {
                singleDevice.selected = 1;
              });
            });
          }
        });
        this.siteDevices = sitesDevices;
        this.siteDeviceGroups = sitesDevicesGroups;
        this.dataConvert();
      });
    });
  }

  dataConvert(): void {
    this.siteDeviceGroups.forEach((deviceGroups) => {
      deviceGroups.forEach((deviceGroup) => {
        deviceGroup.devices.forEach((groupedDevice, groupedDeviceIndex) => {
          this.siteDevices.forEach((siteDevices) => {
            siteDevices.forEach((siteDevice, siteDeviceIndex) => {
              if (
                deviceGroup.devices[groupedDeviceIndex] ==
                siteDevices[siteDeviceIndex]['serial-number']
              ) {
                const deviceInfo = {
                  'display-name': siteDevices[siteDeviceIndex]['display-name'],
                  location: siteDevices[siteDeviceIndex].location,
                  'serial-number':
                    siteDevices[siteDeviceIndex]['serial-number'],
                };
                deviceGroup.devices.splice(groupedDeviceIndex, 1, deviceInfo);
              } else {
                const remainingDevices = [];
                const deviceInfo = {
                  'display-name': siteDevices[siteDeviceIndex]['display-name'],
                  location: siteDevices[siteDeviceIndex].location,
                  'serial-number':
                    siteDevices[siteDeviceIndex]['serial-number'],
                };
                remainingDevices.push({ deviceInfo });
                this.remainingDevices = remainingDevices;
              }
            });
          });
        });
      });
    });
  }

  expandTrigger(deviceGroupIndex: number): void {
    this.closeExpand();
    const expandDeviceGroupIndex =
      this.expandDeviceGroups.indexOf(deviceGroupIndex);
    if (expandDeviceGroupIndex >= 0) {
      this.expandDeviceGroups.splice(deviceGroupIndex, 1);
    } else {
      this.expandDeviceGroups.push(deviceGroupIndex);
    }
  }

  closeExpand(): void {
    this.expandDeviceGroups.pop();
  }

  editTrigger(index: number): void {
    this.closeEdit();
    const editDeviceGroupIndex = this.editDeviceGroup.indexOf(index);
    if (editDeviceGroupIndex >= 0) {
      this.editDeviceGroup.splice(editDeviceGroupIndex, 1);
    } else {
      this.siteDeviceGroups[0][index].form = new FormGroup({
        newDeviceGroup: new FormControl(
          this.siteDeviceGroups[0][index]['display-name'],
          Validators.required
        ),
        newIpDomain: new FormControl(
          this.siteDeviceGroups[0][index].ipDomain,
          Validators.required
        ),
        newDescription: new FormControl(
          this.siteDeviceGroups[0][index].description,
          Validators.required
        ),
      });
      this.editDeviceGroup.push(index);
      this.deviceGroupEditForm = this.siteDeviceGroups[0][index].form;
      console.log(this.siteDeviceGroups[0][index]);
    }
  }

  closeEdit(): void {
    this.editDeviceGroup.pop();
  }

  getEditControl(deviceGroupEditForm: FormGroup, param: string): FormControl {
    return deviceGroupEditForm.get(param) as FormControl;
  }

  deleteDevicesInGroups(groupIndex: number, deviceIndex: number): void {
    this.siteDeviceGroups[0][groupIndex].devices.splice(deviceIndex, 1);
  }

  changeSelectionAddDevices(
    name: string,
    imei: string,
    location: string,
    serialNumber: string,
    simNumber: string,
    type: string,
    deviceIndex: number
  ): void {
    if (this.deviceInventory[deviceIndex].selected == 0) {
      this.deviceInventory[deviceIndex].selected = 1;
      const selectedAddDeviceInfo: selectedDeviceModel = {
        'display-name': name,
        imei: imei,
        location: location,
        'serial-number': serialNumber,
        sim: simNumber,
        type: type,
        selected: 1,
      };
      this.selectedAddDevices.push(selectedAddDeviceInfo);
      console.log(selectedAddDeviceInfo, this.selectedAddDevices);
    } else {
      this.deviceInventory[deviceIndex].selected = 0;
      for (let i = 0; i < this.selectedAddDevices.length; i++) {
        if (this.selectedAddDevices[i]['serial-number'] == serialNumber) {
          this.selectedAddDevices.splice(i, 1);
          console.log(this.selectedAddDevices);
        }
      }
    }
  }

  onEdit(deviceGroupIndex: number): void {
    this.editDeviceGroupError = false;
    if (this.deviceGroupEditForm.invalid) {
      this.editDeviceGroupError = true;
    } else {
      const deviceGroup = this.siteDeviceGroups[0][deviceGroupIndex];
      const editForm = this.siteDeviceGroups[0][deviceGroupIndex].form.value;
      deviceGroup['display-name'] = editForm.newDeviceGroup;
      deviceGroup.ipDomain = editForm.newIpDomain;
      deviceGroup.description = editForm.newDescription;
      for (
        let selectedIndex = 0;
        selectedIndex < this.selectedAddDevices.length;
        selectedIndex++
      ) {
        deviceGroup.devices.push(this.selectedAddDevices[selectedIndex]);
        for (
          let inventoryIndex = 0;
          inventoryIndex < this.deviceInventory.length;
          inventoryIndex++
        ) {
          /* istanbul ignore else */
          if (
            this.deviceInventory[inventoryIndex]['serial-number'] ==
            this.selectedAddDevices[selectedIndex]['serial-number']
          ) {
            this.deviceInventory.splice(inventoryIndex, 1);
          }
        }
      }
      this.selectedAddDevices.splice(0, this.selectedAddDevices.length);
      this.editAddDeviceGroup = false;
      this.closeEdit();
    }
  }

  deleteDeviceGroup(deviceGroupIndex: number): void {
    this.siteDeviceGroups[0].splice(deviceGroupIndex, 1);
  }

  openDeleteDeviceGroupDialog(deviceGroupIndex: number): void {
    const dialogRef = this.dialog.open(DeleteDevicegroupsComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore else */
      if (result == 'true') {
        this.deleteDeviceGroup(deviceGroupIndex);
      }
      this.closeEdit();
    });
  }
}
