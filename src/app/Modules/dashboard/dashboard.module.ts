import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../../components/header/navbar/navbar.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SitesComponent } from './pages/sites/sites.component';
import { SlicesComponent } from './pages/slices/slices.component';
import { ModalComponent } from './pages/modals/delet-card/modal.component';
import { GraphComponent } from './pages/modals/graph-modal/graph.component';
import { SmallCellsComponent } from './pages/small-cells/small-cells.component';
import { FormsModule } from '@angular/forms';
// import { JoinerComponent } from '../../Modules/joiner/joiner.component';
import { JoinerModule } from '../joiner/joiner.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SitesComponent,
    SlicesComponent,
    ModalComponent,
    GraphComponent,
    SmallCellsComponent,
    NavbarComponent,
    // JoinerComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    CdkAccordionModule,
    DragDropModule,
    FormsModule,
    JoinerModule,
  ],
})
export class DashboardModule {}
