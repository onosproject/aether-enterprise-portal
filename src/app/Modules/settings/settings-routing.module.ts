import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DeviceSimComponent } from './device-sim/device-sim.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'device-sim', component: DeviceSimComponent },
  { path: 'services', component: ServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
