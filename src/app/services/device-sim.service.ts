/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SimInventory } from '../models/sim-inventory.model';
import { InventoryDevice } from '../models/inventory-device.model';
// import { TimelineData } from '../models/timeline.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceSimService {
  apiUrl: string = environment.configUrl;

  promApiUrl: string = environment.promUrl;

  siteIds: string[] = [];

  selectedSite: string = '';

  selectedSims = [];

  mySite1: Observable<string>;
  public mySiteSubject = new BehaviorSubject<string>('');

  mySims1: Observable<SimInventory[]>;
  public mySimsSubject = new BehaviorSubject<SimInventory[]>([]);

  mySim1: Observable<string>;
  public mySimSubject = new BehaviorSubject<string>('');

  myDevice: Observable<InventoryDevice[]>;
  public myDeviceSubject = new BehaviorSubject<InventoryDevice[]>([]);

  myDevice1: Observable<InventoryDevice>;
  public myDeviceSubject1 = new BehaviorSubject<InventoryDevice[]>([]);

  constructor(public http: HttpClient) {}

  mySite(data: string): void {
    this.selectedSite = data;
    this.mySiteSubject.next(data);
  }

  getSite(): Observable<string> {
    return this.mySiteSubject.asObservable();
  }

  // * Used to get the selectedSim data from select-sims to device-sim component
  getSim1(): Observable<string> {
    return this.mySimSubject.asObservable();
  }

  // * Used to get the selectedDevice data from select-device to device-sim component.
  getDevice1(): Observable<InventoryDevice[]> {
    return this.myDeviceSubject1.asObservable();
  }

  // * Used to send data to the subject from device-sim to select-sims component.
  mySims(data: SimInventory[]): void {
    this.selectedSims = data;
    this.mySimsSubject.next(data);
  }

  // * Used to get the sims inventory data from device-sim to select-sims component.
  getSims(): Observable<SimInventory[]> {
    return this.mySimsSubject.asObservable();
  }

  // * Used to send the data of selectedSim from select-sims to device-sim component.
  mySim(data: string): void {
    this.mySimSubject.next(data);
  }

  // * Used to get the devices from device-sim to select-devices compoenent.
  getDevice(): Observable<InventoryDevice[]> {
    return this.myDeviceSubject.asObservable();
  }

  // * Used to send data to the subject from device-sim to select-devices component.
  myDevices(data: InventoryDevice[]): void {
    this.myDeviceSubject.next(data);
  }

  // * Used to send the data of selectedDevice from select-devices to device-sim component.
  setDevice(data: InventoryDevice[]): void {
    console.log(data);
    this.myDeviceSubject1.next(data);
  }

  getData(): Observable<unknown> {
    const headers = {
      Accept: 'application/json',
    };
    return this.http.get(this.apiUrl, { headers });
  }
}
