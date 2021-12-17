import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { trigger, style, animate, transition } from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { SelectDevicesComponent } from '../dialogs/select-devices/select-devices.component';
import { SelectSimsComponent } from '../dialogs/select-sims/select-sims.component';

@Component({
  selector: 'aep-device-sim',
  templateUrl: './device-sim.component.html',
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
export class DeviceSimComponent implements OnInit {
  // temp var
  animal: string;
  name: string;

  // var
  addNewDevice: boolean = false;
  inventoryDeviceEditForm: boolean = false;
  newSim = new FormControl('');
  browseSims = new FormControl('');
  toggle: any;
  editObject: any;
  inventorySimsTabStyle: string = 'false';
  inventoryDeviceTabStyle: string = 'false';
  deviceSimView: string = 'true';
  inventoryViewStyle: string = 'false';
  cancelledSimsStyle: string = 'false';
  inventorySimsToggle: boolean = false;
  cancelledSimsToggle: boolean = false;
  deviceViewToggle: boolean = false;
  simsViewToggle: boolean = true;
  allComplete: boolean = false;
  deviceSimsDetailViewEditForm: boolean = false;
  deviceSimsDetailItemDetailsPopUp: boolean = false;
  activeNewDevice: boolean = false;
  deviceSimFormGroup: FormGroup;
  deviceSimsDetailsProgressToggleWeek: boolean = false;
  deviceSimsDetailsProgressToggleDay: boolean = true;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.deviceSimFormGroup = new FormGroup({
      newSim: new FormControl(null),
      deviceName: new FormControl(null),
      email: new FormControl(null),
      deviceSerialNum: new FormControl(null),
      browseSims: new FormControl(),
      deviceLocation: new FormControl(),
      deviceType: new FormControl(null),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectSimsComponent, {
      width: '690px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(SelectDevicesComponent, {
      width: '870px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  deviceSimsDetailItemDetailsPopUpFun(): void {
    this.deviceSimsDetailItemDetailsPopUp = true;
    this.deviceSimsDetailViewEditForm = false;
    this.activeNewDevice = false;
  }
  deviceSimsDetailItemDetailsPopUpClose(): void {
    this.deviceSimsDetailItemDetailsPopUp = false;
    this.activeNewDevice = false;
  }
  deviceSimsDetailViewEditFormFun(): void {
    this.deviceSimsDetailViewEditForm = true;
    this.deviceSimsDetailItemDetailsPopUp = false;
    this.activeNewDevice = false;
  }
  deviceSimsDetailViewEditFormClose(): void {
    this.deviceSimsDetailViewEditForm = false;
    this.activeNewDevice = false;
  }

  deviceSimsDetailsProgressToggleDayFun(): void {
    this.deviceSimsDetailsProgressToggleDay = true;
    this.deviceSimsDetailsProgressToggleWeek = false;
  }
  deviceSimsDetailsProgressToggleWeekFun(): void {
    this.deviceSimsDetailsProgressToggleWeek = true;
    this.deviceSimsDetailsProgressToggleDay = false;
  }
  activeNewDeviceForm(): void {
    this.activeNewDevice = true;
    this.deviceSimsDetailItemDetailsPopUp = false;
    this.deviceSimsDetailViewEditForm = false;
  }
  addNewDeviceFun(): void {
    this.addNewDevice = true;
    this.inventoryDeviceEditForm = false;
  }
  inventoryDeviceEditFormFun(): void {
    this.inventoryDeviceEditForm = true;
    this.addNewDevice = false;
  }
  inventoryDeviceEditFormFunClose(): void {
    this.inventoryDeviceEditForm = false;
  }

  simsView(): void {
    this.inventorySimsTabStyle = 'false';
    this.inventoryDeviceTabStyle = 'false';
    this.deviceSimView = 'true';
    this.inventoryViewStyle = 'false';
    this.cancelledSimsStyle = 'false';
    this.inventorySimsToggle = false;
    this.cancelledSimsToggle = false;
    this.simsViewToggle = true;
    this.deviceViewToggle = false;
    this.cancelledSimsStyle = 'false';
    this.activeNewDevice = false;
    this.addNewDevice = false;
    this.inventoryDeviceEditForm = false;
    // console.log(a)
  }
  inventoryDeviceTab(): void {
    this.deviceSimView = 'false';
    this.inventoryDeviceTabStyle = 'true';
    this.inventorySimsTabStyle = 'false';
    this.inventoryViewStyle = 'true';
    this.cancelledSimsStyle = 'false';
    this.inventorySimsToggle = false;
    this.cancelledSimsToggle = false;
    this.deviceViewToggle = true;
    this.simsViewToggle = false;
    this.activeNewDevice = false;
    this.addNewDevice = false;
    this.inventoryDeviceEditForm = false;
    this.deviceSimsDetailViewEditForm = false;
    this.deviceSimsDetailItemDetailsPopUp = false;
  }
  inventorySimsTab(): void {
    this.inventorySimsTabStyle = 'true';
    this.inventoryDeviceTabStyle = 'false';
    this.inventorySimsToggle = true;
    this.deviceViewToggle = false;
    this.cancelledSimsToggle = false;
    this.simsViewToggle = false;
    this.cancelledSimsStyle = 'false';
    this.activeNewDevice = false;
    this.addNewDevice = false;
    this.inventoryDeviceEditForm = false;
  }
  cancelledSims(): void {
    this.cancelledSimsStyle = 'true';
    this.inventorySimsTabStyle = 'false';
    this.inventoryDeviceTabStyle = 'false';
    this.inventorySimsTabStyle = 'false';
    this.inventoryDeviceTabStyle = 'false';
    this.deviceSimView = 'false';
    this.inventoryViewStyle = 'false';
    this.inventorySimsToggle = false;
    this.simsViewToggle = false;
    this.deviceViewToggle = false;
    this.cancelledSimsToggle = true;
    this.activeNewDevice = false;
    this.addNewDevice = false;
    this.inventoryDeviceEditForm = false;
    this.deviceSimsDetailViewEditForm = false;
    this.deviceSimsDetailItemDetailsPopUp = false;
  }
}
