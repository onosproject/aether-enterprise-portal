export interface ConnectedDevice {
  'display-name': string;
  imei: string;
  location: string;
  // position: {
  //   'position-x': number;
  //   'position-y': number;
  //   'site-plan': string;
  // };
  'serial-number': string;
  sim: string;
  type: string;
  selected: number;
  // isExpanded?: boolean;
}
