/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TimelineMetric {
  device_status?: string;
  iccid: string;
  instance: string;
  job: string;
  msg?: string;
  serial_number: string;
  site: string;
  time?: string;
  __name__: string;
}
