/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'aep-decomission',
  templateUrl: './decomission.component.html',
  styles: [],
  providers: [],
})
export class DecomissionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: string }) {}
}
