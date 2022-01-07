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
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SettingsModule {}
