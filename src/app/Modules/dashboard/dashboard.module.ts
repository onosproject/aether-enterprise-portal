import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {MaterialModule} from '../material/material.module'
import { DashboardComponent } from './dashboard.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SitesComponent } from './pages/sites/sites.component';
import { SlicesComponent } from './pages/slices/slices.component';
import { ModalComponent } from './pages/modal/modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SitesComponent,
    SlicesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    CdkAccordionModule,
    DragDropModule,
  ]
})
export class DashboardModule { }
