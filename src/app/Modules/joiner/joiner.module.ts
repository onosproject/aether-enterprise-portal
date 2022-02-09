/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinerComponent } from './joiner.component';

@NgModule({
  declarations: [JoinerComponent],
  imports: [CommonModule],
  exports: [JoinerComponent],
})
export class JoinerModule {}
