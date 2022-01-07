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
import { ModalComponent } from './pages/modal/modal.component';
import { SmallCellsComponent } from './pages/small-cells/small-cells.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    SitesComponent,
    SlicesComponent,
    ModalComponent,
    SmallCellsComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    CdkAccordionModule,
    DragDropModule,
    FormsModule,
  ],
})
export class DashboardModule {}
