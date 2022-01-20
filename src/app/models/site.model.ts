import { DeviceGroup } from './device-group.model';
import { Device } from './device.model';
import { Sim } from './sim.model';
import { SitePlan } from './site-plan.model';
import { Slice } from './slice.model';
import { SmallCell } from './small-cell.model';

export interface Site {
  'device-groups': DeviceGroup[];
  devices: Device[];
  'display-name': string;
  image: string;
  sims: Sim[];
  'site-id': string;
  'site-plans': SitePlan[];
  slices: Slice[];
  'small-cells': SmallCell[];
}
