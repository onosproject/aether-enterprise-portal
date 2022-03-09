/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/Modules/material/material.module';
// import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { SlicesComponent } from './slices.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modals/delete-card/modal.component';
import { smallCell } from '../../../../shared/classes/dashboard-data';

describe('SlicesComponent', () => {
  let component: SlicesComponent;

  let fixture: ComponentFixture<SlicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [SlicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlicesComponent);
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

  // it('should run #onWindowResize()', async () => {
  //   let event: UIEvent;
  //   component.onWindowResize(event);
  // });

  // it('should run #dragAndDrop()', async () => {
  //   let event: CdkDragDrop<string[]>;
  //   component.dragAndDrop(event);
  // });

  it('should run #expandSlice()', () => {
    component.expandSlice();
    expect(component.isEditable).toBeFalse();
  });

  it('should run #collapseSlice()', () => {
    component.isExpand = true;
    component.informParent = component.informParent;
    spyOn(component.informParent, 'emit').and.callThrough();
    component.collapseSlice();
    expect(component.informParent.emit).toHaveBeenCalled();
    expect(component.isExpand).toBeFalse();
  });

  it('should run #cancelEdit()', () => {
    component.isEditable = true;
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [],
            isExpanded: true,
          },
        ],
        services: [
          { 'display-name': 'Services', service: [], isExpanded: true },
        ],
      },
    ];
    component.cancelEdit(0);
    expect(component.isEditable).toBeFalse();
    expect(component.sliceData[0].devices[0].isExpanded).toEqual(false);
    expect(component.sliceData[0].services[0].isExpanded).toEqual(false);
  });

  it('should run #collapseAllCard()', () => {
    component.collapseAllCard();
    expect(component.isExpand).toBeFalse();
    expect(component.panelIndex).toEqual(undefined);
  });

  it('should run #onSelectCard()', () => {
    component.TabValue = [];
    spyOn(component, 'logicforAlertData');
    component.onSelectCard({
      siteId: '',
      siteData: [
        {
          applications: [],
          'device-groups': [],
          'display-name': 'Phones Slice',
          'slice-id': 'fremont-slice-phones',
          devices: [
            { 'display-name': 'Cameras group', devices: [], isExpanded: true },
          ],
        },
      ],
      siteIndex: 0,
      sitePlans: {
        isometric: true,
        layers: [],
        origin: 'ORIGIN_TOP_LEFT',
      },
    });
    expect(component.logicforAlertData).not.toHaveBeenCalled();
    jasmine.clock().tick(11);
    expect(component.logicforAlertData).toHaveBeenCalled();
    expect(component.siteIndex).toEqual(0);
    expect(component.sitePlans).toEqual({
      isometric: true,
      layers: [],
      origin: 'ORIGIN_TOP_LEFT',
    });
    expect(component.config).toEqual({
      isometric: true,
      layers: [],
      origin: 'ORIGIN_TOP_LEFT',
    });
  });

  it('should run #logicforAlertData()', () => {
    component.sliceData = [
      {
        alerts: 1,
        applications: ['nvr-application'],
        ' device-groups': ['cameras'],
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [
              {
                'display-name': 'Camera 1',
                imei: '123-456-7893',
                location: 'Front entrance',
                position: {},
                'serial-number': '7568111',
              },
            ],
            isExpanded: true,
          },
        ],
      },
    ];
    component.logicforAlertData();
    expect(smallCell[0][0].alerts.length).toBeGreaterThan(0);
    expect(component.sitesService.allSmallCellsData).toEqual(
      smallCell[0][0].alerts
    );
  });

  it('should run #getTotalDevices()', () => {
    component.getTotalDevices([
      {
        'display-name': '',
        devices: [],
        isExpanded: true,
      },
    ]);

    const value = component.getTotalDevices([
      {
        'display-name': '',
        devices: [],
        isExpanded: true,
      },
    ]);
    expect(value).toEqual(0);
  });

  it('should run #expandAllCard()', () => {
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [],
            isExpanded: true,
          },
        ],
        services: [
          { 'display-name': 'Services', service: [], isExpanded: true },
        ],
      },
    ];
    component.expandAllCard(true);
    jasmine.clock().tick(11);
    fixture.detectChanges();
    expect(component.sliceData[0].devices[0].isExpanded).toEqual(false);
    expect(component.sliceData[0].services[0].isExpanded).toEqual(false);
    expect(component.isExpand).toBeTrue();
    expect(component.isEditable).toBeFalse();
    expect(component.isAcknowledged).toEqual(8);
  });

  it('should run #openAlerts()', () => {
    component.sitesService = component.sitesService;
    component.sitesService.numberOfAlerts = 0;
    component.sitesService.allSmallCellsData = [
      {
        group: {},
      },
    ];
    component.informParent = component.informParent;
    spyOn(component.informParent, 'emit');
    component.openAlerts(0, '');
    expect(component.informParent.emit).toHaveBeenCalled();
    expect(component.sitesService.numberOfAlerts).toEqual(0);
    expect(component.isExpand).toBeTrue();
    expect(component.isEditable).toBeFalse();
    expect(component.isAcknowledged).toEqual(8);
  });

  it('should run #onEdit()', () => {
    component.isEditable = true;
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [],
            isExpanded: true,
          },
        ],
        services: [
          { 'display-name': 'Services', service: [], isExpanded: true },
        ],
      },
    ];
    component.onEdit(0, 0);
    expect(component.sliceId).toEqual(0);
    expect(component.siteIndex).toEqual(0);
    expect(component.sliceData[0].devices[0].isExpanded).toEqual(true);
    expect(component.sliceData[0].services[0].isExpanded).toEqual(true);
  });

  it('should run #setAccordion()', () => {
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ];
    component.setAccordion(0, 0);
    jasmine.clock().tick(11);
    expect(component.sliceData[0].devices[0].isExpanded).toBeFalse();
  });

  it('should run #removeDevice()', () => {
    component.myTimeout = null;
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [{ isExpanded: true }, { isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ];
    component.removeDevice(0, 0, 7568112);
    expect(component.removedCameraId).toEqual(7568112);
    expect(component.removedDeviceId).toEqual(0);
    jasmine.clock().tick(3000);
    expect(component.sliceData).toEqual([
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ]);
  });

  it('should run #removeServiceGroup()', () => {
    component.myTimeout = null;
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [],
            isExpanded: true,
          },
        ],
        services: [
          {
            'display-name': 'Services',
            service: [{ isExpanded: true }, { isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ];
    component.removeServiceGroup(0, 0, 0);
    jasmine.clock().tick(3000);
    expect(component.sliceData).toEqual([
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [],
            isExpanded: true,
          },
        ],
        services: [
          {
            'display-name': 'Services',
            service: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ]);
  });

  it('should run #undoDevice()', () => {
    component.undoDevice();
    expect(component.removedCameraId).toBeNull();
    expect(component.removedServiceGroupId).toBeNull();
    expect(component.removedServiceId).toBeNull();
    expect(component.removedDeviceId).toBeNull();
    expect(component.myTimeout).toBeNull();
  });

  it('should run #openDialog()', () => {
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [{ isExpanded: true }],
            isExpanded: true,
          },
          {
            'display-name': 'Phone group',
            devices: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ];
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof ModalComponent>);
    component.openDialog(11, true);
    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.sliceData).toEqual([
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Phone group',
            devices: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ]);
  });

  it('should run #openDialog()', () => {
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
        services: [
          {
            'display-name': 'Services',
            service: [{ isExpanded: true }],
            isExpanded: true,
          },
          {
            'display-name': 'Services',
            service: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ];
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof ModalComponent>);
    component.openDialog(0, false);
    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.sliceData).toEqual([
      {
        alerts: 0,
        devices: [
          {
            'display-name': 'Cameras group',
            devices: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
        services: [
          {
            'display-name': 'Services',
            service: [{ isExpanded: true }],
            isExpanded: true,
          },
        ],
      },
    ]);
  });

  it('should run #hideAcknowledgedView()', () => {
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            devices: [
              {
                'display-name': 'Cameras group',
                devices: [],
                isExpanded: true,
              },
            ],
          },
        ],
        services: [
          { 'display-name': 'Services', service: [], isExpanded: false },
        ],
      },
    ];
    component.hideAcknowledgedView();
    expect(component.isAcknowledged).toEqual(12);
    expect(component.isExpand).toBeFalse();
    expect(component.panelIndex).toBeUndefined();
    expect(component.group).toEqual('');
    expect(component.serialNumber).toEqual('');
    expect(component.sliceData[0].devices[0].isExpanded).toEqual(false);
    expect(component.sliceData[0].services[0].isExpanded).toEqual(false);
  });

  it('should run #selectedDevice()', () => {
    component.selectedDevice({
      group: '',
      serialNumber: 0,
    });
    expect(component.group).toEqual('');
    expect(component.serialNumber).toEqual(0);
  });

  it('should run #calculateDeviceTop()', () => {
    component.calculateDeviceTop(0, [
      {
        'display-name': 'Cameras group',
        devices: [],
        isExpanded: true,
      },
    ]);
    const value = component.calculateDeviceTop(0, [
      {
        'display-name': 'Cameras group',
        devices: [],
        isExpanded: true,
      },
    ]);
    expect(value).toEqual(20);
  });
  it('should run #calculateDeviceTop()', () => {
    component.calculateDeviceTop(1, [
      {
        'display-name': 'Cameras group',
        devices: [],
        isExpanded: true,
        'device-group-id': '',
        selected: 1,
      },
    ]);
    const value = component.calculateDeviceTop(1, [
      {
        'display-name': 'Cameras group',
        devices: [],
        isExpanded: true,
        'device-group-id': '',
        selected: 1,
      },
    ]);
    expect(value).toEqual(270);
  });

  it('should run #calculateJointVerticalPosition()', () => {
    component.calculateJointVerticalPosition(
      [{ 'display-name': 'string', devices: [], isExpanded: true }],
      0
    );
    const value = component.calculateJointVerticalPosition(
      [{ 'display-name': 'string', devices: [], isExpanded: true }],
      0
    );
    expect(value).toEqual(140);
  });

  it('should run #goToPhysicalView()', () => {
    (component.sitePlans = {
      isometric: true,
      layers: [],
      origin: 'ORIGIN_TOP_LEFT',
    }),
      (component.informParent = component.informParent);
    spyOn(component.informParent, 'emit');
    spyOn(component, 'showSnackBar');
    component.goToPhysicalView();
    component.sitePlans = null;
    component.goToPhysicalView();

    expect(component.informParent.emit).toHaveBeenCalled();
    expect(component.showSnackBar).toHaveBeenCalled();
  });

  it('should run #showSnackBar()', () => {
    component.snackBar = component.snackBar;
    spyOn(component.snackBar, 'openFromComponent');
    component.showSnackBar();
    expect(component.snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should run #calculateSVGHeight()', () => {
    component.calculateSVGHeight([
      { 'display-name': 'Cameras group', devices: [], isExpanded: true },
    ]);
    const value = component.calculateSVGHeight([
      { 'display-name': 'Cameras group', devices: [], isExpanded: true },
    ]);
    expect(value).toEqual(450);
  });
});
