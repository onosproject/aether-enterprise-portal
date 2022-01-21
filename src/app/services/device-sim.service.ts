import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceSimService {
  apiUrl: string = 'https://chronos-dev.onlab.us/chronos-exporter/config';

  promApiUrl: string = 'https://chronos-dev.onlab.us/prometheus/api/v1';

  siteIds: string[] = [];

  selectedSite: string = '';

  selectedSims: any[] = [];

  mySite1: Observable<any>;
  private mySiteSubject = new BehaviorSubject<any>('');

  mySims1: Observable<any>;
  private mySimsSubject = new BehaviorSubject<any>('');

  mySim1: Observable<any>;
  private mySimSubject = new Subject<any>();

  constructor(public http: HttpClient) {
    this.mySim1 = this.mySimSubject.asObservable();
  }

  mySite(data: string): any {
    this.selectedSite = data;
    // //console.log(this.selectedSite)
    // //console.log(data)
    this.mySiteSubject.next(data);
  }

  getSite(): Observable<any> {
    return this.mySiteSubject.asObservable();
  }

  mySims(data: any[]): any {
    this.selectedSims = data;
    this.mySimsSubject.next(data);
  }

  getSims(): Observable<any> {
    return this.mySimsSubject.asObservable();
  }

  mySim(data: string): any {
    // this.selectedSim = data
    // //console.log(this.selectedSim)
    this.mySimSubject.next(data);
  }

  getData(): any {
    const headers = {
      Accept: 'application/json',
      // 'Authorization': 'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt')
      // Authorization: "Basic b25mc3RhZmY6azd5ZXN0RDhLYmRvN0xFZDZGa0hYR0UzeXJ6OGNMVENrc01rbkZ5b0pUdA=="
    };
    return this.http.get(this.apiUrl, { headers });
  }

  getPromData(): any {
    const headers = {
      Accept: 'application/json',
      Authorization:
        'Basic ' + btoa('onfstaff:k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt'),
      // Authorization: "Basic b25mc3RhZmY6azd5ZXN0RDhLYmRvN0xFZDZGa0hYR0UzeXJ6OGNMVENrc01rbkZ5b0pUdA=="
    };
    const tempQuery: string =
      '/query_range?query=device_connected_status{site="freemont", iccid="123-456-781"}&start=2021-12-27T13:42:00.000Z&end=2021-12-28T13:42:00.000Z&step=60m';
    // const tempQuery1: string = '/labels'
    return this.http.get(this.promApiUrl + tempQuery, { headers });
  }

  // postData(data): any{
  //   const headers = {
  //     Accept: 'application/json',
  //   };
  //   return this.http.post(this.apiUrl, data, { headers });
  // }

  getSiteIds(): any {
    this.getData().subscribe((result) => {
      result.sites.map((site) => {
        this.siteIds.push(site['site-id']);
        // //console.log(this.siteIds)
      });
    });
  }

  selectedId(): any {
    // //console.log(this.selectedSite)
  }
}
