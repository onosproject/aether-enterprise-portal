/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DeviceSimService } from './device-sim.service';
import { BehaviorSubject } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { InventoryDevice } from '../models/inventory-device.model';

const mockData = {
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
    {
      'application-id': 'drone-application',
      'display-name': 'Drone Application',
    },
  ],
  enterprise: {
    'display-name': 'Tesla',
    'enterprise-id': 'tesla',
    image: '/chronos-exporter/images/tesla-logo.png',
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
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
        },
      ],
      devices: [
        {
          'display-name': 'Phone 1',
          imei: '123-456-7891',
          location: 'Somewhere',
          position: {
            'position-x': 110,
            'position-y': 50,
            'site-plan': 'floor-0',
          },
          'serial-number': '752365A',
          sim: '123-456-789',
          type: 'Pixel 5 Phone',
        },
        {
          'display-name': 'Phone 2',
          imei: '123-456-7892',
          location: 'Somewhere',
          position: {
            'position-x': 120,
            'position-y': 60,
            'site-plan': 'floor-0',
          },
          'serial-number': '752908B',
          sim: '123-456-788',
          type: 'iPhone 11',
        },
        {
          'display-name': 'Camera 1',
          imei: '123-456-7893',
          location: 'Front entrance',
          position: {
            'position-x': 130,
            'position-y': 70,
            'site-plan': 'floor-0',
          },
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
        {
          'display-name': 'Camera 8',
          imei: '',
          location: 'Corridor 3',
          'serial-number': '7568118',
          type: 'Camera',
        },
        {
          'display-name': 'Camera 9',
          imei: '',
          location: 'Corridor 4',
          'serial-number': '7568119',
          type: 'Camera',
        },
      ],
      'display-name': 'Fremont, CA',
      image: '/chronos-exporter/images/los-angeles-us.png',
      sims: [
        {
          'display-name': 'Sim 11',
          iccid: '123-456-791',
        },
        {
          'display-name': 'Sim 10',
          iccid: '123-456-790',
        },
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
      'site-id': 'fremont',
      'site-plans': {
        isometric: true,
        layers: [
          {
            'layer-id': 'Structure',
          },
          {
            'layer-id': 'Text',
          },
        ],
        origin: 'ORIGIN_TOP_LEFT',
        'site-plan-list': [
          {
            id: 'floor-0',
            offsets: {
              'x-offset': 0,
              'y-offset': 0,
              'z-offset': 0,
            },
            'svg-file': '/chronos-exporter/site-plans/fremont/floor-0.svg',
          },
          {
            id: 'floor-1',
            offsets: {
              'x-offset': 0,
              'y-offset': 0,
              'z-offset': 100,
            },
            'svg-file': '/chronos-exporter/site-plans/fremont/floor-1.svg',
          },
          {
            id: 'floor-2',
            offsets: {
              'x-offset': 0,
              'y-offset': 0,
              'z-offset': 200,
            },
            'svg-file': '/chronos-exporter/site-plans/fremont/floor-2.svg',
          },
          {
            id: 'floor-3',
            offsets: {
              'x-offset': 0,
              'y-offset': 0,
              'z-offset': 300,
            },
            'svg-file': '/chronos-exporter/site-plans/fremont/floor-3.svg',
          },
        ],
      },
      slices: [
        {
          applications: ['nvr-application', 'occupant-counter'],
          'device-groups': ['cameras'],
          'display-name': 'Cameras Slice',
          'slice-id': 'fremont-slice-cameras',
        },
        {
          applications: ['expenses-application'],
          'device-groups': ['phones'],
          'display-name': 'Phones Slice',
          'slice-id': 'fremont-slice-phones',
        },
      ],
      'small-cells': [
        {
          'display-name': 'North Cell',
          position: {
            'position-x': 100,
            'position-y': 50,
            'site-plan': 'floor-0',
          },
          'small-cell-id': 'fremont-sc-north',
        },
        {
          'display-name': 'South Cell',
          position: {
            'position-x': 100,
            'position-y': 150,
            'site-plan': 'floor-1',
          },
          'small-cell-id': 'fremont-sc-south',
        },
        {
          'display-name': 'East Cell',
          position: {
            'position-x': 200,
            'position-y': 100,
            'site-plan': 'floor-2',
          },
          'small-cell-id': 'fremont-sc-east',
        },
        {
          'display-name': 'West Cell',
          position: {
            'position-x': 10,
            'position-y': 100,
            'site-plan': 'floor-0',
          },
          'small-cell-id': 'fremont-sc-west',
        },
      ],
    },
    {
      'device-groups': [
        {
          'device-group-id': 'phones',
          devices: ['18876871', '18876872', '18876873', '18876874', '18876875'],
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
            '18876888',
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
        {
          'display-name': 'Camera 8',
          imei: '',
          location: 'Corridor 2',
          'serial-number': '18876888',
          type: 'Camera',
        },
      ],
      'display-name': 'Berlin, DE',
      image: '/chronos-exporter/images/berlin-deutschland.png',
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
        {
          'display-name': 'Sim 1d',
          iccid: '123-671-779',
        },
        {
          'display-name': 'Sim 1e',
          iccid: '123-671-780',
        },
        {
          'display-name': 'Sim 1f',
          iccid: '123-671-781',
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
    {
      'device-groups': [
        {
          'device-group-id': 'phones-north',
          devices: [
            '9870001',
            '9870002',
            '9870003',
            '9870004',
            '9870005',
            '9870006',
          ],
          'display-name': 'Phones North group',
        },
        {
          'device-group-id': 'phones-south',
          devices: ['987100A', '987101B', '987102C', '987103D'],
          'display-name': 'Phones South group',
        },
        {
          'device-group-id': 'cameras',
          devices: [
            '9873001',
            '9873002',
            '9873003',
            '9873004',
            '9873005',
            '9873006',
            '9873007',
            '9873008',
            '9873009',
          ],
          'display-name': 'Cameras group',
        },
        {
          'device-group-id': 'drone-central',
          devices: ['80001XA', '80002XB', '80003XC', '80004XD', '80005XE'],
          'display-name': 'Drone Central Group',
        },
        {
          'device-group-id': 'drone-east',
          devices: ['81001XA', '81002XB', '81003XC', '81004XD'],
          'display-name': 'Drone East Group',
        },
        {
          'device-group-id': 'drone-west',
          devices: ['82001XA', '82002XB', '82003XC'],
          'display-name': 'Drone West Group',
        },
      ],
      devices: [
        {
          'display-name': 'Phone 1',
          imei: '987-654-3211',
          location: 'Electronic city',
          'serial-number': '9870001',
          sim: '987-654-321',
          type: 'Pixel 5 Phone',
        },
        {
          'display-name': 'Phone 2',
          imei: '987-654-3212',
          location: 'Marathahalli',
          'serial-number': '9870002',
          sim: '987-654-322',
          type: 'Pixel 6 PRO Phone',
        },
        {
          'display-name': 'Phone 3',
          imei: '987-654-3213',
          location: 'RR Nagar',
          'serial-number': '9870003',
          sim: '987-654-323',
          type: 'Pixel 6 PRO Phone',
        },
        {
          'display-name': 'Phone 4',
          imei: '987-654-3214',
          location: 'Koramangala',
          'serial-number': '9870004',
          sim: '987-654-324',
          type: 'iPhone XR',
        },
        {
          'display-name': 'Phone 5',
          imei: '',
          location: 'Marathahalli',
          'serial-number': '9870005',
          type: 'iPhone 11 PRO',
        },
        {
          'display-name': 'Phone 6',
          imei: '',
          location: 'Rajajinagar',
          'serial-number': '9870006',
          type: 'iPhone 12',
        },
        {
          'display-name': 'Phone 7',
          imei: '987-654-3215',
          location: 'Banaswadi',
          'serial-number': '987100A',
          sim: '987-654-325',
          type: 'iPhone 12 Mini',
        },
        {
          'display-name': 'Phone 8',
          imei: '987-654-3216',
          location: 'Electronic city',
          'serial-number': '987101B',
          sim: '987-654-326',
          type: 'Pixel 6 PRO Phone',
        },
        {
          'display-name': 'Phone 9',
          imei: '987-654-3217',
          location: 'Rajajinagar',
          'serial-number': '987102C',
          sim: '987-654-327',
          type: 'iPhone 11',
        },
        {
          'display-name': 'Phone 10',
          imei: '',
          location: 'some location',
          'serial-number': '987103D',
          type: 'Pixel 6 Pro',
        },
        {
          'display-name': 'Camera 1',
          imei: '987-654-3218',
          location: 'Electronic city',
          'serial-number': '9873001',
          sim: '987-654-328',
          type: 'camera',
        },
        {
          'display-name': 'Camera 2',
          imei: '987-654-3219',
          location: 'Rajajinagar',
          'serial-number': '9873002',
          sim: '987-654-329',
          type: 'camera',
        },
        {
          'display-name': 'Camera 3',
          imei: '987-654-3220',
          location: 'Banaswadi',
          'serial-number': '9873003',
          sim: '987-654-330',
          type: 'camera',
        },
        {
          'display-name': 'Camera 4',
          imei: '987-654-3221',
          location: 'Koramangala',
          'serial-number': '9873004',
          sim: '987-654-331',
          type: 'camera',
        },
        {
          'display-name': 'Camera 5',
          imei: '987-654-3222',
          location: 'Yeswanthpur',
          'serial-number': '9873005',
          sim: '987-654-332',
          type: 'camera',
        },
        {
          'display-name': 'Camera 6',
          imei: '987-654-3223',
          location: 'Karihobanahalli',
          'serial-number': '9873006',
          sim: '987-654-333',
          type: 'camera',
        },
        {
          'display-name': 'Camera 7',
          imei: '',
          location: 'Krishnarajapura',
          'serial-number': '9873007',
          type: 'camera',
        },
        {
          'display-name': 'Camera 8',
          imei: '',
          location: 'Kithiganur',
          'serial-number': '9873008',
          type: 'camera',
        },
        {
          'display-name': 'Camera 9',
          imei: '',
          location: 'Gundur',
          'serial-number': '9873009',
          type: 'camera',
        },
        {
          'display-name': 'Drone 1',
          imei: '987-654-3224',
          location: 'Vidyaranyapura',
          'serial-number': '80001XA',
          sim: '987-654-334',
          type: 'drone',
        },
        {
          'display-name': 'Drone 2',
          imei: '987-654-3225',
          location: 'Electronic city',
          'serial-number': '80002XB',
          sim: '987-654-335',
          type: 'drone',
        },
        {
          'display-name': 'Drone 3',
          imei: '987-654-3226',
          location: 'Electronic city',
          'serial-number': '80003XC',
          sim: '987-654-336',
          type: 'drone',
        },
        {
          'display-name': 'Drone 4',
          imei: '',
          location: 'RR Nagar',
          'serial-number': '80004XD',
          type: 'drone',
        },
        {
          'display-name': 'Drone 5',
          imei: '',
          location: 'Vidyaranyapura',
          'serial-number': '80005XE',
          type: 'drone',
        },
        {
          'display-name': 'Drone 6',
          imei: '987-654-3227',
          location: 'Electronic city',
          'serial-number': '81001XA',
          sim: '987-654-337',
          type: 'drone',
        },
        {
          'display-name': 'Drone 7',
          imei: '987-654-3228',
          location: 'Electronic city',
          'serial-number': '81002XB',
          sim: '987-654-338',
          type: 'drone',
        },
        {
          'display-name': 'Drone 8',
          imei: '',
          location: 'Gundur',
          'serial-number': '81003XC',
          type: 'drone',
        },
        {
          'display-name': 'Drone 9',
          imei: '',
          location: 'Kithiganur',
          'serial-number': '81004XD',
          type: 'drone',
        },
        {
          'display-name': 'Drone 10',
          imei: '987-654-3229',
          location: 'Electronic city',
          'serial-number': '82001XA',
          sim: '987-654-339',
          type: 'drone',
        },
        {
          'display-name': 'Drone 11',
          imei: '',
          location: 'Kithiganur',
          'serial-number': '82002XB',
          type: 'drone',
        },
        {
          'display-name': 'Drone 12',
          imei: '',
          location: 'Krishnarajapura',
          'serial-number': '82003XC',
          type: 'drone',
        },
      ],
      'display-name': 'Bengaluru, INDIA',
      image: '/chronos-exporter/images/bengaluru-india.png',
      sims: [
        {
          'display-name': 'Sim 1',
          iccid: '987-654-321',
        },
        {
          'display-name': 'Sim 2',
          iccid: '987-654-322',
        },
        {
          'display-name': 'Sim 3',
          iccid: '987-654-323',
        },
        {
          'display-name': 'Sim 4',
          iccid: '987-654-324',
        },
        {
          'display-name': 'Sim 5',
          iccid: '987-654-325',
        },
        {
          'display-name': 'Sim 6',
          iccid: '987-654-326',
        },
        {
          'display-name': 'Sim 7',
          iccid: '987-654-327',
        },
        {
          'display-name': 'Sim 8',
          iccid: '987-654-328',
        },
        {
          'display-name': 'Sim 9',
          iccid: '987-654-329',
        },
        {
          'display-name': 'Sim 10',
          iccid: '987-654-330',
        },
        {
          'display-name': 'Sim 11',
          iccid: '987-654-331',
        },
        {
          'display-name': 'Sim 12',
          iccid: '987-654-332',
        },
        {
          'display-name': 'Sim 13',
          iccid: '987-654-333',
        },
        {
          'display-name': 'Sim 14',
          iccid: '987-654-334',
        },
        {
          'display-name': 'Sim 15',
          iccid: '987-654-335',
        },
        {
          'display-name': 'Sim 16',
          iccid: '987-654-336',
        },
        {
          'display-name': 'Sim 17',
          iccid: '987-654-337',
        },
        {
          'display-name': 'Sim 18',
          iccid: '987-654-338',
        },
        {
          'display-name': 'Sim 19',
          iccid: '987-654-339',
        },
        {
          'display-name': 'Sim 20',
          iccid: '987-654-340',
        },
        {
          'display-name': 'Sim 21',
          iccid: '987-654-341',
        },
      ],
      'site-id': 'bengaluru',
      slices: [
        {
          applications: ['nvr-application', 'occupant-counter'],
          'device-groups': ['cameras'],
          'display-name': 'Cameras Slice',
          'slice-id': 'bengaluru-slice-cameras',
        },
        {
          applications: ['expenses-application'],
          'device-groups': ['phones-north', 'phones-south'],
          'display-name': 'Phones Slice',
          'slice-id': 'begaluru-slice-phones',
        },
        {
          applications: ['drone-application'],
          'device-groups': ['drone-central', 'drone-east', 'drone-west'],
          'display-name': 'Drone Slice',
          'slice-id': 'bengaluru-slice-drones',
        },
      ],
      'small-cells': [
        {
          'display-name': 'North Cell',
          'small-cell-id': 'bengaluru-north',
        },
        {
          'display-name': 'South Cell',
          'small-cell-id': 'bengaluru-south',
        },
        {
          'display-name': 'East Cell',
          'small-cell-id': 'bengaluru-east',
        },
        {
          'display-name': 'West Cell',
          'small-cell-id': 'bengaluru-west',
        },
        {
          'display-name': 'Central Cell',
          'small-cell-id': 'bengaluru-central',
        },
        {
          'display-name': 'East Central Cell',
          'small-cell-id': 'bengaluru-east-central',
        },
      ],
    },
  ],
};

describe('DeviceSimService', () => {
  let service: DeviceSimService;
  let fixture: ComponentFixture<DeviceSimService>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(DeviceSimService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should run #mySite()', () => {
    spyOn(service.mySiteSubject, 'next');
    service.mySite('fremont');
    expect(service.mySiteSubject.next).toHaveBeenCalled();
    expect(service.selectedSite).toEqual('fremont');
  });

  it('should run #getSite()', async () => {
    service.mySiteSubject.next('fremont');
    service.getSite().subscribe((res) => {
      fixture.detectChanges();
      expect(res).toEqual('fremont');
    });
  });

  it('should run #mySims()', () => {
    spyOn(service.mySimsSubject, 'next');
    service.mySims([{ iccid: '987-654-341' }]);
    expect(service.mySimsSubject.next).toHaveBeenCalled();
    expect(service.selectedSims).toEqual([{ iccid: '987-654-341' }]);
  });

  it('should run #getSims()', async () => {
    service.mySimsSubject.next([{ iccid: '987-654-341' }]);
    service.getSims().subscribe((res) => {
      expect(res).toEqual([{ iccid: '987-654-341' }]);
    });
  });

  it('should run #mySim()', () => {
    service.mySim('fremont');
    expect(service.mySimSubject).toEqual(
      new BehaviorSubject<string>('fremont')
    );
  });

  it('should run #getDevice()', async () => {
    service.myDeviceSubject.next([
      {
        'display-name': 'Device 1',
        location: 'floor 1',
        'serial-number': '12345',
        type: 'device',
      },
    ]);
    service.getDevice().subscribe((res) => {
      expect(res).toEqual([
        {
          'display-name': 'Device 1',
          location: 'floor 1',
          'serial-number': '12345',
          type: 'device',
        },
      ]);
    });
  });

  it('should run #setDevice()', () => {
    service.setDevice([
      {
        'display-name': 'Device 1',
        location: 'floor 1',
        'serial-number': '12345',
        type: 'device',
      },
    ]);
    expect(service.myDeviceSubject1).toEqual(
      new BehaviorSubject<InventoryDevice[]>([
        {
          'display-name': 'Device 1',
          location: 'floor 1',
          'serial-number': '12345',
          type: 'device',
        },
      ])
    );
  });

  it('should run #getData()', async () => {
    service.getData().subscribe((res) => {
      expect(res).toEqual(mockData);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `https://chronos-dev.onlab.us/chronos-exporter/config`,
    });
    req.flush(mockData);
  });
});
