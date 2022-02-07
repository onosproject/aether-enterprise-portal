import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slice } from 'src/app/models/slice.model';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  username: string = 'onfstaff';
  password: string = 'k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt';
  encode = btoa(this.username + ':' + this.password);
  header: HttpHeaders = new HttpHeaders({
    // Authorization: `Basic $(this.encode)`,
  });

  siteId: string;
  siteIndex: number;
  siteData: Slice[];
  numberOfAlerts: number;
  allSmallCellsData: any;

  constructor(public http: HttpClient) {}

  GetAllConfig(): Observable<unknown> {
    // return this.http.get(environment.baseUrl + 'chronos-exporter/config', {
    //   headers: this.header,
    // });
    return this.http.get(environment.baseUrl + 'chronos-exporter/config');
  }
}
