/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard.component';
// import { NavbarComponent } from '../../components/header/navbar/navbar.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SitesComponent } from './pages/sites/sites.component';
import { SlicesComponent } from './pages/slices/slices.component';
import { ModalComponent } from './pages/modals/delete-card/modal.component';
import { GraphComponent } from './pages/modals/graph-modal/graph.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { FormsModule } from '@angular/forms';
import { JoinerModule } from '../joiner/joiner.module';
import { NavbarModule } from 'src/app/components/header/navbar/navbar.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    SitesComponent,
    SlicesComponent,
    ModalComponent,
    GraphComponent,
    AlertsComponent,
    // NavbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    CdkAccordionModule,
    DragDropModule,
    FormsModule,
    JoinerModule,
    NavbarModule,
    ChartsModule,
  ],
})
export class DashboardModule {}
