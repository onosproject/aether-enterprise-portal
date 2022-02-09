/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { DeviceSimService } from 'src/app/services/device-sim.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSlicesComponent } from '../dialogs/delete-slices/delete-slices.component';

@Component({
  selector: 'aep-slices1',
  templateUrl: './slices.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 500, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 500, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  styles: [],
})
export class SlicesComponent implements OnInit {
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
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  summaryForm: FormGroup;

  editMissionCriticalSlices(): void {
    this.editMissionCriticalSlicesForm = true;
    this.editMissionCriticalSliceForm = true;
    // this.headerContent = false;
    // this.hideRightBx = false;
  }
  editMissionCriticalSlicesClose(): void {
    this.editMissionCriticalSlicesForm = false;
    this.editMissionCriticalSliceForm = false;
    // this.headerContent = true;
    // this.hideRightBx = true;
  }
  editAddDeviceGroupFun(): void {
    this.editAddDeviceGroup = true;
  }
  editAddServicesFun(): void {
    this.editAddServices = true;
  }
  collapseSlice(): void {
    this.panelOpenState = true;
    this.hideRightBx = true;
  }
  openPanel1(): void {
    //this.panelOpenState = false;
    //this.hideRightBx = false;
    this.detailsContent = true;
    this.headerContent = false;
  }

  detailsclose(): void {
    this.detailsContent = false;
    this.headerContent = true;
  }

