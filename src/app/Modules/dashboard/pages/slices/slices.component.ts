/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/delete-card/modal.component';
import { DeviceGroup } from 'src/app/models/device-group.model';
import { SitesService } from 'src/app/services/sites/sites.service';
import { smallCell } from '../../../../shared/classes/dashboard-data';
import { SitePlan } from 'src/app/models/site-plan.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Slice } from 'src/app/models/slice.model';
import { environment } from '../../../../../../src/environments/environment';

@Component({
  selector: 'aep-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.scss'],
})
export class SlicesComponent {
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: UIEvent): void {
    this.innerWidth = (event.target as Window).innerWidth;
  }
  @Output()
  informParent = new EventEmitter();
  sliceData;
  panelOpenState = false;
  isExpand: boolean = false;
  deviceGroups;
  openAccordion: boolean[] = [];
  openAccordionRight: boolean[] = [];
  isEditable: boolean = false;
  siteIndex: number = 0;
  removedCameraId;
  removedDeviceId;
  myTimeout = null;
  sliceId;
  removedServiceGroupId;
  removedServiceId;
  isAcknowledged = 12;
  group: string;
  serialNumber;
  panelIndex: number;
  TabValue = [];
  innerWidth: number = window.innerWidth;
  innerHeight = 2000;
  sitePlans: SitePlan;
  viewType: string = 'Logical';
  baseUrl: string = environment.baseUrl.substring(
    0,
    environment.baseUrl.length - 1
  );
  config = null;
  selectedPlan: number = 0;
  smallCells = [
    {
      'display-name': 'North Cell',
      position: {
        'position-x': 200,
        'position-y': 100,
        'site-plan': 'floor-0',
      },
    },
    {
      'display-name': 'South Cell',
      position: {
        'position-x': 100,
        'position-y': 300,
        'site-plan': 'floor-1',
      },
    },
    {
      'display-name': 'East Cell',
      position: {
        'position-x': 300,
        'position-y': 400,
        'site-plan': 'floor-2',
      },
    },
    {
      'display-name': 'West Cell',
      position: {
        'position-x': 200,
        'position-y': 200,
        'site-plan': 'floor-3',
      },
    },
  ];
  devices = [
    {
      'display-name': 'Camera 1',
      position: {
        'position-x': 500,
        'position-y': 200,
        'site-plan': 'floor-0',
      },
      'site-position': {
        'position-x': 200,
        'position-y': 100,
      },
    },
    {
      'display-name': 'Camera 2',
      position: {
        'position-x': 450,
        'position-y': 300,
        'site-plan': 'floor-1',
      },
      'site-position': {
        'position-x': 100,
        'position-y': 300,
      },
    },
    {
      'display-name': 'Phone 1',
      position: {
        'position-x': 100,
        'position-y': 400,
        'site-plan': 'floor-2',
      },
      'site-position': {
        'position-x': 300,
        'position-y': 400,
      },
    },
    {
      'display-name': 'Phone 2',
      position: {
        'position-x': 250,
        'position-y': 300,
        'site-plan': 'floor-3',
      },
      'site-position': {
        'position-x': 200,
        'position-y': 200,
      },
    },
    {
      'display-name': 'Phone 3',
      position: {
        'position-x': 350,
        'position-y': 350,
        'site-plan': 'floor-1',
      },
      'site-position': {
        'position-x': 100,
        'position-y': 300,
      },
    },
    {
      'display-name': 'Phone 4',
      position: {
        'position-x': 300,
        'position-y': 300,
        'site-plan': 'floor-0',
      },
      'site-position': {
        'position-x': 200,
        'position-y': 100,
      },
    },
  ];
  constructor(
    public dialog: MatDialog,
    public sitesService: SitesService,
    public snackBar: MatSnackBar
  ) {}

  dragAndDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.sliceData, event.previousIndex, event.currentIndex);
  }

  expandSlice(): void {
    this.isEditable = false;
  }

  collapseSlice(): void {
    /* istanbul ignore else */

    if (this.isExpand) {
      this.informParent.emit({ isalert: false, viewType: false });
      this.isExpand = false;
    }
  }

  cancelEdit(index: number): void {
    this.sliceId = null;
    this.siteIndex = 0;
    /* istanbul ignore else */
    if (this.isEditable) {
      this.isEditable = false;
    }
    for (let i = 0; i < this.sliceData[index].devices.length; i++) {
      /* istanbul ignore else */
      if (this.sliceData[index].alerts === 0) {
        this.sliceData[index].devices[i].isExpanded = false;
      }
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
    siteData: Slice[];
    siteIndex: number;
    sitePlans: SitePlan;
  }): void {
    this.TabValue = [];
    this.siteIndex = value.siteIndex;
    this.sitePlans = value.sitePlans;
    this.config = value.sitePlans;
    for (let i = 0; i < value.siteData.length; i++) {
      this.TabValue.push('1h' + i);
      /* istanbul ignore else */
      if (value.siteData[i].alerts !== 0) {
        value.siteData[i].devices[0].isExpanded = true;
      }
    }
    setTimeout(() => {
      this.sliceData = value.siteData;
      this.logicforAlertData();
    }, 10);
  }

  logicforAlertData(): void {
    smallCell[0][0].alerts = [];
    let priorty = 'High';
    let status = 'Critical';
    for (let i = 0; i < this.sliceData.length; i++) {
      /* istanbul ignore else */
      if (this.sliceData[i].alerts !== 0) {
        for (let j = 0; j < this.sliceData[i].alerts; j++) {
          let obj = {};
          obj = {
            id: j,
            title:
              'Alert Causing Entity ' +
              this.sliceData[i].devices[0].devices[j]['display-name'] +
              '(CG)',
            priorty: priorty,
            status: status,
            group: this.sliceData[i].devices[0]['display-name'],
            serialNumber:
              this.sliceData[i].devices[0].devices[j]['serial-number'],
          };
          /* istanbul ignore if */
          if (priorty === 'Low') {
            priorty = 'Medium';
          } else {
            /* istanbul ignore if */
            if (priorty === 'Medium') {
              priorty = 'High';
            } else {
              /* istanbul ignore else */
              if (priorty === 'High') {
                priorty = 'Low';
              }
            }
          }
          /* istanbul ignore else */
          if (status === 'Critical') {
            status = 'null';
          }

          smallCell[0][0].alerts.push(obj);
        }
        this.sitesService.allSmallCellsData = smallCell[0][0].alerts;
      }
    }
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

  expandAllCard(isAcknowledged: boolean): void {
    this.panelIndex = undefined;
    setTimeout(() => {
      if (isAcknowledged) {
        this.isExpand = true;
        this.isAcknowledged = 8;
        this.isEditable = false;
        this.openAccordion = [];
        this.openAccordionRight = [];

        /* istanbul ignore else */
        if (this.sliceData[this.siteIndex].alerts === 0) {
          for (
            let i = 0;
            i < this.sliceData[this.siteIndex].devices.length;
            i++
          ) {
            this.sliceData[this.siteIndex].devices[i].isExpanded = false;
          }
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

  openAlerts(numberOfAlerts: number, groupName: string): void {
    this.sitesService.numberOfAlerts = numberOfAlerts;

    const filteredArray = this.sitesService.allSmallCellsData.filter((res) => {
      return res.group === groupName;
    });
    smallCell[0][0].alerts = filteredArray;

    this.isExpand = true;
    this.isAcknowledged = 8;
    this.isEditable = false;
    this.openAccordion = [];
    this.openAccordionRight = [];
    this.informParent.emit({ isalert: true, viewType: false });
  }

  onEdit(sliceId: number, index: number): void {
    this.sliceId = sliceId;
    this.siteIndex = index;
    /* istanbul ignore else */
    if (!this.isEditable) {
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
    /* istanbul ignore else */
    if (!this.isEditable) {
      this.openAccordion[sliceIndex + deviceIndex] =
        !this.openAccordion[sliceIndex + deviceIndex];

      setTimeout(() => {
        /* istanbul ignore else */
        if (this.sliceData[sliceIndex].alerts === 0) {
          this.sliceData[sliceIndex].devices[deviceIndex].isExpanded =
            !this.sliceData[sliceIndex].devices[deviceIndex].isExpanded;
        }
      }, 10);
    }
  }

  removeDevice(
    deviceIndex: number,
    cameraIndex: number,
    cameraId: number
  ): void {
    /* istanbul ignore else */
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
    /* istanbul ignore else */
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
      /* istanbul ignore else */
      if (result === 'true' && !isDevice) {
        this.sliceData[this.siteIndex].services.splice(0, 1);
      }
    });
  }

  hideAcknowledgedView(): void {
    // this.sliceId = null;
    // this.siteIndex = 0;
    this.openAccordion = [];
    this.openAccordionRight = [];
    this.isAcknowledged = 12;
    this.isExpand = false;
    this.group = '';
    this.serialNumber = '';
    this.panelIndex = undefined;
    /* istanbul ignore else */
    if (this.sliceData[this.siteIndex].alerts === 0) {
      for (let i = 0; i < this.sliceData[this.siteIndex].devices.length; i++) {
        this.sliceData[this.siteIndex].devices[i].isExpanded = false;
      }
    }
    for (let i = 0; i < this.sliceData[this.siteIndex].services.length; i++) {
      this.sliceData[this.siteIndex].services[i].isExpanded = false;
    }
  }

  selectedDevice(event: { group: string; serialNumber: number }): void {
    this.group = event.group;
    this.serialNumber = event.serialNumber;
  }

  calculateDeviceTop(index: number, deviceGroups: DeviceGroup[]): number {
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
      height += deviceGroups[i].isExpanded ? 315 : 85;
    }
    return height;
  }

  goToPhysicalView(): void {
    if (this.sitePlans !== null && this.sitePlans !== undefined) {
      this.informParent.emit({ isalert: false, viewType: true });
    } else {
      this.showSnackBar();
    }
  }

  showSnackBar(): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

  calculateSVGHeight(deviceGroups: DeviceGroup[]): number {
    let totalHeight = 0;
    for (let i = 0; i < deviceGroups.length; i++) {
      totalHeight += deviceGroups[i]?.isExpanded ? 420 : 120;
    }
    // totalHeight += 200;

    return totalHeight > 450 ? totalHeight : 450;
  }
}

@Component({
  selector: 'aep-snack-bar-component-example-snack',
  template:
    '<div class="snack-div"><p>No SitePlans available for this site.</p> <img src="assets/AdminPanel/close-snack.svg" /></div>',
  styles: [
    `
      .snack-div {
        justify-content: space-between;
        display: flex;
        height: 10px;
        img {
          margin: 5px 6px;
          position: absolute;
          right: 8px;
          width: 11px;
        }
      }
    `,
  ],
})
export class SnackBarComponent {}
