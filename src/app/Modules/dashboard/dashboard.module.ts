import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    CdkAccordionModule,
    MatGridListModule,
  ]
})
export class DashboardModule { }
