import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SmallCellsComponent } from './pages/small-cells/small-cells.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'Small-Cells', component: SmallCellsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
