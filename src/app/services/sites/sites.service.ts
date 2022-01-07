import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  username: string = 'onfstaff';
  password: string = 'k7yestD8Kbdo7LEd6FkHXGE3yrz8cLTCksMknFyoJTt';
  encode = btoa(this.username + ':' + this.password);
  header: HttpHeaders = new HttpHeaders({
    Authorization: `Basic $(this.encode)`,
  });

  constructor(public http: HttpClient) {}

  GetAllConfig() {
    return this.http.get(environment.baseUrl + 'chronos-exporter/config', {
      headers: this.header,
    });
  }
}
