/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        DashboardModule,
      ],
      declarations: [DashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #parentWillTakeAction()', async () => {
    spyOn(component, 'hideAcknowledgedView');
    spyOn(component, 'getSlices');
    spyOn(component.slices, 'expandAllCard');
    spyOn(component.slices, 'collapseAllCard');
    component.slices.viewType = 'viewType';
    spyOn(component.slices, 'onSelectCard');
    component.isAcknowledged = 8;
    component.isExpand = false;
    component.parentWillTakeAction({
      siteId: 'fremont',
      siteData: [
        {
          applications: [],
          'device-groups': [],
          'display-name': 'Phones Slice',
          'slice-id': 'fremont-slice-phones',
          devices: [],
        },
      ],
      siteIndex: 0,
      alerts: 4,
      sitePlans: { isometric: true, layers: [], origin: 'ORIGIN_TOP_LEFT' },
    });

    component.isExpand = true;
    component.parentWillTakeAction({
      siteId: 'fremont',
      siteData: [
        {
          applications: [],
          'device-groups': [],
          'display-name': 'Phones Slice',
          'slice-id': 'fremont-slice-phones',
          devices: [],
        },
      ],
      siteIndex: 0,
      alerts: 4,
      sitePlans: null,
    });
  });

  it('should run #parentWillTakeForExpand()', async () => {
    component.isExpand = true;
    spyOn(component.slices, 'expandAllCard');
    spyOn(component.slices, 'collapseAllCard');
    component.parentWillTakeForExpand();
    component.isExpand = false;
    component.parentWillTakeForExpand();

    // expect(component.slices.expandAllCard).toHaveBeenCalled();
    // expect(component.slices.collapseAllCard).toHaveBeenCalled();
  });

  it('should run #parentWillTakeActionSlice()', async () => {
    component.parentWillTakeActionSlice({
      viewType: true,
      isalert: true,
    });
    component.parentWillTakeActionSlice({
      viewType: false,
      isalert: true,
    });
  });

  it('should run #showAcknowledgedView()', async () => {
    spyOn(component.slices, 'expandAllCard');
    component.showAcknowledgedView(0);
    // expect(component.slices.expandAllCard).toHaveBeenCalled();
  });

  it('should run #hideAcknowledgedView()', async () => {
    spyOn(component.slices, 'hideAcknowledgedView');
    component.hideAcknowledgedView();
    // expect(component.slices.hideAcknowledgedView).toHaveBeenCalled();
  });

  it('should run #openDialog()', async () => {
    spyOn(component.dialog, 'open');
    component.openDialog();
    // expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should run #getSlices()', async () => {
    spyOn(component.slices, 'onSelectCard');
    component.sitesService.siteId = 'siteId';
    component.getSlices();
    // expect(component.slices.onSelectCard).toHaveBeenCalled();
  });
});
