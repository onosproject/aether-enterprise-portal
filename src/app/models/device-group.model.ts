/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DeviceGroup {
  'display-name': string;
  'device-group-id'?: string;
  devices: string[];
  isExpanded?: boolean;
}
