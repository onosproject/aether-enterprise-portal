/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/delet-card/modal.component';
import { DeviceGroup } from 'src/app/models/device-group.model';

@Component({
  selector: 'aep-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.scss'],
})
export class SlicesComponent {
  @Output() informParent = new EventEmitter();
  sliceData: any;
  panelOpenState = false;
  isExpand: boolean = false;
  deviceGroups: any;
  openAccordion: any = [];
  // openAccordion2: any = [];
  openAccordionRight: any = [];
  isEditable: any = false;
  siteIndex: any = 0;
  removedCameraId: any;
  removedDeviceId: any;
  myTimeout: any = null;
  sliceId: any;
  removedServiceGroupId: any;
  removedServiceId: any;
  isAcknowledged = 12;
  group: string;
  serialNumber: any;
  panelIndex: number;
  TabValue = [];

  innerWidth = 2000;
  innerHeight = 2000;

  constructor(public dialog: MatDialog) {}

  dragAndDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.sliceData.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  expandSlice(): void {
    // this.expandId = id;
    this.isEditable = false;
  }

  collapseSlice(): void {
    // alert(this.siteIndex);
    // this.panelOpenState = false;
    if (this.isExpand) {
      this.informParent.emit();
      this.isExpand = false;
    }
  }

  cancelEdit(index: number): void {
    this.isEditable = !this.isEditable;
    for (let i = 0; i < this.sliceData[index].devices.length; i++) {
      this.sliceData[index].devices[i].isExpanded = false;
    }
    for (let i = 0; i < this.sliceData[index].services.length; i++) {
      this.sliceData[index].services[i].isExpanded = false;
    }
  }

  collapseAllCard(): void {
    this.isExpand = false;
    this.panelIndex = undefined;
    // this.panelOpenState = false;
  }

  onSelectCard(value: {
    siteId: string;
    siteData: any[];
    siteIndex: number;
  }): void {
    this.siteIndex = value.siteIndex;
    this.sliceData = value.siteData;

    for (let i = 0; i < value.siteData.length; i++) {
      this.TabValue.push('1h' + i);
    }

    // console.log('siteData||||', value.siteData);
  }

