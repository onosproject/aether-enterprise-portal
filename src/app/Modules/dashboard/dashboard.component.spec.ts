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
import { smallCell } from '../../shared/classes/dashboard-data';
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

  // it('should run #parentWillTakeAction()', () => {
  //   spyOn(component, 'hideAcknowledgedView');
  //   spyOn(component, 'getSlices').and.callThrough();
  //   component.slices = component.slices;
  //   component.isAcknowledged = 8;
  //   component.isExpand = false;
  //   spyOn(component.slices, 'expandAllCard');
  //   spyOn(component.slices, 'collapseAllCard');
  //   component.slices.viewType = 'viewType';
  //   spyOn(component.slices, 'onSelectCard');

  //   component.parentWillTakeAction({
  //     siteId: 'fremont',
  //     siteData: [
  //       {
  //         applications: [],
  //         'device-groups': [],
  //         'display-name': 'Phones Slice',
  //         'slice-id': 'fremont-slice-phones',
  //         devices: [
  //           {
  //             'display-name': 'Cameras group',
  //             devices: [],
  //             isExpanded: true,
  //           },
  //         ],
  //       },
  //     ],
  //     siteIndex: 0,
  //     alerts: 4,
  //     sitePlans: { isometric: true, layers: [], origin: 'ORIGIN_TOP_LEFT' },
  //   });

  //   component.isExpand = true;
  //   component.parentWillTakeAction({
  //     siteId: 'fremont',
  //     siteData: [
  //       {
  //         applications: [],
  //         'device-groups': [],
  //         'display-name': 'Phones Slice',
  //         'slice-id': 'fremont-slice-phones',
  //         devices: [
  //           {
  //             'display-name': 'Cameras group',
  //             devices: [],
  //             isExpanded: true,
  //           },
  //         ],
  //       },
  //     ],
  //     siteIndex: 0,
  //     alerts: 4,
  //     sitePlans: null,
  //   });
  //   expect(component.slices.onSelectCard).toHaveBeenCalled();
  //   expect(component.hideAcknowledgedView).not.toHaveBeenCalled();
  //   jasmine.clock().tick(101);
  //   expect(component.hideAcknowledgedView).toHaveBeenCalled();
  //   expect(component.slices.expandAllCard).toHaveBeenCalled();
  //   expect(component.slices.collapseAllCard).toHaveBeenCalled();
  // });

  it('should run #parentWillTakeAction()', () => {
    component.isAcknowledged = 8;
    component.isExpand = false;
    spyOn(component, 'hideAcknowledgedView');
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
    expect(component.hideAcknowledgedView).not.toHaveBeenCalled();
    jasmine.clock().tick(101);
    expect(component.hideAcknowledgedView).toHaveBeenCalled();
    expect(component.siteId).toEqual(4);
    expect(component.config).toEqual({
      isometric: true,
      layers: [],
      origin: 'ORIGIN_TOP_LEFT',
    });
    expect(component.slices.viewType).toEqual('Logical');
    expect(component.slices.onSelectCard).toHaveBeenCalled();
  });

  it('should run #parentWillTakeAction()', () => {
    component.isAcknowledged = 8;
    component.isExpand = false;
    spyOn(component, 'hideAcknowledgedView');
    spyOn(component.slices, 'onSelectCard');
    spyOn(component, 'getSlices');
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
    expect(component.getSlices).not.toHaveBeenCalled();
    jasmine.clock().tick(11);
    expect(component.getSlices).toHaveBeenCalled();
    expect(component.siteId).toEqual(4);
    expect(component.config).toEqual(null);
    expect(component.viewType).toEqual('Logical');
    expect(component.isExpand).toBeTrue();
    expect(component.slices.viewType).toEqual('Logical');
    expect(component.slices.onSelectCard).toHaveBeenCalled();
  });

  it('should run #parentWillTakeAction()', () => {
    component.isAcknowledged = 8;
    component.isExpand = true;
    spyOn(component, 'hideAcknowledgedView');
    spyOn(component.slices, 'onSelectCard');
    spyOn(component, 'getSlices');
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
    expect(component.getSlices).not.toHaveBeenCalled();
    jasmine.clock().tick(11);
    expect(component.getSlices).toHaveBeenCalled();
    expect(component.siteId).toEqual(4);
    expect(component.config).toEqual(null);
    expect(component.isExpand).toBeTrue();
    expect(component.viewType).toEqual('Logical');
    expect(component.slices.viewType).toEqual('Logical');
    expect(component.slices.onSelectCard).toHaveBeenCalled();
  });

  it('should run #parentWillTakeForExpand()', () => {
    component.isExpand = true;
    spyOn(component.slices, 'expandAllCard');
    component.parentWillTakeForExpand();
    expect(component.slices.expandAllCard).toHaveBeenCalled();
    expect(component.isExpand).toBeFalse();
  });

  it('should run #parentWillTakeForExpand()', () => {
    component.isExpand = false;
    spyOn(component.slices, 'collapseAllCard');
    component.parentWillTakeForExpand();
    expect(component.slices.collapseAllCard).toHaveBeenCalled();
    expect(component.isExpand).toBeTrue();
  });

  it('should run #parentWillTakeActionSlice()', () => {
    component.parentWillTakeActionSlice({
      viewType: true,
      isalert: true,
    });
    expect(component.viewType).toEqual('Physical');
    expect(component.isAcknowledged).toEqual(8);
  });

  it('should run #parentWillTakeActionSlice()', () => {
    component.parentWillTakeActionSlice({
      viewType: false,
      isalert: true,
    });
    expect(component.isExpand).toBeTrue;
    expect(component.isAcknowledged).toEqual(8);
  });

  it('should run #showAcknowledgedView()', () => {
    spyOn(component.slices, 'expandAllCard');
    component.showAcknowledgedView(0);
    expect(component.slices.expandAllCard).toHaveBeenCalled();
    expect(component.isAcknowledged).toEqual(8);
    expect(component.sitesService.numberOfAlerts).toEqual(0);
    expect(smallCell[0][0].alerts).toEqual(
      component.sitesService.allSmallCellsData
    );
  });

  it('should run #hideAcknowledgedView()', () => {
    spyOn(component.slices, 'hideAcknowledgedView');
    component.hideAcknowledgedView();
    expect(component.slices.hideAcknowledgedView).toHaveBeenCalled();
    expect(component.isAcknowledged).toEqual(12);
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
    spyOn(component.slices, 'onSelectCard');

    component.getSlices();
    expect(component.slices.onSelectCard).toHaveBeenCalled();
  });
});
