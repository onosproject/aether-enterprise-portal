/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DeviceGroupsComponent } from './device-groups/device-groups.component';
import { DeviceSimComponent } from './device-sim/device-sim.component';
import { ServicesComponent } from './services/services.component';
import { SlicesComponent } from './slices/slices.component';
import { SmallCellComponent } from './small-cell/small-cell.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'device-sim', component: DeviceSimComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'device-groups', component: DeviceGroupsComponent },
  { path: 'slices', component: SlicesComponent },
  { path: 'small-cells', component: SmallCellComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
