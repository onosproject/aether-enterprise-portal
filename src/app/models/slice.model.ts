/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Application } from './application.model';
import { Device } from './device.model';

export interface Slice {
  'display-name': string;
  'slice-id': string;
  applications: string[];
  'device-groups': string[];
  devices?: {
    'display-name': string;
    'device-group-id'?: string;
    devices: Device[];
    isExpanded?: boolean;
  }[];
  services?: {
    ' display-name': string;
    isExpanded: boolean;
    service: Application[];
  }[];
  alerts?: number;
}
