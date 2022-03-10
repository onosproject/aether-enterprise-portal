/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimelineMetric } from './timeline-metric.model';

export interface TimelineResult {
  metric: TimelineMetric;
  values: [number, string][];
}
