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
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #parentWillTakeAction()', () => {
    spyOn(component, 'hideAcknowledgedView');
    spyOn(component, 'getSlices').and.callThrough();
    component.slices = component.slices;
    component.isAcknowledged = 8;
    component.isExpand = false;
    spyOn(component.slices, 'expandAllCard');
    spyOn(component.slices, 'collapseAllCard');
    component.slices.viewType = 'viewType';
    spyOn(component.slices, 'onSelectCard');

    component.parentWillTakeAction({
      siteId: 'fremont',
      siteData: [
        {
          applications: [],
          'device-groups': [],
          'display-name': 'Phones Slice',
          'slice-id': 'fremont-slice-phones',
          devices: [
            {
              'display-name': 'Cameras group',
              devices: [],
              isExpanded: true,
            },
          ],
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
          devices: [
            {
              'display-name': 'Cameras group',
              devices: [],
              isExpanded: true,
            },
          ],
        },
      ],
      siteIndex: 0,
      alerts: 4,
      sitePlans: null,
    });

    expect(component.slices.onSelectCard).toHaveBeenCalled();
    expect(component.hideAcknowledgedView).not.toHaveBeenCalled();
    jasmine.clock().tick(101);
    expect(component.hideAcknowledgedView).toHaveBeenCalled();
    expect(component.slices.expandAllCard).toHaveBeenCalled();
    expect(component.slices.collapseAllCard).toHaveBeenCalled();
  });

  it('should run #parentWillTakeForExpand()', () => {
    component.isExpand = true;
    spyOn(component.slices, 'expandAllCard');
    spyOn(component.slices, 'collapseAllCard');
    component.parentWillTakeForExpand();
    component.isExpand = false;
    component.parentWillTakeForExpand();
    expect(component.slices.expandAllCard).toHaveBeenCalled();
    expect(component.slices.collapseAllCard).toHaveBeenCalled();
  });

  it('should run #parentWillTakeActionSlice()', () => {
    component.parentWillTakeActionSlice({
      viewType: true,
      isalert: true,
    });
    component.parentWillTakeActionSlice({
      viewType: false,
      isalert: true,
    });
  });

  it('should run #showAcknowledgedView()', () => {
    spyOn(component.slices, 'expandAllCard');
    component.showAcknowledgedView(0);
    expect(component.slices.expandAllCard).toHaveBeenCalled();
  });

  it('should run #hideAcknowledgedView()', () => {
    spyOn(component.slices, 'hideAcknowledgedView');
    component.hideAcknowledgedView();
    expect(component.slices.hideAcknowledgedView).toHaveBeenCalled();
  });

  it('should run #openDialog()', () => {
    spyOn(component.dialog, 'open');
    component.openDialog();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should run #getSlices()', () => {
    component.sitesService.siteId = 'fremont';
    component.sitesService.siteData = [
      {
        applications: [],
        'device-groups': [],
        'display-name': 'Phones Slice',
        'slice-id': 'fremont-slice-phones',
        devices: [
          { 'display-name': 'Cameras group', devices: [], isExpanded: true },
        ],
      },
    ];
    component.sitesService.siteIndex = 0;
    component.sitesService.sitePlanes = {
      isometric: true,
      layers: [],
      origin: 'ORIGIN_TOP_LEFT',
    };
    spyOn(component.slices, 'onSelectCard').and.callThrough();

    component.getSlices();
    expect(component.slices.onSelectCard).toHaveBeenCalled();
  });
});
