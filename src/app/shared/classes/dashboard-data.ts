/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const sites = Array([
  {
    id: 1,
    status: 1,
    title: 'Fremont, CA',
    background_img: 'card-header-bg.png',
    devices: 5,
    slices: 3,
    services: 2,
    alerts: 1,
  },
  {
    id: 4,
    status: 0,
    title: 'Fremont, CA',
    background_img: 'card-header-bg.png',
    devices: 240,
    slices: 5,
    services: 3,
    alerts: 0,
  },
  {
    id: 2,
    status: 1,
    title: 'Fremont, CA',
    background_img: 'card-header-bg.png',
    devices: 50,
    slices: 3,
    services: 2,
    alerts: 5,
  },
  {
    id: 3,
    status: 0,
    title: 'Fremont, CA',
    background_img: 'card-header-bg.png',
    devices: 55,
    slices: 5,
    services: 3,
    alerts: 0,
  },
]);

export const slice = Array([
  {
    site_id: 1,
    data: [
      {
        id: 1,
        alert: 5,
        status: 1,
        group: [
          {
            id: 1,
            title: 'Camera Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Camera 1',
                status: 0,
              },
              {
                id: '2',
                title: 'Camera 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Camera 3',
                status: 0,
              },
              {
                id: '4',
                title: 'Camera 4',
                status: 0,
              },
            ],
          },
          {
            id: 2,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
          {
            id: 3,
            title: 'Device Group',
            status: 0,
            cameras: [
              {
                id: '1',
                title: 'Device 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Device 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Device 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 1,
            tittle: 'Services',
            status: 1,
            group: [
              {
                id: 1,
                title: 'Stream',
              },
              {
                id: 2,
                title: 'Pan',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        alert: 5,
        status: 0,
        group: [
          {
            id: 4,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
          {
            id: 5,
            title: 'Device Group',
            status: 0,
            cameras: [
              {
                id: '1',
                title: 'Device 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Device 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Device 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 2,
            tittle: 'Services',
            status: 0,
          },
        ],
      },
      {
        id: 3,
        alert: 5,
        status: 0,
        group: [
          {
            id: 6,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
          {
            id: 7,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 0,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 3,
            tittle: 'Services',
            status: 0,
          },
        ],
      },
    ],
  },
  {
    site_id: 2,
    data: [
      {
        id: 4,
        alert: 5,
        status: 1,
        group: [
          {
            id: 8,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
          {
            id: 9,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 0,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 1,
            tittle: 'Services',
            status: 1,
          },
        ],
      },
      {
        id: 5,
        alert: 5,
        status: 1,
        group: [
          {
            id: 10,
            title: 'Device Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Device 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Device 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Device 3',
                status: 0,
              },
            ],
          },
          {
            id: 11,
            title: 'Device Group',
            status: 0,
            cameras: [
              {
                id: '1',
                title: 'Device 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Device 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Device 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 1,
            tittle: 'Services',
            status: 1,
          },
        ],
      },
    ],
  },
  {
    site_id: 3,
    data: [
      {
        id: 6,
        alert: 5,
        status: 0,
        group: [
          {
            id: 12,
            title: 'Camera Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Camera 1',
                status: 0,
              },
              {
                id: '2',
                title: 'Camera 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Camera 3',
                status: 0,
              },
            ],
          },
          {
            id: 13,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
          {
            id: 14,
            title: 'Device Group',
            status: 0,
            cameras: [
              {
                id: '1',
                title: 'Device 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Device 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Device 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 1,
            tittle: 'Services',
            status: 1,
          },
        ],
      },
    ],
  },
  {
    site_id: 4,
    data: [
      {
        id: 7,
        alert: 5,
        status: 0,
        group: [
          {
            id: 15,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
          {
            id: 16,
            title: 'Device Group',
            status: 0,
            cameras: [
              {
                id: '1',
                title: 'Device 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Device 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Device 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 1,
            tittle: 'Services',
            status: 1,
          },
        ],
      },
      {
        id: 8,
        alert: 5,
        status: 0,
        group: [
          {
            id: 2,
            title: 'Sensor Group',
            status: 1,
            cameras: [
              {
                id: '1',
                title: 'Sensor 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Sensor 2',
                status: 0,
              },
              {
                id: '3',
                title: 'Sensor 3',
                status: 0,
              },
            ],
          },
          {
            id: 3,
            title: 'Device Group',
            status: 0,
            cameras: [
              {
                id: '1',
                title: 'Device 1',
                status: 1,
              },
              {
                id: '2',
                title: 'Device 2',
                status: 1,
              },
              {
                id: '3',
                title: 'Device 3',
                status: 0,
              },
            ],
          },
        ],
        services: [
          {
            id: 1,
            tittle: 'Services',
            status: 0,
          },
        ],
      },
    ],
  },
]);

export const smallCell = Array([
  {
    alerts: [
      // {
      //   id: 1,
      //   title: 'Alert Causing Entity Camera 1(CG)',
      //   priorty: 'High',
      //   status: 'Critical',
      //   group: 'Cameras group',
      //   serialNumber: 7568111,
      // },
      // {
      //   id: 2,
      //   title: 'Alert Causing Entity Camera 4(CG)',
      //   priorty: 'Low',
      //   status: 'null',
      //   group: 'Cameras group',
      //   serialNumber: 7568114,
      // },
      // {
      //   id: 3,
      //   title: 'Alert Causing Entity Camera 5(SG)',
      //   priorty: 'Medium',
      //   status: 'null',
      //   group: 'Cameras group',
      //   serialNumber: 7568115,
      // },
      // {
      //   id: 4,
      //   title: 'Alert Causing Entity Phone 1(SG)',
      //   priorty: 'High',
      //   status: 'null',
      //   group: 'Phones group',
      //   serialNumber: '752365A',
      // },
      // {
      //   id: 5,
      //   title: 'Alert Causing Entity Phone 3(SG)',
      //   priorty: 'High',
      //   status: 'null',
      //   group: 'Phones group',
      //   serialNumber: '18876873',
      // },
      // {
      //   id: 1,
      //   title: 'Alert Causing Entity Camera 1(CG)',
      //   priorty: 'High',
      //   status: 'Critical',
      //   group: 'Cameras group',
      //   serialNumber: 7568111,
      // },
    ],
    tickets: [
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
      {
        id: 3,
        title: 'Alert Causing Entity Sensor 1(SG)',
        priorty: 'Medium',
        status: 'null',
        group: 'Sensor group',
        serialNumber: 7568115,
      },
      {
        id: 4,
        title: 'Alert Causing Entity Sensor 9(SG)',
        priorty: 'High',
        status: 'null',
        group: 'Sensor group',
        serialNumber: 7568115,
      },
      {
        id: 5,
        title: 'Alert Causing Entity Phone 1(SG)',
        priorty: 'High',
        status: 'null',
        group: 'Phones group',
        serialNumber: '752365A',
      },
    ],
    history: [],
  },
]);
