import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { trigger, style, animate, transition } from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { SelectDevicesComponent } from '../dialogs/select-devices/select-devices.component';
import { SelectSimsComponent } from '../dialogs/select-sims/select-sims.component';

import { DeviceSimService } from 'src/app/services/device-sim.service';

import { ConfigService } from 'src/app/services/config.service';
import { Subscription } from 'rxjs';

// chart imports
import * as d3Time from 'd3-timelines-edited';
import * as d3 from 'd3';
import { DeleteDevicesComponent } from '../dialogs/delete-devices/delete-devices.component';
@Component({
  selector: 'aep-device-sim',
  templateUrl: './device-sim.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 400, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 500, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  styles: [],
})
export class DeviceSimComponent implements OnInit, OnDestroy {
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

  config: any[] = [];

  selectedSite: any = '';

  selectedSim: any = '';

  siteSubscription: Subscription;
  siteConfig: any[] = [];

  deviceInventory: any[] = [];

  simInventory: any[] = [];

  editDevices: number[] = [];

  deviceDetails: number[] = [];

  cancelledSimsStorage: any[] = [];

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

  valuesArray: any[] = [
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

  timesArray: any[] = [];

  timesDiffArray: any[] = [];

  apiPreviousDate: any = '';
  apiPreviousTime: any = '';
  apiCurrentDate: any = '';
  apiCurrentTime: any = '';

  valuesArrayFinal: any[] = [{ activeStatus: '1', times: [] }];

  simpleData = [
    {
      activeStatus: '1',
      times: [{ ending_time: 1640960880000, starting_time: 1640874480000 }],
    },
  ];

  deviceSimForm = new FormGroup({
    newSim: new FormControl('', Validators.required),
    deviceName: new FormControl('', Validators.required),
    deviceLocation: new FormControl('', Validators.required),
    deviceSerialNum: new FormControl('', Validators.required),
  });

  deviceSimEditForm = new FormGroup({
    newSim: new FormControl('', Validators.required),
    deviceName: new FormControl('', Validators.required),
    deviceLocation: new FormControl('', Validators.required),
    deviceSerialNum: new FormControl('', Validators.required),
  });

  inventoryDeviceSimForm = new FormGroup({
    inventoryDeviceName: new FormControl('', Validators.required),
    inventoryDeviceLocation: new FormControl('', Validators.required),
    inventoryDeviceSerialNum: new FormControl('', Validators.required),
    inventoryDeviceType: new FormControl('', Validators.required),
  });

  inventoryDeviceSimEditForm = new FormGroup({
    inventoryDeviceName: new FormControl('', Validators.required),
    inventoryDeviceLocation: new FormControl('', Validators.required),
    inventoryDeviceSerialNum: new FormControl('', Validators.required),
    inventoryDeviceType: new FormControl('', Validators.required),
  });

  constructor(
    public http: HttpClient,
    public dialog: MatDialog,
    public deviceService: DeviceSimService,
    public configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.deviceSimFormGroup = new FormGroup({
      email: new FormControl(null),
      browseSims: new FormControl(),
      deviceType: new FormControl(null),
    });

    this.assignSelectedSim();
    this.assignSelectedSite();
    this.configService.fetchDeviceConfig();
    this.configService.fetchOther();
    this.deviceService.getSiteIds();
    this.deviceService.selectedId();
    console.log(this.valuesArrayFinal);

    setInterval(() => {
      console.log('lol', this.fetchData());
    }, 100000);
  }

  addNewDevice1(): any {
    console.log('addNewDevice');
    this.siteConfig[0].push({
      sim: this.deviceSimForm.value.newSim,
      'display-name': this.deviceSimForm.value.deviceName,
      location: this.deviceSimForm.value.deviceLocation,
      'serial-number': this.deviceSimForm.value.deviceSerialNum,
    });
    // console.log(this.siteConfig);
  }

  addNewDeviceInventory(): any {
    console.log('add NewDevice to Inventory');
    this.deviceInventory.push({
      'display-name': this.inventoryDeviceSimForm.value.inventoryDeviceName,
      location: this.inventoryDeviceSimForm.value.inventoryDeviceLocation,
      'serial-number':
        this.inventoryDeviceSimForm.value.inventoryDeviceSerialNum,
      type: this.inventoryDeviceSimForm.value.inventoryDeviceType,
    });
  }

  assignSelectedSite(): any {
    console.log(this.deviceService.mySite1);
    this.siteSubscription = this.deviceService.getSite().subscribe((data) => {
      console.log(data);
      this.selectedSite = data;
      // console.log(this.selectedSite);
      this.fetchData();
    });
  }

  assignSelectedSim(): any {
    this.deviceService.mySim1.subscribe((data) => {
      this.selectedSim = data;
      // console.log(this.selectedSim);
    });
  }

  fetchData(): any {
    this.deviceService.getData().subscribe((result) => {
      const configArray: any[] = [];
      configArray.push(result);
      this.config = configArray;
      // console.log(this.config);
      configArray.map((item) => {
        const sitesArray: any[] = [];
        const sitesConfig = item.sites;
        // console.log(item.sites);
        sitesConfig.map((site) => {
          console.log(site['display-name']);
          console.log(this.selectedSite);
          if (site['site-id'] === this.selectedSite) {
            sitesArray.push(site.devices);
            console.log(
              'This is Local sites array',
              this.selectedSite,
              sitesArray
            );
          }
        });
        this.siteConfig = sitesArray;
      });
      console.log('This is global sites array', this.siteConfig);
      console.log(this.config);
      for (let i = 0; i < this.siteConfig[0].length; i++) {
        this.fetchProm2(this.selectedSite, this.siteConfig[0][i].sim, i);
        // console.log("+++++++++", this.siteConfig[0][i].sim)
      }
    });
  }

  editTrigger(index: number): any {
    this.closeEdit();
    this.closeDetails();
    const editDeviceIndex = this.editDevices.indexOf(index);
    if (editDeviceIndex >= 0) {
      // console.log('if');
      this.editDevices.splice(editDeviceIndex, 1);
    } else {
      // console.log('else');
      // console.log(this.siteConfig[0][index]);
      this.siteConfig[0][index].form = new FormGroup({
        newSim: new FormControl(this.siteConfig[0][index].sim),
        deviceName: new FormControl(this.siteConfig[0][index]['display-name']),
        deviceLocation: new FormControl(this.siteConfig[0][index].location),
        deviceSerialNum: new FormControl(
          this.siteConfig[0][index]['serial-number']
        ),
      });
      this.editDevices.push(index);
    }
    // console.log(editDeviceIndex);
    // console.log(this.editDevices);
  }

  closeEdit(): any {
    this.editDevices.pop();
  }

  detailsTrigger(index: number, sim: string): any {
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
  }

  closeDetails(): any {
    this.deviceDetails.pop();
  }

  // removePreviousChart(): any {
  // if (document.body.contains(document.getElementById('device_timeline'))) {
  //   const chartObj = document.getElementById('device_timeline');
  //   chartObj.remove();
  // }
  // }

  getEditControl(deviceSimEditForm: FormGroup, param: string): FormControl {
    return deviceSimEditForm.get(param) as FormControl;
  }

  actualEdit(index: number): void {
    const form = this.siteConfig[0][index].form.value;
    const device = this.siteConfig[0][index];
    device.sim = form.newSim;
    device['display-name'] = form.deviceName;
    device.location = form.deviceLocation;
    device['serial-number'] = form.deviceSerialNum;
  }

  deleteDevice(index: number): any {
    const simIccid = this.siteConfig[0][index].sim;
    // const siteName = this.siteConfig[0][index]['display-name'];
    // console.log(siteName);
    this.simInventory.push({ simIccid });
    console.log('The Detached sims are: ', this.simInventory);
    delete this.siteConfig[0][index].sim;
    console.log('Before deleting the device', this.siteConfig);
    this.deviceInventory.push(this.siteConfig[0][index]);
    // console.log(this.deviceInventory);
    this.siteConfig[0].splice(index, 1);
  }

  cancelSim(index: number): any {
    const simIccid = this.siteConfig[0][index].sim;
    this.cancelledSimsStorage.push({ simIccid });
    console.log('THe Cancelled SIMS are: -->', this.cancelledSimsStorage);
    delete this.siteConfig[0][index].sim;
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

  openDeleteDialog(deviceIndex: number): void {
    const dialogRef = this.dialog.open(DeleteDevicesComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.deleteDevice(deviceIndex);
      }
    });
  }

