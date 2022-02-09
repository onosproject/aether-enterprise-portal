/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimelineResult } from './timeline-result.model';

export interface TimelineData {
  status: string;
  data: {
    result: TimelineResult[];
  };
}
