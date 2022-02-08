import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config1 = [];

  fremontData = [];
  berlinData = [];

  fetchDeviceConfig(): void {
    this.config1.push(this.config);
    // //console.log(this.config1)
    this.config1.forEach((item) => {
      // //console.log(item.sites)
      item.sites.forEach((site) => {
        // //console.log(site['display-name'])
        if (site['display-name'] == 'Freemont, CA') {
          this.fremontData.push(site.devices);
          // //console.log(this.fremontData);
        } else if (site['display-name'] == 'Berlin, DE') {
          this.berlinData.push(site.devices);
          // //console.log(this.berlinData);
        }
      });
    });
  }

  fetchOther(): void {
    // //console.log(this.fremontData)
    this.fremontData.forEach((device) => {
      device.forEach(() => {
        //console.log(item3.imei);
      });
    });
  }

  config = {
    applications: [
      {
        'application-id': 'nvr-application',
        'display-name': 'Network Video Recorder',
      },
      {
        'application-id': 'occupant-counter',
        'display-name': 'Occupant Counting Application',
      },
      {
        'application-id': 'expenses-application',
        'display-name': 'Expenses Application',
      },
    ],
    enterprise: {
      'display-name': 'Tesla',
      'enterprise-id': 'tesla',
      image: 'https://en.wikipedia.org/wiki/File:Tesla_Motors.svg',
    },
    sites: [
      {
        'device-groups': [
          {
            'device-group-id': 'phones',
            devices: ['752365A', '752908B'],
            'display-name': 'Phones group',
          },
          {
            'device-group-id': 'cameras',
            devices: [
              '7568111',
              '7568112',
              '7568113',
              '7568114',
              '7568115',
              '7568116',
              '7568117',
            ],
            'display-name': 'Cameras group',
          },
        ],
        devices: [
          {
            'display-name': 'Phone 1',
            imei: '123-456-7891',
            location: 'Somewhere',
            'serial-number': '752365A',
            sim: '123-456-789',
            type: 'Pixel 5 Phone',
          },
          {
            'display-name': 'Phone 2',
            imei: '123-456-7892',
            location: 'Somewhere',
            'serial-number': '752908B',
            sim: '123-456-788',
            type: 'iPhone 11',
          },
          {
            'display-name': 'Camera 1',
            imei: '123-456-7893',
            location: 'Front entrance',
            'serial-number': '7568111',
            sim: '123-456-787',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 2',
            imei: '123-456-7894',
            location: 'South Gate',
            'serial-number': '7568112',
            sim: '123-456-786',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 3',
            imei: '123-456-7895',
            location: 'Store Room 1',
            'serial-number': '7568113',
            sim: '123-456-785',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 4',
            imei: '123-456-7896',
            location: 'Store Room 2',
            'serial-number': '7568114',
            sim: '123-456-784',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 5',
            imei: '123-456-7897',
            location: 'Corridor 1',
            'serial-number': '7568115',
            sim: '123-456-783',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 6',
            imei: '123-456-7898',
            location: 'Corridor 2',
            'serial-number': '7568116',
            sim: '123-456-782',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 7',
            imei: '123-456-7899',
            location: 'Atrium',
            'serial-number': '7568117',
            sim: '123-456-781',
            type: 'Camera',
          },
        ],
        'display-name': 'Freemont, CA',
        image:
          'https://en.wikipedia.org/wiki/File:Mission_Peak_over_Lake_Elizabeth,_in_Fremont,_California_(cropped).JPG',
        sims: [
          {
            'display-name': 'Sim 9',
            iccid: '123-456-789',
          },
          {
            'display-name': 'Sim 8',
            iccid: '123-456-788',
          },
          {
            'display-name': 'Sim 7',
            iccid: '123-456-787',
          },
          {
            'display-name': 'Sim 6',
            iccid: '123-456-786',
          },
          {
            'display-name': 'Sim 5',
            iccid: '123-456-785',
          },
          {
            'display-name': 'Sim 4',
            iccid: '123-456-784',
          },
          {
            'display-name': 'Sim 3',
            iccid: '123-456-783',
          },
          {
            'display-name': 'Sim 2',
            iccid: '123-456-782',
          },
          {
            'display-name': 'Sim 1',
            iccid: '123-456-781',
          },
        ],
        'site-id': 'freemont',
        slices: [
          {
            applications: ['nvr-application', 'occupant-counter'],
            'device-groups': ['cameras'],
            'display-name': 'Cameras Slice',
            'slice-id': 'freemont-slice-cameras',
          },
          {
            applications: ['expenses-application'],
            'device-groups': ['phones'],
            'display-name': 'Phones Slice',
            'slice-id': 'freemont-slice-phones',
          },
        ],
        'small-cells': [
          {
            'display-name': 'North Cell',
            'small-cell-id': 'freemont-sc-north',
          },
          {
            'display-name': 'South Cell',
            'small-cell-id': 'freemont-sc-south',
          },
          {
            'display-name': 'East Cell',
            'small-cell-id': 'freemont-sc-east',
          },
          {
            'display-name': 'West Cell',
            'small-cell-id': 'freemont-sc-west',
          },
        ],
      },
      {
        'device-groups': [
          {
            'device-group-id': 'phones',
            devices: [
              '18876871',
              '18876872',
              '18876873',
              '18876874',
              '18876875',
            ],
            'display-name': 'Phones group',
          },
          {
            'device-group-id': 'cameras',
            devices: [
              '18876881',
              '18876882',
              '18876883',
              '18876884',
              '18876885',
              '18876886',
              '18876887',
            ],
            'display-name': 'Cameras group',
          },
        ],
        devices: [
          {
            'display-name': 'Phone 1',
            imei: '123-456-7891',
            location: 'Somewhere',
            'serial-number': '18876871',
            sim: '123-671-789',
            type: 'Pixel 5 Phone',
          },
          {
            'display-name': 'Phone 2',
            imei: '123-671-7892',
            location: 'Somewhere',
            'serial-number': '18876872',
            sim: '123-671-788',
            type: 'iPhone 11',
          },
          {
            'display-name': 'Phone 3',
            imei: '123-671-7893',
            location: 'Somewhere',
            'serial-number': '18876873',
            sim: '123-671-787',
            type: 'iPhone 11',
          },
          {
            'display-name': 'Phone 4',
            imei: '123-671-7894',
            location: 'Somewhere',
            'serial-number': '18876874',
            sim: '123-671-786',
            type: 'iPhone 11',
          },
          {
            'display-name': 'Phone 5',
            imei: '123-671-7895',
            location: 'Somewhere',
            'serial-number': '18876875',
            sim: '123-671-785',
            type: 'iPhone 11',
          },
          {
            'display-name': 'Camera 1',
            imei: '123-671-7896',
            location: 'Front entrance',
            'serial-number': '18876881',
            sim: '123-671-784',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 2',
            imei: '123-671-7897',
            location: 'South Gate',
            'serial-number': '18876882',
            sim: '123-671-783',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 3',
            imei: '123-671-7898',
            location: 'Store Room 1',
            'serial-number': '18876883',
            sim: '123-671-782',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 4',
            imei: '123-671-7899',
            location: 'Store Room 2',
            'serial-number': '18876884',
            sim: '123-671-781',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 5',
            imei: '123-671-7900',
            location: 'Corridor 1',
            'serial-number': '18876885',
            sim: '123-671-780',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 6',
            imei: '123-671-7901',
            location: 'Corridor 2',
            'serial-number': '18876886',
            sim: '123-671-779',
            type: 'Camera',
          },
          {
            'display-name': 'Camera 7',
            imei: '123-671-7902',
            location: 'Atrium',
            'serial-number': '18876887',
            sim: '123-671-778',
            type: 'Camera',
          },
        ],
        'display-name': 'Berlin, DE',
        image:
          'https://en.wikipedia.org/wiki/Berlin#/media/File:Brandenburger_Tor_abends.jpg',
        sims: [
          {
            'display-name': 'Sim 9',
            iccid: '123-671-789',
          },
          {
            'display-name': 'Sim 8',
            iccid: '123-671-788',
          },
          {
            'display-name': 'Sim 7',
            iccid: '123-671-787',
          },
          {
            'display-name': 'Sim 6',
            iccid: '123-671-786',
          },
          {
            'display-name': 'Sim 5',
            iccid: '123-671-785',
          },
          {
            'display-name': 'Sim 4',
            iccid: '123-671-784',
          },
          {
            'display-name': 'Sim 3',
            iccid: '123-671-783',
          },
          {
            'display-name': 'Sim 2',
            iccid: '123-671-782',
          },
          {
            'display-name': 'Sim 1',
            iccid: '123-671-781',
          },
          {
            'display-name': 'Sim 1a',
            iccid: '123-671-780',
          },
          {
            'display-name': 'Sim 1b',
            iccid: '123-671-779',
          },
          {
            'display-name': 'Sim 1c',
            iccid: '123-671-778',
          },
        ],
        'site-id': 'berlin',
        slices: [
          {
            applications: ['nvr-application', 'occupant-counter'],
            'device-groups': ['cameras'],
            'display-name': 'Cameras Slice',
            'slice-id': 'berlin-slice-cameras',
          },
          {
            applications: ['expenses-application'],
            'device-groups': ['phones'],
            'display-name': 'Phones Slice',
            'slice-id': 'berlin-slice-phones',
          },
        ],
        'small-cells': [
          {
            'display-name': 'North Cell',
            'small-cell-id': 'berlin-sc-north',
          },
          {
            'display-name': 'South Cell',
            'small-cell-id': 'berlin-sc-south',
          },
          {
            'display-name': 'East Cell',
            'small-cell-id': 'berlin-sc-east',
          },
          {
            'display-name': 'West Cell',
            'small-cell-id': 'berlin-sc-west',
          },
        ],
      },
    ],
  };
}
