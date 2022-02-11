import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/delet-card/modal.component';
import { DeviceGroup } from 'src/app/models/device-group.model';
import { SitesService } from 'src/app/services/sites/sites.service';
import { smallCell } from '../../../../shared/classes/dashboard-data';
import { SitePlan } from 'src/app/models/site-plan.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'aep-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.scss'],
})
export class SlicesComponent {
  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.innerWidth = event.target.innerWidth;
  }
  @Output()
  informParent = new EventEmitter();
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
  innerWidth: number = window.innerWidth;
  innerHeight = 2000;
  sitePlans: SitePlan;

  constructor(
    public dialog: MatDialog,
    private sitesService: SitesService,
    private snackBar: MatSnackBar
  ) {}

  dragAndDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.sliceData, event.previousIndex, event.currentIndex);
  }

  expandSlice(): void {
    // this.expandId = id;
    this.isEditable = false;
  }

  collapseSlice(): void {
    // alert(this.siteIndex);
    // this.panelOpenState = false;
    if (this.isExpand) {
      this.informParent.emit({ isalert: false, viewType: false });
      this.isExpand = false;
    }
  }

  cancelEdit(index: number): void {
    this.sliceId = null;
    this.siteIndex = 0;
    if (this.isEditable) {
      this.isEditable = false;
    }
    // this.isEditable = !this.isEditable;
    for (let i = 0; i < this.sliceData[index].devices.length; i++) {
      if (this.sliceData[index].alerts === 0) {
        this.sliceData[index].devices[i].isExpanded = false;
      }
      // if (this.sliceData[index].alerts !== 0) {
      //   let element = <HTMLElement>document.getElementById('deviceGroup');
      //   element.className = 'show';
      // }
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
    sitePlans: SitePlan;
  }): void {
    this.TabValue = [];
    this.siteIndex = value.siteIndex;
    // console.log('this.sitePlans', value.sitePlans);
    this.sitePlans = value.sitePlans;

    // if (this.sitePlans === null) {
    //   this.sitePlans = null;
    // } else {
    //   this.sitePlans = value.sitePlans;
    // }
    for (let i = 0; i < value.siteData.length; i++) {
      this.TabValue.push('1h' + i);
      if (value.siteData[i].alerts !== 0) {
        value.siteData[i].devices[0].isExpanded = true;
        // console.log('-----', value.siteData[i].devices[0]);
      }
      // console.log('-----', this.sliceData[i].alerts);
      // console.log('-----', { ...this.sliceData[i] });
    }
    setTimeout(() => {
      this.sliceData = value.siteData;
      this.logicforAlertData(value.siteData);
      console.log('siteData||||', this.sliceData);
    }, 20);
  }

  logicforAlertData(sliceData: any[]): void {
    smallCell[0][0].alerts = [];
    let priorty = 'High';
    let status = 'Critical';
    for (let i = 0; i < this.sliceData.length; i++) {
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

          if (priorty === 'Low') {
            priorty = 'Medium';
          } else {
            if (priorty === 'Medium') {
              priorty = 'High';
            } else {
              if (priorty === 'High') {
                priorty = 'Low';
              }
            }
          }

          if (status === 'Critical') {
            status = 'null';
          }

          smallCell[0][0].alerts.push(obj);
        }
        this.sitesService.allSmallCellsData = smallCell[0][0].alerts;
        // console.log('+++++++++++++', smallCell[0][0].alerts);
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

  openAlerts(numberOfAlerts: number, groupName: string) {
    this.sitesService.numberOfAlerts = numberOfAlerts;
    // smallCell[0][0].alerts = [];
    // console.log(groupName);

    const filteredArray = this.sitesService.allSmallCellsData.filter((res) => {
      return res.group === groupName;
    });
    smallCell[0][0].alerts = filteredArray;
    // console.log(filteredArray);

    this.isExpand = true;
    this.isAcknowledged = 8;
    this.isEditable = false;
    this.openAccordion = [];
    this.openAccordionRight = [];
    // for (let i = 0; i < this.sliceData[this.siteIndex].devices.length; i++) {
    //   this.sliceData[this.siteIndex].devices[i].isExpanded = false;
    // }
    // for (let i = 0; i < this.sliceData[this.siteIndex].services.length; i++) {
    //   this.sliceData[this.siteIndex].services[i].isExpanded = false;
    // }
    this.informParent.emit({ isalert: true, viewType: false });
  }

  onEdit(sliceId: number, index: number): void {
    // console.log(this.sliceData[index]);
    // alert(sliceId);
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
    // this.sliceId = null;
    // this.siteIndex = 0;
    this.openAccordion = [];
    this.openAccordionRight = [];
    this.isAcknowledged = 12;
    this.isExpand = false;
    this.group = '';
    this.serialNumber = '';
    // this.panelOpenState = false;
    this.panelIndex = undefined;
    // console.log(this.sliceData[this.siteIndex].devices[i]);

    if (this.sliceData[this.siteIndex].alerts === 0) {
      for (let i = 0; i < this.sliceData[this.siteIndex].devices.length; i++) {
        // console.log(this.sliceData[this.siteIndex].devices[i]);
        this.sliceData[this.siteIndex].devices[i].isExpanded = false;
      }
    }
    for (let i = 0; i < this.sliceData[this.siteIndex].services.length; i++) {
      this.sliceData[this.siteIndex].services[i].isExpanded = false;
    }
  }

  selectedDevice(event: { group: string; serialNumber: number }): void {
    this.group = event.group;
    // this.serialNumber = JSON.stringify(event.serialNumber);
    this.serialNumber = event.serialNumber;
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
      height += deviceGroups[i].isExpanded ? 315 : 85;
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

  goToPhysicalView(): void {
    if (this.sitePlans !== null && this.sitePlans !== undefined) {
      this.informParent.emit({ isalert: false, viewType: true });
    } else {
      this.showSnackBar();
    }
  }

  showSnackBar(): void {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
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
export class PizzaPartyComponent {}
