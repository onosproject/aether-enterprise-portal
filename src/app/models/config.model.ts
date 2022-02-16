/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Application } from './application.model';
import { Enterprise } from './enterprise.model';
import { Site } from './site.model';

export interface Config {
  applications: Application[];
  enterprise: Enterprise[];
  sites: Site[];
}