  getTotalDevices(
    data: [{ 'display-name': string; devices: []; isExpanded: boolean }]
  ): number {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      count = data[i].devices.length + count;
    }
    return count;
  }

  getDevices(deviceGroup: unknown[]): number {
    let deviceLenght = 0;
    for (let i = 0; i < deviceGroup.length; i++) {
      const result = this.sliceData['device-groups'].filter(
        (word) => word['device-group-id'] === deviceGroup[i]
      );
      deviceLenght = +result[0].devices.length;
    }
    return deviceLenght;
  }

  expandAllCard(isAcknowledged: boolean): void {
    this.panelIndex = undefined;
    setTimeout(() => {
      if (isAcknowledged) {
        this.isExpand = true;
        this.isAcknowledged = 8;
        this.isEditable = false;
        this.openAccordion = [];
        this.openAccordionRight = [];

        for (
          let i = 0;
          i < this.sliceData[this.siteIndex].devices.length;
          i++
        ) {
          this.sliceData[this.siteIndex].devices[i].isExpanded = false;
        }
        for (
          let i = 0;
          i < this.sliceData[this.siteIndex].services.length;
          i++
        ) {
          this.sliceData[this.siteIndex].services[i].isExpanded = false;
        }
      } else {
        this.isExpand = true;
      }
    }, 10);
  }

  onEdit(sliceId: number, index: number): void {
    // //console.log(this.sliceData[index]);
    this.sliceId = sliceId;
    this.siteIndex = index;
    if (this.isEditable) {
      this.isEditable = true;
    } else {
      this.isEditable = !this.isEditable;
    }
    for (let i = 0; i < this.sliceData[index].devices.length; i++) {
      this.sliceData[index].devices[i].isExpanded = true;
    }
    for (let i = 0; i < this.sliceData[index].services.length; i++) {
      this.sliceData[index].services[i].isExpanded = true;
    }
  }

  setAccordion(sliceIndex: number, deviceIndex: number): void {
    if (!this.isEditable) {
      this.openAccordion[sliceIndex + deviceIndex] =
        !this.openAccordion[sliceIndex + deviceIndex];
      setTimeout(() => {
        this.sliceData[sliceIndex].devices[deviceIndex].isExpanded =
          !this.sliceData[sliceIndex].devices[deviceIndex].isExpanded;
      }, 10);
    }
  }

  removeDevice(
    deviceIndex: number,
    cameraIndex: number,
    cameraId: number
  ): void {
    if (this.myTimeout === null) {
      this.removedCameraId = cameraId;
      this.removedDeviceId = deviceIndex;
      this.myTimeout = setTimeout(() => {
        this.sliceData[this.siteIndex].devices[deviceIndex].devices.splice(
          cameraIndex,
          1
        );

        this.myTimeout = null;
      }, 3000);
    }
  }

  removeServiceGroup(
    serviceIndex: number,
    groupServiceIndex: number,
    serviceId: number
  ): void {
    if (this.myTimeout === null) {
      this.removedServiceId = serviceId;
      this.myTimeout = setTimeout(() => {
        this.sliceData[this.siteIndex].services[serviceIndex].service.splice(
          0,
          1
        );
        this.myTimeout = null;
      }, 3000);
    }
  }
  undoDevice(): void {
    clearTimeout(this.myTimeout);
    this.removedCameraId = null;
    this.removedServiceGroupId = null;
    this.removedServiceId = null;
    this.removedDeviceId = null;
    this.myTimeout = null;
  }

  openDialog(deviceIndex: number, isDevice: boolean): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true' && isDevice) {
        this.sliceData[this.siteIndex].devices.splice(0, 1);
      }
      if (result === 'true' && !isDevice) {
        this.sliceData[this.siteIndex].services.splice(0, 1);
      }
    });
  }

  hideAcknowledgedView(): void {
    this.openAccordion = [];
    this.openAccordionRight = [];
    this.isAcknowledged = 12;
    this.isExpand = false;
    this.group = '';
    this.serialNumber = '';
    // this.panelOpenState = false;
    this.panelIndex = undefined;
    for (let i = 0; i < this.sliceData[this.siteIndex].devices.length; i++) {
      this.sliceData[this.siteIndex].devices[i].isExpanded = false;
    }
    for (let i = 0; i < this.sliceData[this.siteIndex].services.length; i++) {
      this.sliceData[this.siteIndex].services[i].isExpanded = false;
    }
  }

  selectedDevice(event: { group: string; serialNumber: number }): void {
    this.group = event.group;
    this.serialNumber = JSON.stringify(event.serialNumber);
  }

  calculateSVGHeight(deviceGroups: DeviceGroup[]): number {
    // const totalHeight = noOfDeviceGroups * (isExpanded ? 420 : 120);
    // return totalHeight > 450 ? totalHeight : 450;
    let totalHeight = 0;
    for (let i = 0; i < deviceGroups.length; i++) {
      totalHeight += deviceGroups[i]?.isExpanded ? 420 : 120;
    }
    // totalHeight += 200;

    return totalHeight > 450 ? totalHeight : 450;
  }

  // calculateDeviceTop(index: number, deviceGroups: any): number {
  //   if (index === 0) {
  //     return 20;
  //   } else {
  //     let height = 20;
  //     for (let i = 0; i < index; i++) {
  //       height += deviceGroups[i].isExpanded ? 420 : 120;
  //     }
  //     // return index * (isExpaned ? 400 : 100) + 20 * (index + 1);
  //     return height;
  //   }
  // }

  calculateDeviceTop(index: number, deviceGroups: DeviceGroup): number {
    if (index === 0) {
      return 20;
    } else {
      let height = 20;
      for (let i = 0; i < index; i++) {
        height += deviceGroups[i].isExpanded ? 250 : 85;
      }
      // return index * (isExpaned ? 400 : 100) + 20 * (index + 1);
      return height;
    }
  }

  calculateJointVerticalPosition(
    deviceGroups: [
      { 'display-name': string; devices: []; isExpanded: boolean }
    ],
    index: number
  ): number {
    let height =
      deviceGroups.length !== index
        ? deviceGroups[index].isExpanded
          ? 140
          : 56
        : 56;
    for (let i = 0; i < index; i++) {
      height += deviceGroups[i].isExpanded ? 250 : 85;
    }
    return height;
  }
  // calculateServiceHeight(deviceGroups: any): number {
  //   let height = 0;
  //   for (let i = 0; i < deviceGroups.length; i++) {
  //     height += deviceGroups[i].isExpanded ? 310 : deviceGroups.length * 150;
  //   }
  //   return height;
  // }
}
