/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DeviceSimService } from './device-sim.service';
import { SimInventory } from '../models/sim-inventory.model';

describe('DeviceSimService', () => {
  let service: DeviceSimService;
  let _SimInventory: SimInventory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DeviceSimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // new test by ngentest
  it('should run #mySite()', async () => {
    service.mySiteSubject = service.mySiteSubject;
    spyOn(service.mySiteSubject, 'next');
    service.mySite('');
    // expect(service.mySiteSubject.next).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #getSite()', async () => {
    service.mySiteSubject = service.mySiteSubject;
    spyOn(service.mySiteSubject, 'asObservable');
    service.getSite();
    // expect(service.mySiteSubject.asObservable).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #mySims()', async () => {
    service.mySimsSubject = service.mySimsSubject;
    spyOn(service.mySimsSubject, 'next');
    service.mySims(_SimInventory ? [] : []);
    // expect(service.mySimsSubject.next).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #getSims()', async () => {
    service.mySimsSubject = service.mySimsSubject;
    spyOn(service.mySimsSubject, 'asObservable');
    service.getSims();
    // expect(service.mySimsSubject.asObservable).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #mySim()', async () => {
    service.mySimSubject = service.mySimSubject;
    spyOn(service.mySimSubject, 'next');
    service.mySim('');
    // expect(service.mySimSubject.next).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #getDevice()', async () => {
    service.myDeviceSubject = service.myDeviceSubject;
    spyOn(service.myDeviceSubject, 'asObservable');
    service.getDevice();
    // expect(service.myDeviceSubject.asObservable).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #setDevice()', async () => {
    service.myDeviceSubject = service.myDeviceSubject;
    spyOn(service.myDeviceSubject, 'next');
    service.setDevice(0);
    // expect(service.myDeviceSubject.next).toHaveBeenCalled();
  });

  // new test by ngentest
  it('should run #getData()', async () => {
    service.http = service.http;
    spyOn(service.http, 'get');
    service.getData();
    // expect(service.http.get).toHaveBeenCalled();
  });
});
