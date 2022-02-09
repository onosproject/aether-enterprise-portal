/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DeviceDG {
  'display-name': string;
  imei: string;
  location: string;
  'serial-number': string;
  sim: string;
  type: string;
  selected: number;
}
