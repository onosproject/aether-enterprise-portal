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
import { environment } from '../../environments/environment';
// import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceSimService {
  apiUrl: string = environment.baseUrl + 'chronos-exporter/config';

  promApiUrl: string = environment.baseUrl + 'prometheus/api/v1';

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

  constructor(public http: HttpClient) {
    this.mySim1 = this.mySimSubject.asObservable();
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

  setDevice(data: InventoryDevice[]): void {
    // this.selectedSim = data
    // //console.log(this.selectedSim)
    this.myDeviceSubject.next(data);
  }

  getData(): Observable<unknown> {
    const headers = {
      Accept: 'application/json',
      // 'Authorization': 'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt')
      // Authorization: "Basic b25mc3RhZmY6azd5ZXN0RDhLYmRvN0xFZDZGa0hYR0UzeXJ6OGNMVENrc01rbkZ5b0pUdA=="
    };
    return this.http.get(this.apiUrl, { headers });
  }

  // getPromData(): any {
  //   const headers = {
  //     Accept: 'application/json',
  //     Authorization:
  //       'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt'),
  //     // Authorization: "Basic b25mc3RhZmY6azd5ZXN0RDhLYmRvN0xFZDZGa0hYR0UzeXJ6OGNMVENrc01rbkZ5b0pUdA=="
  //   };
  //   const tempQuery: string =
  //     '/query_range?query=device_connected_status{site="freemont", iccid="123-456-781"}&start=2021-12-27T13:42:00.000Z&end=2021-12-28T13:42:00.000Z&step=60m';
  //   // const tempQuery1: string = '/labels'
  //   return this.http.get(this.promApiUrl + tempQuery, { headers });
  // }

  // postData(data): any{
  //   const headers = {
  //     Accept: 'application/json',
  //   };
  //   return this.http.post(this.apiUrl, data, { headers });
  // }

  // getSiteIds(): any {
  //   this.getData().subscribe((result) => {
  //     result.sites.map((site) => {
  //       this.siteIds.push(site['site-id']);
  //       // //console.log(this.siteIds)
  //     });
  //   });
  // }

  // selectedId(): any {
  // //console.log(this.selectedSite)
  // }
}
