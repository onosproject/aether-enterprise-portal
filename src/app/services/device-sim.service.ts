/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { SimInventory } from '../models/sim-inventory.model';
import { InventoryDevice } from '../models/inventory-device.model';
// import { DeviceSimComponent } from '../Modules/settings/device-sim/device-sim.component';
import { TimelineData } from '../models/timeline.model';
import { environment } from '../../environments/environment';
// import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceSimService {
  // apiUrl: string = environment.baseUrl + 'chronos-exporter/config';

  apiUrl: string = environment.configUrl;

  // promApiUrl: string = environment.baseUrl + 'prometheus/api/v1';

  promApiUrl: string = environment.promUrl;

  siteIds: string[] = [];

  selectedSite: string = '';

  selectedSims = [];

  mySite1: Observable<string>;
  private mySiteSubject = new BehaviorSubject<string>('');

  mySims1: Observable<SimInventory[]>;
  private mySimsSubject = new BehaviorSubject<SimInventory[]>([]);

  mySim1: Observable<string>;
  private mySimSubject = new Subject<string>();

  myDevice: Observable<InventoryDevice[]>;
  private myDeviceSubject = new BehaviorSubject<InventoryDevice[]>([]);

  myDevice1: Observable<InventoryDevice>;
  private myDeviceSubject1 = new BehaviorSubject<InventoryDevice[]>([]);

  constructor(
    public http: HttpClient // public deviceSimComp: DeviceSimComponent
  ) {
    // this.mySim1 = this.mySimSubject.asObservable();
    this.myDevice = this.myDeviceSubject.asObservable();
  }

  mySite(data: string): void {
    this.selectedSite = data;
    //console.log(this.selectedSite)
    //console.log(data)
    this.mySiteSubject.next(data);
  }

  getSite(): Observable<string> {
    return this.mySiteSubject.asObservable();
  }

  getSim1(): Observable<string> {
    return this.mySimSubject.asObservable();
  }

  getDevice1(): Observable<InventoryDevice[]> {
    return this.myDeviceSubject1.asObservable();
  }

  mySims(data: SimInventory[]): void {
    this.selectedSims = data;
    this.mySimsSubject.next(data);
  }

  getSims(): Observable<SimInventory[]> {
    return this.mySimsSubject.asObservable();
  }

  mySim(data: string): void {
    // this.selectedSim = data
    // //console.log(this.selectedSim)
    this.mySimSubject.next(data);
  }

  getDevice(): Observable<InventoryDevice[]> {
    return this.myDeviceSubject.asObservable();
  }

  myDevices(data: InventoryDevice[]): void {
    this.myDeviceSubject.next(data);
  }

  setDevice(data: InventoryDevice[]): void {
    // this.selectedSim = data
    // //console.log(this.selectedSim)
    this.myDeviceSubject1.next(data);
  }

  getData(): Observable<unknown> {
    const headers = {
      Accept: 'application/json',
      // 'Authorization': 'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt')
      // Authorization: "Basic b25mc3RhZmY6azd5ZXN0RDhLYmRvN0xFZDZGa0hYR0UzeXJ6OGNMVENrc01rbkZ5b0pUdA=="
    };
    return this.http.get(this.apiUrl, { headers });
  }

  promSite: string = '';
  promIccid: string = '';
  promPrev: string = '';
  promCurr: string = '';

  getPromWeekData(
    site: string,
    iccid: string,
    apiCurr: string,
    apiPrev: string
  ): Observable<TimelineData> {
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
      apiCurr +
      '&end=' +
      apiPrev +
      '&step=60m';

    // console.log(
    //   '+++++++++++++++++++++++++++++++++++++++++ ||||||||||||||||||||||||',
    //   query
    // );
    return this.http.get<TimelineData>(this.promApiUrl + query, {
      headers,
    });
  }

  getPromDayData(
    site: string,
    iccid: string,
    apiPrevDate: string,
    apiPrevTime: string,
    apiCurrDate: string,
    apiCurrTime: string
  ): Observable<TimelineData> {
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
      apiPrevDate +
      'T' +
      apiPrevTime +
      '.000Z&end=' +
      apiCurrDate +
      'T' +
      apiCurrTime +
      '.000Z&step=60m';

    // console.log(
    //   '+++++++++++++++++++++++++++++++++++++++++ ||||||||||||||||||||||||',
    //   query
    // );
    return this.http.get<TimelineData>(this.promApiUrl + query, {
      headers,
    });
  }

  getPromDotsData(
    site: string,
    iccid: string,
    apiPrevDate: string,
    apiPrevTime: string,
    apiCurrDate: string,
    apiCurrTime: string
  ): Observable<TimelineData> {
    const headers = {
      Accept: 'application/json',
      // Authorization:
      //   'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt'),
    };
    const query: string =
      '/query_range?query=device_connection_event_core{site="' +
      site +
      '", iccid="' +
      iccid +
      '"}&start=' +
      apiPrevDate +
      'T' +
      apiPrevTime +
      '.000Z&end=' +
      apiCurrDate +
      'T' +
      apiCurrTime +
      '.000Z&step=1d';

    //console.log(query);
    return this.http.get<TimelineData>(this.promApiUrl + query, {
      headers,
    });
  }
}
