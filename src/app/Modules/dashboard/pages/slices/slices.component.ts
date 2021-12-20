import { Component, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { slice } from '../../../../shared/classes/dashboard-data';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'aep-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.scss'],
})
export class SlicesComponent {
  @Output() informParent = new EventEmitter();
  sliceData: any;
  panelOpenState = false;
  expandId: any;
  isExpand: any = false;
  deviceGroups: any;
  openAccordion: any = [];
  openAccordionRight: any = [];
  isEditable: any = false;
  siteIndex: any = 0;
  removedCameraId: any;
  removedDeviceId: any;
  myTimeout: any;
  sliceId: any;
  removedServiceGroupId: any;
  removedServiceId: any;

  constructor(public dialog: MatDialog) {
    this.sliceData = slice[0][this.siteIndex];
    // console.log(this.sliceData.data[1].group[0].cameras.splice(0,1));
    // console.log(this.sliceData.data[0].services[0].group.splice(0,1));
  }

  dragAndDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.sliceData.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  expandSlice(id: number): void {
    this.expandId = id;
  }

  collapseSlice(): void {
    this.expandId = null;
    this.panelOpenState = false;
    if (this.isExpand) {
      this.informParent.emit();
      this.isExpand = false;
    }
  }

  // onSelectCard(value: any):void {
  //   this.expandId = null;
  //   const result = slice[0].filter((word) => word.site_id == value);
  //   this.siteIndex = value;
  //   this.sliceData = result[0];
  // }

  expandAllCard(): void {
    this.expandId = null;
    this.isExpand = true;
    this.panelOpenState = true;
  }

  collapseAllCard(): void {
    this.isExpand = false;
    this.panelOpenState = false;
  }

  onEdit(sliceId: number): void {
    this.sliceId = sliceId;
    if (this.isEditable) {
      this.isEditable = true;
    } else {
      this.isEditable = !this.isEditable;
    }
  }

  removeDevice(
    deviceIndex: number,
    cameraIndex: number,
    cameraId: number,
    deviceId: number
  ): void {
    if (this.myTimeout != 'undefined') {
      this.removedCameraId = cameraId;
      this.removedDeviceId = deviceId;
      this.myTimeout = setTimeout(() => {
        this.sliceData.data[this.siteIndex].group[deviceIndex].cameras.splice(
          cameraIndex,
          1
        );
      }, 3000);
    }
  }

  removeServiceGroup(
    serviceIndex: number,
    groupServiceIndex: number,
    groupId: number,
    serviceId: number
  ): void {
    if (this.myTimeout != 'undefined') {
      this.removedServiceGroupId = groupId;
      this.removedServiceId = serviceId;
      this.myTimeout = setTimeout(() => {
        this.sliceData.data[this.siteIndex].services[serviceIndex].group.splice(
          groupServiceIndex,
          1
        );
      }, 3000);
    }
  }

  undoDevice(): void {
    clearTimeout(this.myTimeout);
    this.removedCameraId = null;
    this.removedServiceGroupId = null;
    this.removedServiceId = null;
    this.removedDeviceId = null;
    this.myTimeout = undefined;
  }

  openDialog(deviceIndex: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.sliceData.data[this.siteIndex].group.splice(deviceIndex, 1);
      }
    });
  }
}
