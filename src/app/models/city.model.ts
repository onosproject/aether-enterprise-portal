/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CityUsers } from './city-users.model';

export class City {
  public id: number;
  public name: string;
  public users: CityUsers[];
  // public users: any[];
}
