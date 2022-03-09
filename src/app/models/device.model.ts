/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Device {
  'display-name': string;
  imei: string;
  location: string;
  position?: {
    'position-x': number;
    'position-y': number;
    'site-plan': string;
  };
  'serial-number': string;
  sim?: string;
  type: string;
  isExpanded?: boolean;
}
