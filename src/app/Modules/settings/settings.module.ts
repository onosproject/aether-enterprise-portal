/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceSimComponent } from './device-sim/device-sim.component';
import { ServicesComponent } from './services/services.component';
import { SelectDevicesComponent } from './dialogs/select-devices/select-devices.component';
import { SelectSimsComponent } from './dialogs/select-sims/select-sims.component';
import { SideNavbarComponent } from 'src/app/side-navbar/side-navbar.component';

import { DeleteDevicesComponent } from './dialogs/delete-devices/delete-devices.component';
import { DeviceGroupsComponent } from './device-groups/device-groups.component';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';
import { RemoveUserComponent } from './dialogs/remove-user/remove-user.component';
import { SlicesComponent } from './slices/slices.component';
import { DeleteSlicesComponent } from './dialogs/delete-slices/delete-slices.component';
import { DeleteInventoryComponent } from './dialogs/delete-inventory/delete-inventory.component';
import { SmallCellComponent } from './small-cell/small-cell.component';
import { JoinerModule } from '../joiner/joiner.module';
import { DecomissionComponent } from './dialogs/decomission/decomission.component';
import { RecomissionComponent } from './dialogs/recomission/recomission.component';
import { DeleteDevicegroupsComponent } from './dialogs/delete-devicegroups/delete-devicegroups.component';
import { DeleteServiceComponent } from './dialogs/delete-service/delete-service.component';
import { AuditUserComponent } from './dialogs/audit-user/audit-user.component';

@NgModule({
  declarations: [
    SideNavbarComponent,
    AdminComponent,
    DeviceSimComponent,
    ServicesComponent,
    SelectDevicesComponent,
    SelectSimsComponent,
    DeleteDevicesComponent,
    DeviceGroupsComponent,
    DeleteUserComponent,
    RemoveUserComponent,
    SlicesComponent,
    DeleteSlicesComponent,
    DeleteInventoryComponent,
    SmallCellComponent,
    DecomissionComponent,
    RecomissionComponent,
    DeleteDevicegroupsComponent,
    DeleteServiceComponent,
    AuditUserComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    JoinerModule,
  ],
})
export class SettingsModule {}