  constructor(
    private _formBuilder: FormBuilder,
    public deviceService: DeviceSimService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({

    //   firstCtrl: ['', Validators.required],
    // });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.assignSelectedSite();
  }

  config: any[] = [];

  siteDeviceGroups: any[] = [];

  numOfDeviceGroups: number = 0;

  totalDevicesArray: any[] = [];

  siteSlices: any[] = [];

  siteServices: any[] = [];

  siteSubscription: Subscription;

  selectedSite: any = '';

  selectedDeviceGroups: any[] = [];

  selectedServices: any[] = [];

  remainingDeviceGroups: any[] = [];

  deviceGroupsInventory: any[] = [
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

  servicesInventory: any[] = [
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

  remainingServices: any[] = [];

  expandSlices: number[] = [];

  listViewSlices: number[] = [];

  editSlices: number[] = [];

  selectedAddDeviceGroups: any[] = [];

  selectedAddServices: any[] = [];

  summaryArray: any[] = [];

  summaryBool: boolean = false;

  // dropdowns arrays
  sliceTypes: any[] = ['cameras', 'sensors', 'phones'];
  maximumBitRate: number[] = [1, 5, 10];
  guaranteedBitRate: number[] = [1, 5, 10];
  trafficClass: any[] = ['Sensitive', 'Best-Effort', 'Undesired'];
  uplink: any[] = ['5-6 GHz', '14-14.5 GHz', '27-31 GHz'];
  downlink: any[] = ['3-4 GHz', '11-12 GHz', '17-21 GHz'];

  // formGroups
  firstFormGroup = new FormGroup({
    sliceName: new FormControl('', Validators.required),
    sliceType: new FormControl('', Validators.required),
    mbr: new FormControl('', Validators.required),
    gbr: new FormControl('', Validators.required),
    trafficClass: new FormControl('', Validators.required),
    uplink: new FormControl('', Validators.required),
    downlink: new FormControl('', Validators.required),
  });

  summaryTrigger(): any {
    this.summaryBool = true;
    //console.log(this.summaryArray);
    this.summaryArray.push({
      summarySliceName: this.firstFormGroup.value.sliceName,
      summarySliceType: this.firstFormGroup.value.sliceType,
      summaryDownlink: this.firstFormGroup.value.downlink,
      summaryUplink: this.firstFormGroup.value.uplink,
      summaryTrafficClass: this.firstFormGroup.value.trafficClass,
      summarymbr: this.firstFormGroup.value.mbr,
      summarygbr: this.firstFormGroup.value.gbr,
    });
    this.summaryArray[0].form = new FormGroup({
      sliceName: new FormControl(this.summaryArray[0].summarySliceName),
      sliceType: new FormControl(this.summaryArray[0].summarySliceType),
      mbr: new FormControl(this.summaryArray[0].summarymbr),
      gbr: new FormControl(this.summaryArray[0].summarygbr),
      trafficClass: new FormControl(this.summaryArray[0].summaryTrafficClass),
      uplink: new FormControl(this.summaryArray[0].summaryUplink),
      downlink: new FormControl(this.summaryArray[0].summaryDownlink),
    });
    //console.log(this.summaryArray[0].summarySliceType);
  }

  emptySummaryArray(): any {
    this.summaryBool = false;
    this.summaryArray.splice(0, this.summaryArray.length);
  }

  getSummaryControl(summaryForm: FormGroup, param: string): FormControl {
    return summaryForm.get(param) as FormControl;
  }

  changeSelectionDeviceGroups(
    id: string,
    name: string,
    devices: any[],
    deviceGroupIndex: number
  ): void {
    //console.log(this.siteDeviceGroups[0][deviceGroupIndex], id);
    if (this.deviceGroupsInventory[deviceGroupIndex].selected == 0) {
      // //console.log("if")
      this.deviceGroupsInventory[deviceGroupIndex].selected = 1;
      const selectedDeviceGroupInfo: any = {
        'device-group-id': id,
        devices: devices,
        'display-name': name,
        selected: 1,
      };
      this.selectedDeviceGroups.push(selectedDeviceGroupInfo);
    } else {
      // //console.log("else")
      this.deviceGroupsInventory[deviceGroupIndex].selected = 0;
      for (let i = 0; i < this.selectedDeviceGroups.length; i++) {
        //console.log(i);
        if (this.selectedDeviceGroups[i]['device-group-id'] == id) {
          // //console.log(this.selectedDeviceGroups[i]['device-group-id'])
          this.selectedDeviceGroups.splice(i, 1);
        }
      }
    }
    //console.log(this.selectedDeviceGroups);
  }

  deleteSummaryDeviceGroups(deviceGroupIndex: number): any {
    //console.log(this.selectedDeviceGroups);
    this.selectedDeviceGroups.splice(deviceGroupIndex, 1);
    //console.log(this.selectedDeviceGroups);
  }

  changeSelectionServices(
    id: string,
    name: string,
    serviceIndex: number
  ): void {
    if (this.servicesInventory[serviceIndex].selected == 0) {
      this.servicesInventory[serviceIndex].selected = 1;
      const selectedServiceInfo: any = {
        'application-id': id,
        'display-name': name,
        selected: 1,
      };
      this.selectedServices.push(selectedServiceInfo);
    } else {
      this.servicesInventory[serviceIndex].selected = 1;
      for (let i = 0; i < this.selectedServices.length; i++) {
        if (this.selectedServices[i]['application-id'] == id) {
          this.selectedServices.splice(i, 1);
        }
      }
    }
    //console.log(this.selectedServices);
  }

  deleteSummaryServices(serviceIndex: number): any {
    //console.log(this.selectedServices);
    this.selectedServices.splice(serviceIndex, 1);
    //console.log(this.selectedServices);
  }

  onSubmit(): void {
    const applications: any[] = [];
    const deviceGroups: any[] = [];
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
      'traffic-class': this.firstFormGroup.value.trafficClass,
      mbr: this.firstFormGroup.value.mbr,
      gbr: this.firstFormGroup.value.gbr,
    });
    for (
      let selectedIndex = 0;
      selectedIndex < this.selectedDeviceGroups.length;
      selectedIndex++
    ) {
      // slice['device-groups'].push(this.selectedAddDeviceGroups[selectedIndex]);
      for (
        let inventoryIndex = 0;
        inventoryIndex < this.deviceGroupsInventory.length;
        inventoryIndex++
      ) {
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
      // slice['device-groups'].push(this.selectedAddDeviceGroups[selectedIndex]);
      for (
        let inventoryIndex = 0;
        inventoryIndex < this.servicesInventory.length;
        inventoryIndex++
      ) {
        if (
          this.servicesInventory[inventoryIndex]['application-id'] ==
          this.selectedServices[selectedIndex]['application-id']
        ) {
          this.servicesInventory.splice(inventoryIndex, 1);
        }
      }
    }
    this.selectedServices.splice(0, this.selectedServices.length);
    //console.log(this.selectedDeviceGroups, this.deviceGroupsInventory);
    //console.log(this.siteSlices);
    this.emptySummaryArray();
    this.firstFormGroup.reset();
    this.createNewSlices = false;
  }

  assignSelectedSite(): any {
    //console.log(this.deviceService.mySite1);
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      // //console.log(data);
      this.selectedSite = data;
      //console.log(this.selectedSite);
      this.fetchData();
    });
  }

  fetchData(): any {
    this.createNewSlices = false;
    this.closeExpand();
    this.closeListView();
    this.deviceService.getData().subscribe((result) => {
      const configArray: any[] = [];
      configArray.push(result);
      this.config = configArray;
      configArray.map((item) => {
        const sitesSlices: any[] = [];
        const sitesDevicesGroups: any[] = [];
        const sitesServices = item.applications;
        const sitesConfig = item.sites;
        sitesConfig.map((site) => {
          if (site['site-id'] === this.selectedSite) {
            sitesDevicesGroups.push(site['device-groups']);
            sitesDevicesGroups.forEach((siteDeviceGroup) => {
              //console.log(siteDeviceGroup);
              siteDeviceGroup.forEach(
                (singleDeviceGroup, singleDeviceGroupIndex) => {
                  siteDeviceGroup[singleDeviceGroupIndex].selected = 1;
                }
              );
            });
            sitesServices.forEach((service, serviceIndex) => {
              //console.log(service, serviceIndex);
              sitesServices[serviceIndex].selected = 1;
            });
            // //console.log(
            //   'This is Local site-deviceGroups array',
            //   this.selectedSite,
            //   sitesDevicesGroups
            // );
            // //console.log(site.slices)
            site.slices.map((slices) => {
              sitesSlices.push(slices);
              // //console.log(
              //   'This is local site-slices Array',
              //   this.selectedSite,
              //   sitesSlices
              // );
            });
          }
        });
        this.siteSlices = sitesSlices;
        this.siteServices = sitesServices;
        this.siteDeviceGroups = sitesDevicesGroups;
        this.dataConvert();
        // const totalDevicesArray: any[] = [];
        // sitesSlices.map((slices) => {
        //   totalDevicesArray.push(...slices['device-groups'][0].devices);
        //   //console.log(totalDevicesArray);
        // });
        //console.log(this.siteServices);
        //console.log(this.siteDeviceGroups);
        //console.log(this.siteSlices);
        // //console.log(this.config);
        // this.totalDevicesArray = totalDevicesArray
      });
    });
    // //console.log(this.totalDevicesArray);
  }

  dataConvert(): any {
    const remainingDeviceGroups: any[] = [];
    const remainingServices: any[] = [];
    this.siteSlices.forEach((slices) => {
      //console.log(slices, slicesIndex);
      //console.log(slices['device-groups']);
      //console.log(slices.applications);

      slices['device-groups'].forEach(
        (sliceDeviceGroups, sliceDeviceGroupsIndex) => {
          //console.log(sliceDeviceGroups, sliceDeviceGroupsIndex);
          this.siteDeviceGroups.forEach((deviceGroups) => {
            //console.log(deviceGroups, deviceGroupsIndex);
            deviceGroups.forEach((deviceGroup) => {
              // //console.log(deviceGroups[deviceGroupIndex]['device-group-id'])
              //console.log(deviceGroup['device-group-id'], deviceGroupIndex);
              if (sliceDeviceGroups == deviceGroup['device-group-id']) {
                slices['slice-type'] = sliceDeviceGroups;
                slices['mbr'] = 5;
                slices['gbr'] = 10;
                slices['traffic-class'] = 'Sensitive';
                slices['uplink'] = '5-6 GHz';
                slices['downlink'] = '11-12 GHz';
                const deviceGroupInfo: any = {
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
              // } if (sliceDeviceGroups !== deviceGroup['device-group-id']) {
              //   const deviceGroupInfo: any = {
              //     'device-group-id': deviceGroup['device-group-id'],
              //     devices: deviceGroup.devices,
              //     'display-name': deviceGroup['display-name'],
              //   };
              //   remainingDeviceGroups.push({ deviceGroupInfo });
              // }
            });
          });
        }
      );

      slices.applications.forEach((service, serviceIndex) => {
        //console.log(service, serviceIndex);
        this.siteServices.forEach((siteService) => {
          //console.log(siteService['application-id'], siteServiceIndex);
          if (service == siteService['application-id']) {
            //console.log(slices.applications[serviceIndex]);
            //console.log('yes');

            const serviceInfo: any = {
              'application-id': siteService['application-id'],
              'display-name': siteService['display-name'],
            };
            slices.applications.splice(serviceIndex, 1, serviceInfo);
          }
          // } else {
          //   const serviceInfo: any = {
          //     'application-id': siteService['application-id'],
          //     'display-name': siteService['display-name'],
          //   };
          //   remainingServices.push({ serviceInfo });
          // }
        });
        // if (service == )
      });
    });
    this.remainingDeviceGroups = remainingDeviceGroups;
    this.remainingServices = remainingServices;
  }

  createNewSlicesFun(): void {
    this.closeExpand();
    this.closeEditView();
    this.createNewSlices = true;
  }

  expandTrigger(index: number): any {
    this.createNewSlices = false;
    this.closeExpand();
    const expandSlicesIndex = this.expandSlices.indexOf(index);
    if (expandSlicesIndex >= 0) {
      this.expandSlices.splice(expandSlicesIndex, 1);
    } else {
      this.expandSlices.push(index);
    }
  }

  closeExpand(): any {
    this.closeListView();
    this.expandSlices.pop();
  }

  getTotalDevices(data: any[]): number {
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

  closeListView(): any {
    this.listViewSlices.pop();
  }

  editTrigger(index: number): any {
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
    //console.log(
    //   this.siteSlices[index]['slice-type'],
    //   this.siteSlices[index]['traffic-class']
    // );
  }

  closeEditView(): any {
    //console.log(this.siteSlices);
    this.editSlices.pop();
  }

  getEditControl(slicesEditForm: FormGroup, param: string): FormControl {
    return slicesEditForm.get(param) as FormControl;
  }

  onEdit(sliceIndex: number): any {
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
    //console.log(this.siteSlices);
  }

  deleteDeviceGroups(sliceIndex: number, deviceGroupIndex: number): any {
    //console.log(this.siteSlices[sliceIndex]['device-groups'][deviceGroupIndex]);
    this.siteSlices[sliceIndex]['device-groups'].splice(deviceGroupIndex, 1);
  }

  deleteServices(sliceIndex: number, serviceIndex: number): any {
    //console.log(this.siteSlices[sliceIndex].applications[serviceIndex]);
    this.siteSlices[sliceIndex].applications.splice(serviceIndex, 1);
  }

  deleteSlice(sliceIndex: number): any {
    const deviceGroupInfo = this.siteSlices[sliceIndex]['device-groups'];
    //console.log(deviceGroupInfo);
    const serviceInfo = this.siteSlices[sliceIndex].applications;

    // deviceGroupInfo.selected = 1;
    serviceInfo.selected = 1;
    this.remainingDeviceGroups.push(deviceGroupInfo);
    for (let i = 0; i < this.remainingDeviceGroups.length; i++) {
      this.remainingDeviceGroups[i].selected = 1;
    }
    this.remainingServices.push(serviceInfo);
    this.siteSlices.splice(sliceIndex, 1);
    // //console.log(
    //   this.siteSlices,
    //   this.remainingDeviceGroups,
    //   this.remainingServices
    // );
  }

  changeSelectionAddDeviceGroups(
    id: string,
    name: string,
    devices: any[],
    deviceGroupsIndex: number
  ): any {
    if (this.deviceGroupsInventory[deviceGroupsIndex].selected == 0) {
      // //console.log("if")
      this.deviceGroupsInventory[deviceGroupsIndex].selected = 1;
      const selectedAddDeviceGroupInfo: any = {
        'device-group-id': id,
        devices: devices,
        'display-name': name,
        selected: 1,
      };
      this.selectedAddDeviceGroups.push(selectedAddDeviceGroupInfo);
    } else {
      // //console.log("else")
      this.deviceGroupsInventory[deviceGroupsIndex].selected = 0;
      for (let i = 0; i < this.selectedAddDeviceGroups.length; i++) {
        //console.log(i);
        // //console.log(this.selectedAddDeviceGroups[i])
        if (this.selectedAddDeviceGroups[i]['device-group-id'] == id) {
          this.selectedAddDeviceGroups.splice(i, 1);
        }
      }
    }
    //console.log(this.selectedAddDeviceGroups, this.deviceGroupsInventory);
  }

  changeSelectionAddServices(
    id: string,
    name: string,
    serviceIndex: number
  ): any {
    if (this.servicesInventory[serviceIndex].selected == 0) {
      this.servicesInventory[serviceIndex].selected = 1;
      const selectedAddServiceInfo: any = {
        'application-id': id,
        'display-name': name,
        selected: 1,
      };
      this.selectedAddServices.push(selectedAddServiceInfo);
    } else {
      this.servicesInventory[serviceIndex].selected = 0;
      for (let i = 0; i < this.selectedAddServices.length; i++) {
        if (this.selectedAddServices[i]['application-id'] == id) {
          this.selectedAddServices.splice(i, 1);
        }
      }
    }
    //console.log(this.selectedAddServices, this.servicesInventory);
  }

  openDeleteDialog(sliceIndex: number): void {
    const dialogRef = this.dialog.open(DeleteSlicesComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
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
    if (deviceGroupsHeight < minimumHeight && servicesHeight < minimumHeight) {
      return minimumHeight;
    } else if (deviceGroupsHeight > servicesHeight) {
      return deviceGroupsHeight;
    } else {
      return servicesHeight;
    }
  }

  calculateVerticalPosition(index: number): number {
    return 60 + index * 70;
  }
}
