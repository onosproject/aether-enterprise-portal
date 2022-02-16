/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimesObject } from './times-object.model';

export interface TimelineTimes {
  activeStatus: string;
  times: TimesObject[];
}
