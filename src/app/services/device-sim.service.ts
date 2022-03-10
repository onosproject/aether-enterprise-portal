/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { SimInventory } from '../models/sim-inventory.model';
import { environment } from '../../environments/environment';

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
  public mySiteSubject = new BehaviorSubject<string>('');

  mySims1: Observable<SimInventory[]>;
  public mySimsSubject = new BehaviorSubject<SimInventory[]>([]);

  mySim1: Observable<string>;
  public mySimSubject = new Subject<string>();
  public myDeviceSubject = new BehaviorSubject<number>(0);

  constructor(public http: HttpClient) {
    this.mySim1 = this.mySimSubject.asObservable();
  }

  mySite(data: string): void {
    this.selectedSite = data;
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
    this.mySimSubject.next(data);
  }

  getDevice(): Observable<number> {
    return this.myDeviceSubject.asObservable();
  }

  setDevice(data: number): void {
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
}
