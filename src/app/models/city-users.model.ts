/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { User } from './user.model';

export interface CityUsers {
  accessLevel: number;
  details?: User;
  userId: number;
}
