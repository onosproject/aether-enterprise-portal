/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slice } from 'src/app/models/slice.model';
import { SitePlan } from 'src/app/models/site-plan.model';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  header: HttpHeaders = new HttpHeaders({
    // Authorization: `Basic $(this.encode)`,
  });

  siteId: string;
  siteIndex: number;
  siteData: Slice[];
  sitePlanes: SitePlan;
  numberOfAlerts: number;
  allSmallCellsData;

  constructor(public http: HttpClient) {}

  GetAllConfig(): Observable<unknown> {
    // return this.http.get(environment.baseUrl + 'chronos-exporter/config', {
    //   headers: this.header,
    // });
    return this.http.get(environment.configUrl);
  }
}