  fetchPromApi(site: string, iccid: string): any {
    this.formatDate();
    const headers = {
      Accept: 'application/json',
      Authorization:
        'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt'),
    };
    const query: string =
      '/query_range?query=device_connected_status{site="' +
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
      '.000Z&step=60m';

    console.log(query);
    return this.http.get(this.deviceService.promApiUrl + query, { headers });
  }

  fetchProm(site: string, iccid: string, index: number): any {
    console.log(this.apiPreviousDate);
    console.log(this.apiCurrentDate);
    this.timesArray.splice(0, this.timesArray.length);
    this.timesDiffArray.splice(0, this.timesDiffArray.length);
    this.fetchPromApi(site, iccid).subscribe((data) => {
      // console.log(data.data.result[0]);
      let valuesArray: any[] = [];
      // valuesArray.push(data.data.result[0].values);
      valuesArray = data.data.result[0].values;
      console.log(valuesArray);
      const timesObject: any = {};
      timesObject.starting_time = '';
      timesObject.ending_time = '';
      timesObject.display = 'rect';
      const timesArray: any[] = [];
      // console.log(valuesArray);
      valuesArray.forEach((el, index) => {
        // console.log(el[1], timesObject);
        // console.log(timesObject.starting_time);
        if (el[1] === '1' && timesObject.starting_time === '') {
          // console.log('if1');
          timesObject.starting_time = valuesArray[index][0];

          // console.log(timesObject.starting_time);
        } else if (el[1] === '0' && timesObject.starting_time !== '') {
          // console.log('else-if1');
          timesObject.ending_time = valuesArray[index - 1][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
        if (index === valuesArray.length - 1 && el[1] === '1') {
          // console.log('if2');
          timesObject.ending_time = valuesArray[index][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
      });
      console.log(timesArray);
      this.timesArray = timesArray;
      // valuesArray.forEach((eachItem, index) => {
      // console.log(eachItem, index);
      //   if (index == valuesArray.length - 1 || index == 0) {
      // console.log(valuesArray[index]);
      //   }
      // });
      // console.log(timesObject);
      // console.log(this.timesArray);
      this.valuesArrayFinal[0].times = timesArray;
      const finalArray = this.valuesArrayFinal;
      console.log(finalArray);
      this.displayChart(finalArray, index);
      this.valuesArrayFinal[0].times = [];
    });

    console.log(this.timesArray);
    console.log(this.valuesArrayFinal);
  }

  displayChart(chartData: any[], index: number): any {
    // alert("test");
    const width = 800;
    const height = 50;

    const colorScale = d3
      .scaleOrdinal()
      .range(['#06D6A0', '#EF233C', '#ffffff'])
      .domain(['1', '0', '']);

    const chart = d3Time
      .timelines()
      .colors(colorScale)
      .colorProperty('activeStatus');

    d3.select('#device_timeline' + index)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .datum(chartData)
      .call(chart);
  }

  displaySmallChart(chartData: any[], index: number): any {
    // alert("test");
    const width = 100;
    const height = 50;

    const colorScale = d3
      .scaleOrdinal()
      .range(['#06D6A0', '#EF233C', '#ffffff'])
      .domain(['1', '0', '']);

    const chart = d3Time
      .timelines()
      .colors(colorScale)
      .colorProperty('activeStatus');

    d3.select('#small_device_timeline' + index)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .datum(chartData)
      .call(chart);
  }

  test5(deviceIndex: number, simNumber: string): any {
    this.fetchProm2(this.selectedSite, simNumber, deviceIndex);
  }

  fetchProm2(site: string, iccid: string, index: number): any {
    console.log(this.apiPreviousDate);
    console.log(this.apiCurrentDate);
    this.timesArray.splice(0, this.timesArray.length);
    this.timesDiffArray.splice(0, this.timesDiffArray.length);
    this.fetchPromApi(site, iccid).subscribe((data) => {
      // console.log(data.data.result[0]);
      let valuesArray: any[] = [];
      // valuesArray.push(data.data.result[0].values);
      valuesArray = data.data.result[0].values;
      // console.log(valuesArray);
      const timesObject: any = {};
      timesObject.starting_time = '';
      timesObject.ending_time = '';
      timesObject.display = 'rect';
      const timesArray: any[] = [];
      // console.log(valuesArray);
      valuesArray.forEach((el, index) => {
        console.log(el[1], timesObject);
        // console.log(timesObject.starting_time);
        if (el[1] === '1' && timesObject.starting_time === '') {
          // console.log('if1');
          timesObject.starting_time = valuesArray[index][0];

          console.log(timesObject.starting_time);
        } else if (el[1] === '0' && timesObject.starting_time !== '') {
          // console.log('else-if1');
          timesObject.ending_time = valuesArray[index - 1][0];
          timesArray.push({ ...timesObject });
          timesObject.starting_time = '';
          timesObject.ending_time = '';
        }
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
      // console.log(timesObject);
      // console.log(this.timesArray);
      this.valuesArrayFinal[0].times = timesArray;
      const finalArray = this.valuesArrayFinal;
      console.log(finalArray);
      this.displaySmallChart(finalArray, index);
      // this.valuesArrayFinal[0].times = [];
    });
  }

  formatDate(): any {
    const currentDate = new Date(new Date().getTime());
    const previousDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const reqPreviousDate = new Date(previousDate);
    const reqCurrentDate = new Date(currentDate);
    // console.log(reqCurrentDate);

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

    if (reqPreviousMonth.length < 2) reqPreviousMonth = '0' + reqPreviousMonth;
    if (reqPreviousDay.length < 2) reqPreviousDay = '0' + reqPreviousDay;
    if (reqPreviousMinutes.length < 2)
      reqPreviousMinutes = '0' + reqPreviousMinutes;
    if (reqPreviousSeconds.length < 2)
      reqPreviousSeconds = '0' + reqPreviousSeconds;

    if (reqCurrentMonth.length < 2) reqCurrentMonth = '0' + reqCurrentMonth;
    if (reqCurrentDay.length < 2) reqCurrentDay = '0' + reqCurrentDay;
    if (reqCurrentMinutes.length < 2)
      reqCurrentMinutes = '0' + reqCurrentMinutes;
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
    console.log('prev: ', apiPreviousDate, 'current: ', apiCurrentDate);
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

  ngOnDestroy(): void {
    console.log('onDestroy');
    this.siteSubscription.unsubscribe();
  }
}
