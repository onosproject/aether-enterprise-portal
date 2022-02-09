/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormGroup } from '@angular/forms';

export class User {
  public ppic: string;
  public active: string;
  public name: string;
  public email: string;
  public emailAlert: boolean;
  public deviceAlert: boolean;
  public centralAlert: boolean;
  public siteEquipmentAlert: boolean;
  public securityAlert: boolean;
  public cities: any[];
  public id: number;
  public form?: FormGroup;
}
