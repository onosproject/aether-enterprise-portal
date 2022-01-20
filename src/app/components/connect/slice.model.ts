export interface Device {
  'device-id': string;
  'display-name': string;
  location: string;
  status: boolean;
}

export interface DeviceGroup {
  'device-group-id': string;
  'display-name': string;
  isExpanded?: boolean;
  devices: Device[];
}

export interface Application {
  'application-id': string;
  'display-name': string;
  status: boolean;
}

export interface Slice {
  'slice-id': string;
  'display-name': string;
  deviceGroups: DeviceGroup[];
  applications: Application[];
}

export const sliceData: Slice[] = [
  {
    'slice-id': '1',
    'display-name': 'Critical Slice',
    deviceGroups: [
      {
        'device-group-id': '1',
        'display-name': 'Camera Group',
        isExpanded: false,
        devices: [
          {
            'device-id': '1',
            'display-name': 'Camera 1',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '2',
            'display-name': 'Camera 2',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '3',
            'display-name': 'Camera 3',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '2',
        'display-name': 'Camera Group 2',
        isExpanded: false,
        devices: [
          {
            'device-id': '4',
            'display-name': 'Camera 4',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '5',
            'display-name': 'Camera 5',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '6',
            'display-name': 'Camera 6',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '3',
        'display-name': 'Camera Group 3',
        isExpanded: false,
        devices: [
          {
            'device-id': '7',
            'display-name': 'Camera 7',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '8',
            'display-name': 'Camera 8',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '9',
            'display-name': 'Camera 9',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '1',
        'display-name': 'Camera Group',
        isExpanded: false,
        devices: [
          {
            'device-id': '1',
            'display-name': 'Camera 1',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '2',
            'display-name': 'Camera 2',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '3',
            'display-name': 'Camera 3',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '2',
        'display-name': 'Camera Group 2',
        isExpanded: false,
        devices: [
          {
            'device-id': '4',
            'display-name': 'Camera 4',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '5',
            'display-name': 'Camera 5',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '6',
            'display-name': 'Camera 6',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '3',
        'display-name': 'Camera Group 3',
        isExpanded: false,
        devices: [
          {
            'device-id': '7',
            'display-name': 'Camera 7',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '8',
            'display-name': 'Camera 8',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '9',
            'display-name': 'Camera 9',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '1',
        'display-name': 'Camera Group',
        isExpanded: false,
        devices: [
          {
            'device-id': '1',
            'display-name': 'Camera 1',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '2',
            'display-name': 'Camera 2',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '3',
            'display-name': 'Camera 3',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '2',
        'display-name': 'Camera Group 2',
        isExpanded: false,
        devices: [
          {
            'device-id': '4',
            'display-name': 'Camera 4',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '5',
            'display-name': 'Camera 5',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '6',
            'display-name': 'Camera 6',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '3',
        'display-name': 'Camera Group 3',
        isExpanded: false,
        devices: [
          {
            'device-id': '7',
            'display-name': 'Camera 7',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '8',
            'display-name': 'Camera 8',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '9',
            'display-name': 'Camera 9',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '1',
        'display-name': 'Camera Group',
        isExpanded: false,
        devices: [
          {
            'device-id': '1',
            'display-name': 'Camera 1',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '2',
            'display-name': 'Camera 2',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '3',
            'display-name': 'Camera 3',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '2',
        'display-name': 'Camera Group 2',
        isExpanded: false,
        devices: [
          {
            'device-id': '4',
            'display-name': 'Camera 4',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '5',
            'display-name': 'Camera 5',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '6',
            'display-name': 'Camera 6',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '3',
        'display-name': 'Camera Group 3',
        isExpanded: false,
        devices: [
          {
            'device-id': '7',
            'display-name': 'Camera 7',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '8',
            'display-name': 'Camera 8',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '9',
            'display-name': 'Camera 9',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
    ],
    applications: [
      {
        'application-id': '1',
        'display-name': 'Application 1',
        status: false,
      },
      {
        'application-id': '2',
        'display-name': 'Application 2',
        status: false,
      },
      {
        'application-id': '3',
        'display-name': 'Application 3',
        status: false,
      },
    ],
  },
  {
    'slice-id': '2',
    'display-name': 'Critical Slice 2',
    deviceGroups: [
      {
        'device-group-id': '4',
        'display-name': 'Camera Group 4',
        isExpanded: false,
        devices: [
          {
            'device-id': '10',
            'display-name': 'Camera 10',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '11',
            'display-name': 'Camera 11',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '12',
            'display-name': 'Camera 12',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '5',
        'display-name': 'Camera Group 5',
        isExpanded: true,
        devices: [
          {
            'device-id': '13',
            'display-name': 'Camera 13',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '14',
            'display-name': 'Camera 14',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '15',
            'display-name': 'Camera 15',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '6',
        'display-name': 'Camera Group 6',
        isExpanded: false,
        devices: [
          {
            'device-id': '16',
            'display-name': 'Camera 16',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '17',
            'display-name': 'Camera 17',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '18',
            'display-name': 'Camera 18',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
    ],
    applications: [
      {
        'application-id': '4',
        'display-name': 'Application 4',
        status: false,
      },
      {
        'application-id': '5',
        'display-name': 'Application 5',
        status: false,
      },
      {
        'application-id': '6',
        'display-name': 'Application 6',
        status: false,
      },
    ],
  },
  {
    'slice-id': '3',
    'display-name': 'Critical Slice 3',
    deviceGroups: [
      {
        'device-group-id': '7',
        'display-name': 'Camera Group 7',
        isExpanded: true,
        devices: [
          {
            'device-id': '19',
            'display-name': 'Camera 19',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '20',
            'display-name': 'Camera 20',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '21',
            'display-name': 'Camera 21',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '8',
        'display-name': 'Camera Group 8',
        isExpanded: false,
        devices: [
          {
            'device-id': '22',
            'display-name': 'Camera 22',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '23',
            'display-name': 'Camera 23',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '24',
            'display-name': 'Camera 24',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
      {
        'device-group-id': '9',
        'display-name': 'Camera Group 9',
        isExpanded: false,
        devices: [
          {
            'device-id': '25',
            'display-name': 'Camera 25',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '26',
            'display-name': 'Camera 26',
            location: 'Floor 1',
            status: true,
          },
          {
            'device-id': '27',
            'display-name': 'Camera 27',
            location: 'Floor 1',
            status: true,
          },
        ],
      },
    ],
    applications: [
      {
        'application-id': '7',
        'display-name': 'Application 7',
        status: false,
      },
      {
        'application-id': '8',
        'display-name': 'Application 8',
        status: false,
      },
      {
        'application-id': '9',
        'display-name': 'Application 9',
        status: false,
      },
    ],
  },
];
