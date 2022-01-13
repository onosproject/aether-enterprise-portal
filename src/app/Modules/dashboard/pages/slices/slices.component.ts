import { Component, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/delet-card/modal.component';

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
  openAccordion2: any = [];
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
      } else {
        this.isExpand = true;
      }
    }, 10);
  }

  onEdit(sliceId: number, index: number): void {
    this.sliceId = sliceId;
    this.siteIndex = index;
    if (this.isEditable) {
      this.isEditable = true;
    } else {
      this.isEditable = !this.isEditable;
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
    this.isAcknowledged = 12;
    this.isExpand = false;
    // this.panelOpenState = false;
    this.panelIndex = undefined;
  }

  selectedDevice(event: { group: any; serialNumber: any }): void {
    this.group = event.group;
    this.serialNumber = JSON.stringify(event.serialNumber);
  }
}
