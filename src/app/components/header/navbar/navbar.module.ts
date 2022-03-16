/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { MaterialModule } from 'src/app/Modules/material/material.module';
import { RouterModule } from '@angular/router';
import { MenuDirective } from './menu.directive';

@NgModule({
  declarations: [NavbarComponent, MenuDirective],
  imports: [MaterialModule, RouterModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
