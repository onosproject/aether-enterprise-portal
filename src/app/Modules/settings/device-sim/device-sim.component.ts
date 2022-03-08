/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// import { trigger, style, animate, transition } from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { SelectDevicesComponent } from '../dialogs/select-devices/select-devices.component';
import { SelectSimsComponent } from '../dialogs/select-sims/select-sims.component';

import { DeviceSimService } from 'src/app/services/device-sim.service';

import { ConfigService } from 'src/app/services/config.service';
import { Observable, Subscription } from 'rxjs';

// chart imports
import * as d3Time from 'd3-timelines';
import * as d3 from 'd3';

// Dialog Imports
import { DeleteDevicesComponent } from '../dialogs/delete-devices/delete-devices.component';
import { DeleteInventoryComponent } from '../dialogs/delete-inventory/delete-inventory.component';

// Service Imports
import { DeviceSimHelperService } from './device-sim-helper.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

// Model Imports
import { Config } from 'src/app/models/config.model';
import { TimesObject } from 'src/app/models/times-object.model';
import { TimelineTimes } from 'src/app/models/timeline-times.model';
import { TimelineData } from 'src/app/models/timeline.model';

import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'aep-device-sim',
  templateUrl: './device-sim.component.html',
  // animations: [
  //   trigger('inOutAnimation', [
  //     transition(':enter', [
  //       style({ height: 0, opacity: 0 }),
  //       animate('0.5s ease-out', style({ height: 400, opacity: 1 })),
  //     ]),
  //     transition(':leave', [
  //       style({ height: 500, opacity: 1 }),
  //       animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
  //     ]),
  //   ]),
  // ],
  styles: [],
})
export class DeviceSimComponent implements OnInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: UIEvent): void {
    this.innerWidth = (event.target as Window).innerWidth;
    // this.fetchProm(
    //   this.selectedSite,
    //   this.selectedSimDetails,
    //   this.selectedIndexDetails
    // );
  }
  // temp var
  animal: string;
  name: string;

  // var
  addNewDevice: boolean = false;
  inventoryDeviceEditForm: boolean = false;
  newSim = new FormControl('');
  browseSims = new FormControl('');
  toggle;
  editObject;
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

  config = [];

  selectedSite = '';

  selectedSim = '';

  selectedDevice: number = 0;

  siteSubscription: Subscription;
  siteConfig = [];

  deviceInventory = [];

  simInventory = [];

  editInventory: number[] = [];

  editDevices: number[] = [];

  deviceDetails: number[] = [];

  deviceType: string[] = ['Phone', 'Camera', 'Sensor', 'IOT', 'Other'];

  cancelledSimsStorage = [];

  loginCreds: string;

  lastWeekDates = [];
  lastWeekDatesLength: number;
  selectedDate: number = -1;
  isZoomIn: boolean = false;
  selectedSimDetails: string;
  selectedIndexDetails: number;
  zoomIn: number = 0;
  dateSelected: { date: string; string_date: string };

  // Prometheus Data
  // valuesArray: any[] = [
  //   [{ timeStamp: 1640874480, activeStatus: '1' }],
  //   [{ timeStamp: 1640878080, activeStatus: '0' }],
  //   [{ timeStamp: 1640881680, activeStatus: '1' }],
  //   [{ timeStamp: 1640885280, activeStatus: '1' }],
  //   [{ timeStamp: 1640888880, activeStatus: '1' }],
  //   [{ timeStamp: 1640892480, activeStatus: '0' }],
  //   [{ timeStamp: 1640896080, activeStatus: '1' }],
  //   [{ timeStamp: 1640899680, activeStatus: '0' }],
  //   [{ timeStamp: 1640903280, activeStatus: '0' }],
  //   [{ timeStamp: 1640906880, activeStatus: '0' }],
  //   [{ timeStamp: 1640910480, activeStatus: '1' }],
  //   [{ timeStamp: 1640914080, activeStatus: '1' }],
  //   [{ timeStamp: 1640917680, activeStatus: '0' }],
  //   [{ timeStamp: 1640921280, activeStatus: '1' }],
  //   [{ timeStamp: 1640924880, activeStatus: '0' }],
  //   [{ timeStamp: 1640928480, activeStatus: '0' }],
  //   [{ timeStamp: 1640932080, activeStatus: '1' }],
  //   [{ timeStamp: 1640935680, activeStatus: '1' }],
  //   [{ timeStamp: 1640939280, activeStatus: '1' }],
  // ];

  valuesArray: [number, string][] = [
    [1640874480, '1'],
    [1640878080, '0'],
    [1640881680, '1'],
    [1640885280, '1'],
    [1640888880, '1'],
    [1640892480, '0'],
    [1640896080, '1'],
    [1640899680, '0'],
    [1640903280, '0'],
    [1640906880, '0'],
    [1640910480, '1'],
    [1640914080, '1'],
    [1640917680, '0'],
    [1640921280, '1'],
    [1640924880, '0'],
    [1640928480, '0'],
    [1640932080, '1'],
    [1640935680, '1'],
    [1640939280, '1'],
  ];

  timesArray = [];

  timesDiffArray = [];

  apiPreviousDate = '';
  apiPreviousTime = '';
  apiCurrentDate = '';
  apiCurrentTime = '';

  valuesArrayFinal = [
    { activeStatus: '1', times: [] },
    { activeStatus: '2', times: [] },
    { activeStatus: '3', times: [] },
    { activeStatus: '4', times: [] },
    { activeStatus: '5', times: [] },
    { activeStatus: '6', times: [] },
  ];

  // valuesArrayFinal[0].times = valueParentArray.filter(x => {
  //   x.status == 0
  // });

  simpleData = [
    {
      activeStatus: '1',
      times: [{ ending_time: 1640960880000, starting_time: 1640874480000 }],
    },
  ];

  innerWidth: number = window.innerWidth;

  deviceSimForm = new FormGroup({});

  addNewDeviceSimError: boolean = false;

  deviceSimControls = this.deviceSimForm.controls;

  deviceSimSubmit = false;

  deviceSimEditForm = new FormGroup({
    // newSim: new FormControl('', Validators.required),
    // deviceName: new FormControl('', Validators.required),
    // deviceLocation: new FormControl('', Validators.required),
    // deviceSerialNum: new FormControl('', Validators.required),
  });

  editDeviceSimError: boolean = false;

  inventoryDeviceSimForm = new FormGroup({
    // inventoryDeviceName: new FormControl('', Validators.required),
    // inventoryDeviceLocation: new FormControl('', Validators.required),
    // inventoryDeviceSerialNum: new FormControl('', Validators.required),
    // inventoryDeviceType: new FormControl('', Validators.required),
  });

  addNewInventoryDeviceError: boolean = false;

  inventoryEditForm = new FormGroup({
    // inventoryDeviceName: new FormControl('', Validators.required),
    // inventoryDeviceLocation: new FormControl('', Validators.required),
    // inventoryDeviceSerialNum: new FormControl('', Validators.required),
    // inventoryDeviceType: new FormControl('', Validators.required),
  });

  editInventoryDeviceError: boolean = false;

  loggedIn: boolean = false;

  constructor(
    private meta: Meta,
    public http: HttpClient,
    public dialog: MatDialog,
    public deviceService: DeviceSimService,
    public configService: ConfigService,
    public deviceSimHelper: DeviceSimHelperService,
    public globalService: GlobalDataService
  ) {}

  ngOnInit(): void {
    this.deviceSimFormGroup = new FormGroup({
      email: new FormControl(null),
      browseSims: new FormControl(),
      deviceType: new FormControl(null),
    });

    this.assignSelectedSim();
    this.assignSelectedDevice();
    this.assignSelectedSite();
    this.configService.fetchDeviceConfig();
    this.configService.fetchOther();
    this.getLoginCreds();
    // this.deviceService.getSiteIds();
    // this.deviceService.selectedId();
    //console.log(this.valuesArrayFinal);

    // setInterval(() => {
    //   console.log('lol', this.fetchData());
    // }, 100000);
    // console.log('||||||||||||||||||', this.getLastWeek());
    this.getLastWeek();
    // this.getCompleteData();
    // this.getCurrentSite();
    // this.globalService.fetchSubCompleteData();
  }

  // getCurrentSite(): void {
  //   this.globalService.getSite().subscribe((data) => {
  //     this.selectedSite = data;
  //   });
  // }

  // getCompleteData(): void {
  //   if (this.globalService.loggedIn == true) {
  //     this.globalService.fetchCompleteData();
  //   }
  //   this.globalService.loggedIn = false;
  // }

  // new formGroup functions
  configDeviceSim(): void {
    this.deviceSimForm = new FormGroup({
      newSim: new FormControl('', Validators.required),
      deviceName: new FormControl('', Validators.required),
      deviceLocation: new FormControl('', Validators.required),
      deviceSerialNum: new FormControl('', Validators.required),
    });
    // this.activeNewDeviceForm();
  }

  configInventoryDevice(): void {
    this.inventoryDeviceSimForm = new FormGroup({
      inventoryDeviceName: new FormControl('', Validators.required),
      inventoryDeviceLocation: new FormControl('', Validators.required),
      inventoryDeviceSerialNum: new FormControl('', Validators.required),
      inventoryDeviceType: new FormControl('', Validators.required),
    });
  }

  getLastWeek(): void {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const today = new Date();
    const lastDay = new Date();
    // let nextDay = new Date();
    const lastWeeks = [];

    for (let i = 0; i < 8; i++) {
      const obj = {};
      if (today.getDate() - i === today.getDate()) {
        // for (let i = 0; i < 2; i++) {
        //   var obj2 = {};

        //   if (i === 0) {
        //     nextDay.setDate(nextDay.getDate() + 2);
        //     obj2['date'] = nextDay.getDate() + ' ' + months[nextDay.getMonth()];
        //     obj2['string_date'] = nextDay.toISOString();
        //     lastWeeks.push(obj2);
        //   }
        //   if (i === 1) {
        //     nextDay.setDate(nextDay.getDate() - 1);
        //     obj2['date'] = nextDay.getDate() + ' ' + months[nextDay.getMonth()];
        //     obj2['string_date'] = nextDay.toISOString();
        //     lastWeeks.push(obj2);
        //   }
        // }
        obj['date'] = 'Now';
        obj['string_date'] = today.toISOString();
        lastWeeks.push(obj);
      } else {
        lastDay.setDate(lastDay.getDate() - 1);
        obj['date'] = today.getDate() - i + ' ' + months[today.getMonth()];
        obj['string_date'] = lastDay.toISOString();
        lastWeeks.push(obj);
      }
    }

    this.lastWeekDates = lastWeeks.reverse();
    // console.log(this.lastWeekDates);
    this.lastWeekDatesLength = this.lastWeekDates.length;
    // console.log(lastWeeks);
  }

  getDateForZoom(
    index: number,
    date: { date: string; string_date: string }
  ): void {
    /* istanbul ignore else*/
    if (index !== this.lastWeekDates.length - 1) {
      this.selectedDate = index;
      this.dateSelected = date;
    }
    this.zoomgraph(false, this.zoomIn + 1);
  }
  zoomgraph(value: boolean, zoomIn: number): void {
    // this.getCurrentSite();
    /* istanbul ignore else*/
    if (zoomIn >= 0 && zoomIn <= 2) {
      // this.getCurrentSite();
      this.zoomIn = zoomIn;
      // if (
      //   document.body.contains(
      //     document.getElementById('device_timeline' + this.selectedIndexDetails)
      //   )
      // ) {
      //   var myobj = document.getElementById(
      //     'device_timeline' + this.selectedIndexDetails
      //   );
      //   myobj.remove();
      //   alert('Element exists!');
      // } else {
      //   alert('Element does not exist!');
      // }
      /* istanbul ignore else*/
      if (zoomIn === 1) {
        this.apiPreviousDate =
          this.lastWeekDates[this.selectedDate].string_date;
        this.apiCurrentDate =
          this.lastWeekDates[this.selectedDate + 1].string_date;
      }
      /* istanbul ignore else*/
      if (zoomIn === 2) {
        this.isZoomIn = true;
        this.apiPreviousDate =
          this.lastWeekDates[this.selectedDate - 1].string_date;
        this.apiCurrentDate = this.lastWeekDates[this.selectedDate].string_date;
      }
      // console.log(this.lastWeekDates[this.selectedDate + 1].string_date);
      /* istanbul ignore else*/
      if (zoomIn === 0) {
        this.apiPreviousDate = this.lastWeekDates[1].string_date;
        this.apiCurrentDate =
          this.lastWeekDates[this.lastWeekDates.length - 1].string_date;
        this.isZoomIn = false;
      }
      // setTimeout(() => {
      this.fetchPromWeek(
        this.selectedSite,
        this.selectedSimDetails,
        this.selectedIndexDetails
      );
      // }, 100);
    }
  }

  siteConfigNew = [];

  siteDeviceInventory = [];

  // fetchDataNew(): any {
  //   this.globalService.getDeviceSims().subscribe((data: any[]) => {
  //     // this.getCurrentSite();
  //     // console.log(data);
  //     this.siteConfigNew = data;
  //     if (this.siteConfigNew.length > 0) {
  //       for (let i = 0; i < this.siteConfigNew.length; i++) {
  //         this.fetchProm2(this.selectedSite, this.siteConfigNew[i].sim, i);
  //         //console.log("+++++++++", this.siteConfig[0][i].sim)
  //       }
  //     }
  //   });
  // }

  // fetchDevicesInventory(): void {
  //   // console.log('lol');
  //   this.globalService.getDeviceInventory().subscribe((data: any[]) => {
  //     // this.getCurrentSite();
  //     // console.log(data);
  //     this.siteDeviceInventory = data;
  //   });
  // }

  fetchData(): void {
    // this.getCurrentSite();
    this.deviceService.getData().subscribe((result: Config) => {
      // console.log(result);
      const configArray = [];
      configArray.push(result);
      this.config = configArray;
      //console.log(this.config);
      configArray.map((item: Config) => {
        const sitesArray = [];
        const sitesDeviceGroups = [];
        const sitesSlices = [];
        const sitesSims = [];
        const tempSimInventory = [];
        const tempDeviceInventory = [];
        const sitesConfig = item.sites;
        //console.log(item.sites);
        sitesConfig.map((site) => {
          //console.log(site['display-name']);
          //console.log(this.selectedSite);
          /* istanbul ignore else*/
          if (site['site-id'] === this.selectedSite) {
            sitesArray.push(site.devices);
            // console.log(
            //   'This is Local sites array',
            //   this.selectedSite,
            //   sitesArray
            // );
            sitesDeviceGroups.push(site['device-groups']);
            // console.log(
            //   'this is LOcal DG Array',
            //   this.selectedSite,
            //   sitesDeviceGroups
            // );
            sitesSlices.push(site.slices);
            // console.log(
            //   'this is Local Slices Array',
            //   this.selectedSite,
            //   sitesSlices
            // );
            sitesSims.push(site.sims);
            // site.devices.forEach((device) => {
            //   console.log(device);
            //   if ('sim' in device) {
            //   } else {
            //     this.deviceInventory.push(site.devices);
            //   }
            //   console.log(this.deviceInventory);
            // });
          }
        });

        /* istanbul ignore else*/
        if (sitesArray.length > 0) {
          sitesArray[0].forEach((device) => {
            // console.log(device['serial-number']);
            sitesDeviceGroups[0].forEach((deviceGroup) => {
              deviceGroup.devices.forEach((num) => {
                if (device['serial-number'] === num) {
                  // console.log('lol', deviceGroup['display-name']);
                  device['device-group-in'] = deviceGroup['display-name'];
                  device['device-group-id-in'] = deviceGroup['device-group-id'];
                }
              });
            });
            sitesSlices[0].forEach((slices) => {
              slices['device-groups'].forEach((dg) => {
                if (device['device-group-id-in'] === dg) {
                  device['slice-in'] = slices['display-name'];
                }
              });
            });
          });

          sitesArray[0].forEach((device) => {
            if (!('sim' in device)) {
              tempDeviceInventory.push(device);
            }
            sitesSims[0].forEach((sim) => {
              if (sim.iccid === device.sim) {
                sim['connected'] = 0;
              }
            });
          });

          sitesSims[0].forEach((sim) => {
            if (!('connected' in sim)) {
              tempSimInventory.push(sim);
            }
          });
          console.log(sitesSims);
        }

        this.deviceInventory = tempDeviceInventory;
        this.simInventory = tempSimInventory;
        // console.log(this.deviceInventory);
        this.siteConfig = sitesArray;
        // console.log(this.siteConfig);
        /* istanbul ignore else*/
        if (this.siteConfig.length > 0) {
          for (let i = 0; i < this.siteConfig[0].length; i++) {
            if ('sim' in this.siteConfig[0][i]) {
              this.fetchProm2(this.selectedSite, this.siteConfig[0][i].sim, i);
              //console.log("+++++++++", this.siteConfig[0][i].sim)
            }
          }
        }
      });
      //console.log('This is global sites array', this.siteConfig);
      // console.log(this.config);
    });
  }

  addNewDevice1(): void {
    //console.log('addNewDevice');
    this.addNewDeviceSimError = false;
    /* istanbul ignore else*/
    if (this.deviceSimForm.invalid) {
      this.addNewDeviceSimError = true;
    }
    /* istanbul ignore else*/
    if (this.deviceSimForm.valid) {
      // this.deviceSimHelper.addDeviceSim({
      this.siteConfig[0].push({
        sim: this.deviceSimForm.value.newSim,
        'display-name': this.deviceSimForm.value.deviceName,
        imei: '300-365-3001',
        location: this.deviceSimForm.value.deviceLocation,
        'serial-number': this.deviceSimForm.value.deviceSerialNum,
        selected: 0,
        type: 'created type',
      });
      this.activeNewDeviceForm();
      // console.log(this.siteConfig);
      // } else {
      //   return;
      // }
      this.activeNewDevice = !this.activeNewDevice;
      this.addNewDeviceSimError = false;
    }
  }

  assignSelectedSite(): void {
    //console.log(this.deviceService.mySite1);
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      // this.siteSubscription = this.globalService.getSite().subscribe((data) => {
      //console.log(data);
      this.selectedSite = data;
      // this.deviceSimHelper.selectedSite = data;
      //console.log(this.selectedSite);
      this.fetchData();
      // this.fetchDataNew();
      // this.fetchDevicesInventory();

      // this.globalService.fetchDeviceSims(data);
      // this.globalService.fetchDeviceInventory(data);
    });
  }

  assignSelectedSim(): void {
    this.deviceService.getSim1().subscribe((data) => {
      // this.selectedSim = data;
      //console.log(this.selectedSim);
      this.deviceSimForm.patchValue(
        {
          newSim: data,
        },
        { emitEvent: false }
      );
    });
  }

  assignSelectedDevice(): void {
    // this.deviceService.getDevice().subscribe((data) => {
    //   // this.selectedDevice = data;
    //   //console.log(this.selectedSim);
    //   this.deviceSimForm.patchValue({
    //     deviceSerialNum: data,
    //   });
    // });
    this.deviceService.getDevice1().subscribe((data) => {
      console.log(data);
      this.deviceSimForm.patchValue(
        {
          deviceName: data['display-name'],
          deviceLocation: data['location'],
          deviceSerialNum: data['serial-number'],
        },
        { emitEvent: false }
      );
    });
  }

  editTrigger(index: number): void {
    this.closeEdit();
    this.closeDetails();
    const editDeviceIndex = this.editDevices.indexOf(index);
    if (editDeviceIndex >= 0) {
      //console.log('if');
      this.editDevices.splice(editDeviceIndex, 1);
    } else {
      //console.log('else');
      //console.log(this.siteConfig[0][index]);
      this.siteConfig[0][index].form = new FormGroup({
        newSim: new FormControl(
          this.siteConfig[0][index].sim,
          Validators.required
        ),
        deviceName: new FormControl(
          this.siteConfig[0][index]['display-name'],
          Validators.required
        ),
        deviceLocation: new FormControl(
          this.siteConfig[0][index].location,
          Validators.required
        ),
        deviceSerialNum: new FormControl(
          this.siteConfig[0][index]['serial-number'],
          Validators.required
        ),
      });
      this.editDevices.push(index);
      this.deviceSimEditForm = this.siteConfig[0][index].form;
    }
  }

  getEditControl(deviceSimEditForm: FormGroup, param: string): FormControl {
    return deviceSimEditForm.get(param) as FormControl;
  }

  deleteDevice(index: number): void {
    const simIccid = this.siteConfig[0][index].sim;
    // const siteName = this.siteConfig[0][index]['display-name'];
    //console.log(siteName);
    this.simInventory.push({ simIccid });
    //console.log('The Detached sims are: ', this.simInventory);
    delete this.siteConfig[0][index].sim;
    //console.log('Before deleting the device', this.siteConfig);
    this.deviceInventory.push(this.siteConfig[0][index]);
    //console.log(this.deviceInventory);
    this.siteConfig[0].splice(index, 1);
    //console.log(this.deviceInventory);
  }

  cancelSim(index: number): void {
    const simIccid = this.siteConfig[0][index].sim;
    this.cancelledSimsStorage.push({ simIccid });
    //console.log('THe Cancelled SIMS are: -->', this.cancelledSimsStorage);
    delete this.siteConfig[0][index].sim;
    this.deviceInventory.push(this.siteConfig[0][index]);
    //console.log(this.deviceInventory);
    this.siteConfig[0].splice(index, 1);
    this.closeEdit();
    this.closeEditInventory();
  }

  openDialog(): void {
    this.deviceService.mySims(this.simInventory);
    // console.log(this.simInventory);
    this.dialog.open(SelectSimsComponent, {
      width: '690px',
    });
  }

  openDialog1(): void {
    this.deviceService.myDevices(this.deviceInventory);
    this.dialog.open(SelectDevicesComponent, {
      width: '870px',
    });
  }

  openDeleteDialog(deviceIndex: number): void {
    const dialogRef = this.dialog.open(DeleteDevicesComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore else*/
      if (result == 'true') {
        this.deleteDevice(deviceIndex);
      }
      this.closeEdit();
    });
  }

  closeEdit(): void {
    this.activeNewDevice = false;
    this.editDevices.pop();
  }

  actualEdit(index: number): void {
    this.editDeviceSimError = false;
    /* istanbul ignore else*/
    if (this.deviceSimEditForm.invalid) {
      this.editDeviceSimError = true;
    }
    /* istanbul ignore else*/
    if (this.deviceSimEditForm.valid) {
      const form = this.siteConfig[0][index].form.value;
      // this.deviceSimHelper.editDeviceSim(index, form);
      const device = this.siteConfig[0][index];
      device.sim = form.newSim;
      device['display-name'] = form.deviceName;
      device.location = form.deviceLocation;
      device['serial-number'] = form.deviceSerialNum;
      this.closeEdit();
    }
  }

  addNewDeviceInventory(): void {
    // console.log('add NewDevice to Inventory');
    this.addNewInventoryDeviceError = false;
    /* istanbul ignore else*/
    if (this.inventoryDeviceSimForm.invalid) {
      this.addNewInventoryDeviceError = true;
    }
    /* istanbul ignore else*/
    if (this.inventoryDeviceSimForm.valid) {
      // this.deviceSimHelper.addDeviceToInventory({
      this.deviceInventory.push({
        'display-name': this.inventoryDeviceSimForm.value.inventoryDeviceName,
        imei: '700-765-7001',
        location: this.inventoryDeviceSimForm.value.inventoryDeviceLocation,
        'serial-number':
          this.inventoryDeviceSimForm.value.inventoryDeviceSerialNum,
        type: this.inventoryDeviceSimForm.value.inventoryDeviceType,
        selected: 0,
      });
      this.addNewDeviceFun();
    }
  }

  inventoryEditTrigger(index: number): void {
    this.addNewDevice = false;
    this.closeEditInventory();
    const editInventoryIndex = this.editInventory.indexOf(index);
    if (editInventoryIndex >= 0) {
      this.editInventory.splice(editInventoryIndex, 1);
    } else {
      this.deviceInventory[index].form = new FormGroup({
        inventoryDeviceName: new FormControl(
          this.deviceInventory[index]['display-name'],
          Validators.required
        ),
        inventoryDeviceLocation: new FormControl(
          this.deviceInventory[index]['location'],
          Validators.required
        ),
        inventoryDeviceSerialNum: new FormControl(
          this.deviceInventory[index]['serial-number'],
          Validators.required
        ),
        inventoryDeviceType: new FormControl(
          this.deviceInventory[index]['type'],
          Validators.required
        ),
      });
      this.editInventory.push(index);
      this.inventoryEditForm = this.deviceInventory[index].form;
    }
  }

  getEditInventoryControl(
    inventoryEditForm: FormGroup,
    param: string
  ): FormControl {
    return inventoryEditForm.get(param) as FormControl;
  }

  actualInventoryEdit(inventoryDeviceIndex: number): void {
    this.editInventoryDeviceError = false;
    /* istanbul ignore else*/
    if (this.inventoryEditForm.invalid) {
      this.editInventoryDeviceError = true;
    }
    /* istanbul ignore else*/
    if (this.inventoryEditForm.valid) {
      const form = this.deviceInventory[inventoryDeviceIndex].form.value;
      const inventoryDevice = this.deviceInventory[inventoryDeviceIndex];
      inventoryDevice['display-name'] = form.inventoryDeviceName;
      inventoryDevice['type'] = form.inventoryDeviceType;
      inventoryDevice.location = form.inventoryDeviceLocation;
      inventoryDevice['serial-number'] = form.inventoryDeviceSerialNum;
      this.closeEditInventory();
    }
    //console.log(this.deviceInventory);
  }

  deleteInventoryDevice(inventoryDeviceIndex: number): void {
    this.deviceInventory.splice(inventoryDeviceIndex, 1);
  }

  openDeleteInventoryDialog(inventoryDeviceIndex: number): void {
    const dialogRef = this.dialog.open(DeleteInventoryComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* istanbul ignore else*/
      if (result == 'true') {
        this.deleteInventoryDevice(inventoryDeviceIndex);
      }
      this.closeEditInventory();
    });
  }

  closeEditInventory(): void {
    this.editInventory.pop();
  }

  detailsTrigger(index: number, sim: string): void {
    // this.getCurrentSite();
    this.selectedDate = -1;
    this.zoomIn = 0;
    this.isZoomIn = false;

    this.deviceSimsDetailsProgressToggleDay = true;
    this.deviceSimsDetailsProgressToggleWeek = false;
    this.selectedSimDetails = sim;
    this.selectedIndexDetails = index;
    // this.removePreviousChart();
    this.closeDetails();
    this.closeEdit();
    const deviceDetailsIndex = this.deviceDetails.indexOf(index);
    if (deviceDetailsIndex >= 0) {
      this.deviceDetails.splice(deviceDetailsIndex, 1);
    } else {
      this.deviceDetails.push(index);
    }
    this.fetchProm(this.selectedSite, sim, index);
    // this.fetchDots(this.selectedSite, sim);
    // this.testDot();
  }

  closeDetails(): void {
    this.activeNewDevice = false;
    this.deviceDetails.pop();
  }

  // removePreviousChart(): any {
  //   if (document.body.contains(document.getElementById('device_timeline'))) {
  //     const chartObj = document.getElementById('device_timeline');
  //     chartObj.remove();
  //   }
  // }

  getLoginCreds(): void {
    const getMetaLogin = this.meta.getTag('name=onflogin');
    this.loginCreds = getMetaLogin.content;
  }

  fetchPromApiWeek(site: string, iccid: string): Observable<TimelineData> {
    // console.log('meta info', getMeta.content);
    const headers = {
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(this.loginCreds),
    };
    const query: string = `/query_range?query=device_connected_status{site="${site}",iccid="${iccid}"}&start=${this.apiPreviousDate}&end=${this.apiCurrentDate}&step=60m`;

    // console.log(
    //   '+++++++++++++++++++++++++++++++++++++++++ ||||||||||||||||||||||||',
    //   query
    // );
    return this.http.get<TimelineData>(this.deviceService.promApiUrl + query, {
      headers,
    });
  }

  fetchPromApi(site: string, iccid: string): Observable<TimelineData> {
    this.formatDate();
    const headers = {
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(this.loginCreds),
    };
    const currentDate = new Date(new Date().getTime());
    const apiCurrentDate = currentDate.toISOString();
    const previousDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const apiPreviousDate = previousDate.toISOString();
    const query: string = `/query_range?query=device_connected_status{site="${site}",iccid="${iccid}"}&start=${apiPreviousDate}&end=${apiCurrentDate}&step=60m`;

    //console.log(query);
    return this.http.get<TimelineData>(this.deviceService.promApiUrl + query, {
      headers,
    });
  }

  fetchPromWeek(site: string, iccid: string, index: number): void {
    // console.log(this.apiPreviousDate);
    // console.log(this.apiCurrentDate);
    this.timesArray.splice(0, this.timesArray.length);
    this.timesDiffArray.splice(0, this.timesDiffArray.length);
    this.fetchPromApiWeek(site, iccid).subscribe((data) => {
      // TODO
      // this.deviceService
      //   .getPromWeekData(site, iccid, this.apiPreviousDate, this.apiCurrentDate)
      //   .subscribe((data) => {
      // TODO
      // console.log(data);
      let valuesArray = [];
      // valuesArray.push(data.data.result[0].values);
      valuesArray = data.data.result[0].values;
      // console.log(valuesArray);
      const timesObject: {
        starting_time: string;
        ending_time: string;
        display: string;
      } = { starting_time: '', ending_time: '', display: '' };
      timesObject.starting_time = '';
      timesObject.ending_time = '';
      timesObject.display = 'rect';
      const timesArray = [];
      // console.log(valuesArray);
      valuesArray.forEach((el, index) => {
        // console.log(el[1], timesObject);
        // console.log(timesObject.starting_time);
        /* istanbul ignore else*/
        if (el[1] === '1' && timesObject.starting_time === '') {
          // console.log('if1');
          timesObject.starting_time = valuesArray[index][0];

          // console.log(timesObject.starting_time);
        }
        /* istanbul ignore else*/
        if (el[1] === '0' && timesObject.starting_time !== '') {
          // console.log('else-if1');
          timesObject.ending_time = valuesArray[index - 1][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
        /* istanbul ignore else*/
        if (index === valuesArray.length - 1 && el[1] === '1') {
          // console.log('if2');
          timesObject.ending_time = valuesArray[index][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
      });
      // console.log(timesArray);
      this.timesArray = timesArray;
      const eventArray1 = [];
      const eventArray2 = [];
      const eventArray3 = [];
      const eventArray4 = [];
      const eventArray5 = [];
      this.fetchDotsApiWeek(site, iccid).subscribe((eventData) => {
        //  TODO
        // this.deviceService
        //   .getPromDotsData(
        //     site,
        //     iccid,
        //     this.apiPreviousDate,
        //     this.apiPreviousTime,
        //     this.apiCurrentDate,
        //     this.apiCurrentTime
        //   )
        //   .subscribe((eventData) => {
        // TODO
        // console.log(eventData);
        // console.log(eventData.data.result);
        // const mainObject = {};
        // const eventArray: any[] = [];
        // eventArray = eventData.data.result[0].values[0][0];

        const eventObject: TimesObject = {
          starting_time: '',
          display: '',
          msg: '',
          name: '',
        };
        // const eventStorageArray = [];
        eventData.data.result.forEach((eventCore) => {
          // console.log(eventCore.metric.time);
          // const eventDate = new Date(eventCore.metric.time).getTime() / 1000;

          // eventStorageArray.push(eventDate);
          // console.log(lolArray);
          // console.log(eventDate);
          // console.log(eventCore.values[0][1]);
          if (eventCore.values[0][1] === '1') {
            // console.log('if-1');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray1.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '2') {
            // console.log('if-2');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray2.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '3') {
            // console.log('if-3');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray3.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '4') {
            // console.log('if-4');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray4.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '5') {
            // console.log('if-5');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray5.push({ ...eventObject });
          }
        });

        // eventObject.starting_time = eventData.data.result[0].values[0][0];
        eventObject.display = 'circle';
        // eventArray.push({ ...eventObject });
        // console.log(eventArray1);
        // mainObject.times = eventArray;

        this.valuesArrayFinal[0].times = timesArray;
        this.valuesArrayFinal[1].times = eventArray1;
        this.valuesArrayFinal[2].times = eventArray2;
        this.valuesArrayFinal[3].times = eventArray3;
        this.valuesArrayFinal[4].times = eventArray4;
        this.valuesArrayFinal[5].times = eventArray5;
        // valuesArray.forEach((eachItem, index) => {
        // console.log(eachItem, index);
        //   if (index == valuesArray.length - 1 || index == 0) {
        // console.log(valuesArray[index]);
        //   }
        // });
        // console.log(timesObject);
        // console.log(this.timesArray);
        const finalArray = this.valuesArrayFinal;
        // console.log(finalArray);
        // for (let i = 0; i < this.siteConfig[0].length; i++) {
        //   if (
        //     'sim' in this.siteConfig[0][i] &&
        //     finalArray[0].times.length > 0
        //   ) {
        this.displayChart(finalArray, index);
        // }
        // }
      });

      // this.valuesArrayFinal[0].times = [];
    });

    // console.log(this.timesArray);
    // console.log(this.valuesArrayFinal);
  }

  fetchProm(site: string, iccid: string, index: number): void {
    //console.log(this.apiPreviousDate);
    //console.log(this.apiCurrentDate);
    this.timesArray.splice(0, this.timesArray.length);
    this.timesDiffArray.splice(0, this.timesDiffArray.length);
    this.formatDate();
    this.fetchPromApi(site, iccid).subscribe((data) => {
      // TODO
      // this.deviceService
      //   .getPromDayData(
      //     site,
      //     iccid,
      //     this.apiPreviousDate,
      //     this.apiPreviousTime,
      //     this.apiCurrentDate,
      //     this.apiCurrentTime
      //   )
      //   .subscribe((data) => {
      // TODO
      // console.log(data);
      // console.log(typeof(data.data.result[0].values[0][1]));
      //console.log(data.data.result[0]);
      let valuesArray = [];
      // valuesArray.push(data.data.result[0].values);
      valuesArray = data.data.result[0].values;
      //console.log(valuesArray);
      const timesObject: TimesObject = {
        starting_time: '',
        ending_time: '',
        display: '',
      };
      timesObject.starting_time = '';
      timesObject.ending_time = '';
      timesObject.display = 'rect';
      const timesArray = [];
      // console.log(valuesArray);
      valuesArray.forEach((el, index) => {
        //console.log(el[1], timesObject);
        //console.log(timesObject.starting_time);
        /* istanbul ignore else*/
        if (el[1] === '1' && timesObject.starting_time === '') {
          //console.log('if1');
          timesObject.starting_time = valuesArray[index][0];

          //console.log(timesObject.starting_time);
        }
        /* istanbul ignore else*/
        if (el[1] === '0' && timesObject.starting_time !== '') {
          //console.log('else-if1');
          timesObject.ending_time = valuesArray[index - 1][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
        /* istanbul ignore else*/
        if (index === valuesArray.length - 1 && el[1] === '1') {
          //console.log('if2');
          timesObject.ending_time = valuesArray[index][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
      });
      // console.log(timesArray);
      this.timesArray = timesArray;
      const eventArray1 = [];
      const eventArray2 = [];
      const eventArray3 = [];
      const eventArray4 = [];
      const eventArray5 = [];
      this.fetchDotsApi(site, iccid).subscribe((eventData) => {
        //  TODO
        // this.deviceService
        //   .getPromDotsData(
        //     site,
        //     iccid,
        //     this.apiPreviousDate,
        //     this.apiPreviousTime,
        //     this.apiCurrentDate,
        //     this.apiCurrentTime
        //   )
        //   .subscribe((eventData) => {
        // TODO
        // console.log(eventData);
        // console.log(eventData.data.result);
        // const mainObject = {};
        // const eventArray: any[] = [];
        // eventArray = eventData.data.result[0].values[0][0];

        const eventObject: TimesObject = {
          starting_time: '',
          display: '',
          msg: '',
          name: '',
        };
        // const eventStorageArray = [];
        eventData.data.result.forEach((eventCore) => {
          // console.log(eventCore.metric.time);
          // const eventDate = new Date(eventCore.metric.time).getTime() / 1000;

          // eventStorageArray.push(eventDate);
          // console.log(lolArray);
          // console.log(eventDate);
          // console.log(eventCore.values[0][1]);
          if (eventCore.values[0][1] === '1') {
            // console.log('if-1');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray1.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '2') {
            // console.log('if-2');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray2.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '3') {
            // console.log('if-3');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray3.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '4') {
            // console.log('if-4');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray4.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '5') {
            // console.log('if-5');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            const eventMsg = eventCore.metric.msg;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventObject.msg = eventMsg;
            eventObject.name = '';
            eventArray5.push({ ...eventObject });
          }
        });

        // eventObject.starting_time = eventData.data.result[0].values[0][0];
        eventObject.display = 'circle';
        // eventArray.push({ ...eventObject });
        // console.log(eventArray1);
        // mainObject.times = eventArray;

        this.valuesArrayFinal[0].times = timesArray;
        this.valuesArrayFinal[1].times = eventArray1;
        this.valuesArrayFinal[2].times = eventArray2;
        this.valuesArrayFinal[3].times = eventArray3;
        this.valuesArrayFinal[4].times = eventArray4;
        this.valuesArrayFinal[5].times = eventArray5;

        const finalArray = this.valuesArrayFinal;
        // console.log(finalArray);
        console.log(finalArray);
        /* istanbul ignore else*/
        if (finalArray[0].times.length > 0) {
          this.displayChart(finalArray, index);
        }
        // document.getElementById('');
        // this.displaySmallChart(finalArray, index);
        // this.valuesArrayFinal[0].times = [];
        // console.log(finalArray);
        // this.valuesArrayFinal.push(mainObject);
        // console.log(this.valuesArrayFinal);
      });
      // valuesArray.forEach((eachItem, index) => {
      //console.log(eachItem, index);
      //   if (index == valuesArray.length - 1 || index == 0) {
      //console.log(valuesArray[index]);
      //   }
      // });
      //console.log(timesObject);
      //console.log(this.timesArray);
    });

    //console.log(this.timesArray);
    //console.log(this.valuesArrayFinal);
  }

  // testDotsApi(): any {
  //   const headers = {
  //     Accept: 'application/json',
  //     // Authorization:
  //     //   'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt'),
  //   };
  //   const query: string =
  //     '/query_range?query=device_connection_event_core{site="fremont", iccid="123-456-789"}&start=2022-02-06T13:26:00.000Z&end=2022-02-07T13:26:00.000Z&step=1d';
  //   return this.http.get(this.deviceService.promApiUrl + query, { headers });
  // }

  // testDot(): void {
  //   this.testDotsApi().subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  fetchDotsApi(site: string, iccid: string): Observable<TimelineData> {
    // this.formatDate();
    // TODO #toISOString
    // const currentDate = new Date(new Date().getTime());
    // const apiCurrentDate = currentDate.toISOString();
    // const previousDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    // const apiPreviousDate = previousDate.toISOString();
    const headers = {
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(this.loginCreds),
    };
    // const query: string = `/query_range?query=device_connected_status{site="${site}",iccid="${iccid}"}&start=${apiPreviousDate}&end=${apiCurrentDate}&step=1d`;
    const query: string =
      '/query_range?query=device_connection_event_core{site="' +
      site +
      '", iccid="' +
      iccid +
      '"}&start=' +
      this.apiPreviousDate +
      'T' +
      this.apiPreviousTime +
      '.000Z&end=' +
      this.apiCurrentDate +
      'T' +
      this.apiCurrentTime +
      '.000Z&step=1d';

    //console.log(query);
    return this.http.get<TimelineData>(this.deviceService.promApiUrl + query, {
      headers,
    });
  }

  fetchDotsApiWeek(site: string, iccid: string): Observable<TimelineData> {
    // this.formatDate();
    // TODO #toISOString
    // const currentDate = new Date(new Date().getTime());
    // const apiCurrentDate = currentDate.toISOString();
    // const previousDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    // const apiPreviousDate = previousDate.toISOString();
    const headers = {
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(this.loginCreds),
    };
    // const query: string = `/query_range?query=device_connected_status{site="${site}",iccid="${iccid}"}&start=${apiPreviousDate}&end=${apiCurrentDate}&step=1d`;
    const query: string =
      '/query_range?query=device_connection_event_core{site="' +
      site +
      '", iccid="' +
      iccid +
      '"}&start=' +
      this.apiPreviousDate +
      '&end=' +
      this.apiCurrentDate +
      '&step=1d';

    //console.log(query);
    return this.http.get<TimelineData>(this.deviceService.promApiUrl + query, {
      headers,
    });
  }

  // mouseover(d: any, i: any, datum: any) {
  //   console.log(d, i, datum);
  // }

  displayChart(chartData: TimelineTimes[], index: number): void {
    // alert("test");
    // document.getElementById('small_device_timeline' + index).remove();
    // const width = '100%';
    // console.log(this.innerWidth);
    // const width = this.innerWidth - 648;
    const width = 1200;
    // console.log(width);
    const height = 50;

    const colorScale = d3
      .scaleOrdinal()
      .range([
        '#06D6A0',
        '#EF233C',
        '#FFA500',
        '#FFFF00',
        '#0000FF',
        '#06D6A0',
        '#ffffff',
      ])
      .domain(['1', '2', '3', '4', '5', '6', '']);

    const chart = d3Time
      .timelines()
      // .showTimeAxis()
      // .background('#fff')
      .colors(colorScale)
      .colorProperty('activeStatus')
      .margin({ left: 0, right: 0, top: 30, bottom: 0 });

    // .on('mouseover', function (d, index, chartData) {
    //   this.mouseover(d, index, chartData);
    // });

    // const tooltip = d3
    //   // .select('#device_timeline' + index)
    //   .select('#tooltip_display')
    //   .append('div')
    //   .style('position', 'absolute')
    //   .style('z-index', '10')
    //   .style('visibility', 'hidden')
    //   .style('background', '#06D6A0')
    //   // .style('left', '100px')
    //   .text('a simple tooltip');

    // const tooltip1 = d3
    //   // .select('#device_timeline' + index)
    //   .select('#tooltip_display1')
    //   .append('div')
    //   .style('position', 'absolute')
    //   .style('z-index', '10')
    //   .style('visibility', 'hidden')
    //   .style('background', '#06D6A0')
    //   // .style('left', '100px')
    //   .text('a simple tooltip');

    const tooltip2 = d3
      // .select('#device_timeline' + index)
      .select('#tooltip_display2')
      .append('div')
      .attr('class', 'tooltip_display');
    // .style('position', 'absolute')
    // .style('z-index', '10')
    // .style('visibility', 'hidden')
    // .style('background', '#FFFFFF')
    // .style('box-shadow', 10 + 'px')
    // .style('color', '#EF233C')
    // .style('padding', 8 + 'px')
    // .style('font-family', 'Inter')
    // .style('font-style', 'normal')
    // .style('font-size', 12 + 'px')
    // .style('line-height', 16 + 'px')
    // .style('letter-spacing', 0.02 + 'em')
    // .style('left', '100px')
    // .text('a simple tooltip');
    // d3.select('rect').attr('rx', 10).attr('ry', 10);
    // console.log('THis is ChartData', chartData);
    // console.log('This is just chart', chart);
    // if (document.getElementById('#device_timeline' + index))
    d3.select('#device_timeline' + index)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .datum(chartData)
      .call(chart)
      .attr('y', 10)
      .on('mouseover', (d) => {
        // console.log(d, i);
        const tooltipTimeInt = parseInt(
          d.srcElement.__data__.starting_time,
          10
        );

        function getDateSuffix(n) {
          // console.log(n);
          const dateSuffix = ['st', 'nd', 'rd'];
          const exceptionDates = [11, 12, 13];
          const nth =
            dateSuffix[(n % 10) - 1] == undefined ||
            exceptionDates.includes(n % 100)
              ? 'th'
              : dateSuffix[(n % 10) - 1];
          return n + nth;
        }

        const tooltipTimeStr = tooltipTimeInt.toString() + '000';
        const tooltipTime = parseInt(tooltipTimeStr, 10);
        // tooltip.text(new Date(d.srcElement.__data__.starting_time) + 'index');
        // tooltip1.text(d.srcElement.__data__.msg);
        const currentTooltipTime = new Date(tooltipTime);
        const hours = currentTooltipTime.getHours();
        const correctHours = hours <= 9 ? '0' + hours : hours;
        const minutes = currentTooltipTime.getMinutes();
        const correctminutes = minutes <= 9 ? '0' + minutes : minutes;
        const date = currentTooltipTime.getDate();
        const correctDate = getDateSuffix(date);
        const month = currentTooltipTime.toLocaleString('default', {
          month: 'short',
        });
        const year = currentTooltipTime.getFullYear();
        tooltip2.html(
          d.srcElement.__data__.msg +
            '<br>' +
            'Time: ' +
            correctHours +
            ':' +
            correctminutes +
            ',' +
            ' ' +
            correctDate +
            ' ' +
            month +
            ' ' +
            year
        );
        if (d.srcElement.__data__.msg) {
          return (
            // console.log(
            //   Math.round(d.srcElement.__data__.starting_time) + parseInt('000')
            // ),
            // tooltip.style('visibility', 'visible'),
            // tooltip.style('left', d.clientX - 370 + 'px'),
            // tooltip1.style('visibility', 'visible'),
            // tooltip1.style('left', d.clientX - 370 + 'px'),
            tooltip2.style('visibility', 'visible'),
            tooltip2.style('left', d.clientX - 370 + 'px')
          );
        }
        return tooltip2.style('visibility', 'hidden');
        //
      })

      // .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on('mousemove', function () {
        // return console.log('mousemove function');
      })

      .on('mouseout', function () {
        return (
          // tooltip.style('visibility', 'hidden'),
          // tooltip1.style('visibility', 'hidden'),
          tooltip2.style('visibility', 'hidden')
        );
      })

      .on('click', function () {
        // return console.log('mousemove function');
      });
    // d3Time.timelines().hover(function (d, i, datum) {
    // console.log(d, i, datum);
    // d is the current rendering object
    // i is the index during d3 rendering
    // datum is the data object
    // });
  }

  displaySmallChart(chartData: TimelineTimes[], index: number): void {
    // alert("test");
    const width = 500;
    const height = 50;

    const colorScale = d3
      .scaleOrdinal()
      .range([
        '#06D6A0',
        '#EF233C',
        '#FFA500',
        '#FFFF00',
        '#0000FF',
        '#06D6A0',
        '#ffffff',
      ])
      .domain(['1', '2', '3', '4', '5', '6', '']);

    const chart = d3Time
      .timelines()
      .colors(colorScale)
      .colorProperty('activeStatus')
      .margin({ left: 0, right: 0, top: 30, bottom: 0 });

    d3.select('#small_device_timeline' + index)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .datum(chartData)
      .call(chart);
  }

  // test5(deviceIndex: number, simNumber: string): void {
  //   this.fetchProm2(this.selectedSite, simNumber, deviceIndex);
  // }

  fetchProm2(site: string, iccid: string, index: number): void {
    //console.log(this.apiPreviousDate);
    //console.log(this.apiCurrentDate);
    this.timesArray.splice(0, this.timesArray.length);
    this.timesDiffArray.splice(0, this.timesDiffArray.length);
    this.fetchPromApi(site, iccid).subscribe((data) => {
      //  TODO
      this.formatDate();
      // this.deviceService
      //   .getPromDayData(
      //     site,
      //     iccid,
      //     this.apiPreviousDate,
      //     this.apiPreviousTime,
      //     this.apiCurrentDate,
      //     this.apiCurrentTime
      //   )
      //   .subscribe((data) => {
      // TODO
      //console.log(data.data.result[0]);
      let valuesArray = [];
      // valuesArray.push(data.data.result[0].values);
      valuesArray = data.data.result[0].values;
      //console.log(valuesArray);
      const timesObject: TimesObject = {
        starting_time: '',
        ending_time: '',
        display: '',
      };
      timesObject.starting_time = '';
      timesObject.ending_time = '';
      timesObject.display = 'rect';
      const timesArray = [];
      //console.log(valuesArray);
      valuesArray.forEach((el, index) => {
        //console.log(el[1], timesObject);
        //console.log(timesObject.starting_time);
        /* istanbul ignore else*/
        if (el[1] === '1' && timesObject.starting_time === '') {
          //console.log('if1');
          timesObject.starting_time = valuesArray[index][0];

          //console.log(timesObject.starting_time);
        }
        /* istanbul ignore else*/
        if (el[1] === '0' && timesObject.starting_time !== '') {
          //console.log('else-if1');
          timesObject.ending_time = valuesArray[index - 1][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
        /* istanbul ignore else*/
        if (index === valuesArray.length - 1 && el[1] === '1') {
          //console.log('if2');
          timesObject.ending_time = valuesArray[index][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
      });
      //console.log(timesArray);
      this.timesArray = timesArray;

      const eventArray1 = [];
      const eventArray2 = [];
      const eventArray3 = [];
      const eventArray4 = [];
      const eventArray5 = [];
      this.fetchDotsApi(site, iccid).subscribe((eventData) => {
        // TODO
        // this.deviceService
        //   .getPromDotsData(
        //     site,
        //     iccid,
        //     this.apiPreviousDate,
        //     this.apiPreviousTime,
        //     this.apiCurrentDate,
        //     this.apiCurrentTime
        //   )
        //   .subscribe((eventData) => {
        // TODO
        // console.log(eventData);
        // console.log(eventData.data.result);
        // const mainObject = {};
        // const eventArray: any[] = [];
        // eventArray = eventData.data.result[0].values[0][0];
        const eventObject: TimesObject = {
          starting_time: '',
          display: '',
        };
        const lolArray = [];
        eventData.data.result.forEach((eventCore) => {
          // console.log(eventCore.metric.time);
          const eventDate = new Date(eventCore.metric.time).getTime() / 1000;

          lolArray.push(eventDate);
          // console.log(lolArray);
          // console.log(eventDate);
          // console.log(eventCore.values[0][1]);
          if (eventCore.values[0][1] === '1') {
            // console.log('if-1');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventArray1.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '2') {
            // console.log('if-2');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventArray2.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '3') {
            // console.log('if-3');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventArray3.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '4') {
            // console.log('if-4');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventArray4.push({ ...eventObject });
          }
          if (eventCore.values[0][1] === '5') {
            // console.log('if-5');
            const eventDate = new Date(eventCore.metric.time).getTime() / 1000;
            eventObject.starting_time = eventDate;
            eventObject.display = 'circle';
            eventArray5.push({ ...eventObject });
          }
        });

        // eventObject.starting_time = eventData.data.result[0].values[0][0];
        // eventObject.display = 'circle';
        // eventArray.push({ ...eventObject });
        // console.log(eventArray1);
        // mainObject.times = eventArray;

        this.valuesArrayFinal[0].times = timesArray;
        this.valuesArrayFinal[1].times = eventArray1;
        this.valuesArrayFinal[2].times = eventArray2;
        this.valuesArrayFinal[3].times = eventArray3;
        this.valuesArrayFinal[4].times = eventArray4;
        this.valuesArrayFinal[5].times = eventArray5;

        const finalArray = this.valuesArrayFinal;

        /* istanbul ignore else*/
        if (finalArray[0].times.length > 0) {
          this.displaySmallChart(finalArray, index);
        }
        // this.displaySmallChart(finalArray, index);
        // this.valuesArrayFinal[0].times = [];
        // console.log(finalArray);
        // this.valuesArrayFinal.push(mainObject);
        // console.log(this.valuesArrayFinal);
      });

      // this.valuesArrayFinal[0].times = timesArray;
      // const finalArray = this.valuesArrayFinal;
      // //console.log(finalArray);
      // this.displaySmallChart(finalArray, index);
      // this.valuesArrayFinal[0].times = [];
    });
  }

  formatDate(): void {
    const currentDate = new Date(new Date().getTime());
    const previousDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const reqPreviousDate = new Date(previousDate);
    const reqCurrentDate = new Date(currentDate);
    //console.log(reqCurrentDate);

    let reqPreviousMonth = '' + (reqPreviousDate.getMonth() + 1);
    let reqPreviousDay = '' + reqPreviousDate.getDate();
    const reqPreviousYear = reqPreviousDate.getFullYear();
    const reqPreviousHours = '' + reqPreviousDate.getHours();
    let reqPreviousMinutes = '' + reqPreviousDate.getMinutes();
    let reqPreviousSeconds = '' + reqPreviousDate.getSeconds();

    let reqCurrentMonth = '' + (reqCurrentDate.getMonth() + 1);
    let reqCurrentDay = '' + reqCurrentDate.getDate();
    const reqCurrentYear = reqCurrentDate.getFullYear();
    const reqCurrentHours = '' + reqCurrentDate.getHours();
    let reqCurrentMinutes = '' + reqCurrentDate.getMinutes();
    let reqCurrentSeconds = '' + reqCurrentDate.getSeconds();

    /* istanbul ignore else*/
    if (reqPreviousMonth.length < 2) reqPreviousMonth = '0' + reqPreviousMonth;
    /* istanbul ignore else*/
    if (reqPreviousDay.length < 2) reqPreviousDay = '0' + reqPreviousDay;
    /* istanbul ignore else*/
    if (reqPreviousMinutes.length < 2)
      reqPreviousMinutes = '0' + reqPreviousMinutes;
    /* istanbul ignore else*/
    if (reqPreviousSeconds.length < 2)
      reqPreviousSeconds = '0' + reqPreviousSeconds;

    /* istanbul ignore else*/
    if (reqCurrentMonth.length < 2) reqCurrentMonth = '0' + reqCurrentMonth;
    /* istanbul ignore else*/
    if (reqCurrentDay.length < 2) reqCurrentDay = '0' + reqCurrentDay;
    /* istanbul ignore else*/
    if (reqCurrentMinutes.length < 2)
      reqCurrentMinutes = '0' + reqCurrentMinutes;
    /* istanbul ignore else*/
    if (reqCurrentSeconds.length < 2)
      reqCurrentSeconds = '0' + reqCurrentSeconds;

    const apiPreviousDate = [
      reqPreviousYear,
      reqPreviousMonth,
      reqPreviousDay,
    ].join('-');
    const apiPreviousTime = [
      reqPreviousHours,
      reqPreviousMinutes,
      reqPreviousSeconds,
    ].join(':');
    const apiCurrentDate = [
      reqCurrentYear,
      reqCurrentMonth,
      reqCurrentDay,
    ].join('-');
    const apiCurrentTime = [
      reqCurrentHours,
      reqCurrentMinutes,
      reqCurrentSeconds,
    ].join(':');
    this.apiPreviousDate = apiPreviousDate;
    this.apiPreviousTime = apiPreviousTime;
    this.apiCurrentDate = apiCurrentDate;
    this.apiCurrentTime = apiCurrentTime;
    //console.log('prev: ', apiPreviousDate, 'current: ', apiCurrentDate);
  }

  // deviceSimsDetailItemDetailsPopUpFun(): void {
  //   this.deviceSimsDetailItemDetailsPopUp = true;
  //   this.deviceSimsDetailViewEditForm = false;
  //   this.activeNewDevice = false;
  // }
  // deviceSimsDetailItemDetailsPopUpClose(): void {
  //   this.deviceSimsDetailItemDetailsPopUp = false;
  //   this.activeNewDevice = false;
  // }
  // deviceSimsDetailViewEditFormFun(): void {
  //   this.deviceSimsDetailViewEditForm = true;
  //   this.deviceSimsDetailItemDetailsPopUp = false;
  //   this.activeNewDevice = false;
  // }
  // deviceSimsDetailViewEditFormClose(): void {
  //   this.deviceSimsDetailViewEditForm = false;
  //   this.activeNewDevice = false;
  // }

  deviceSimsDetailsProgressToggleDayFun(): void {
    // this.getCurrentSite();
    this.formatDate();
    this.selectedDate = -1;
    this.zoomIn = 0;
    this.isZoomIn = false;
    this.deviceSimsDetailsProgressToggleDay = true;
    this.deviceSimsDetailsProgressToggleWeek = false;
    this.fetchProm(
      this.selectedSite,
      this.selectedSimDetails,
      this.selectedIndexDetails
    );
  }
  deviceSimsDetailsProgressToggleWeekFun(): void {
    // this.getCurrentSite();
    this.deviceSimsDetailsProgressToggleWeek = true;
    this.deviceSimsDetailsProgressToggleDay = false;
    this.apiPreviousDate = this.lastWeekDates[1].string_date;
    this.apiCurrentDate =
      this.lastWeekDates[this.lastWeekDates.length - 1].string_date;
    this.fetchPromWeek(
      this.selectedSite,
      this.selectedSimDetails,
      this.selectedIndexDetails
    );
  }
  activeNewDeviceForm(): void {
    this.closeEdit();
    this.closeDetails();
    this.activeNewDevice = !this.activeNewDevice;
    this.configDeviceSim();
    // this.deviceSimsDetailItemDetailsPopUp = false;
    // this.deviceSimsDetailViewEditForm = false;
  }
  addNewDeviceFun(): void {
    this.configInventoryDevice();
    this.closeEditInventory();
    this.addNewDevice = !this.addNewDevice;
    this.addNewInventoryDeviceError = false;
  }
  // inventoryDeviceEditFormFun(): void {
  //   this.inventoryDeviceEditForm = true;
  //   this.addNewDevice = false;
  // }
  // inventoryDeviceEditFormFunClose(): void {
  //   this.inventoryDeviceEditForm = false;
  // }

  simsView(): void {
    this.fetchData();
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
    // //console.log(a)
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

  ngOnDestroy(): void {
    //console.log('onDestroy');
    this.siteSubscription.unsubscribe();
  }
}
