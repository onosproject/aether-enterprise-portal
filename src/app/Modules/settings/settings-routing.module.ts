import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DeviceGroupsComponent } from './device-groups/device-groups.component';
import { DeviceSimComponent } from './device-sim/device-sim.component';
import { ServicesComponent } from './services/services.component';
import { SlicesComponent } from './slices/slices.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'device-sim', component: DeviceSimComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'device-groups', component: DeviceGroupsComponent },
  { path: 'slices', component: SlicesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
