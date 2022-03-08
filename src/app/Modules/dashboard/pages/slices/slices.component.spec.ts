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
  });

  it('should run #collapseSlice()', () => {
    component.isExpand = true || false;
    component.informParent = component.informParent;
    spyOn(component.informParent, 'emit').and.callThrough();
    component.collapseSlice();
    expect(component.informParent.emit).toHaveBeenCalled();
  });

  it('should run #cancelEdit()', () => {
    component.isEditable = true || false;
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
          { 'display-name': 'Services', service: [], isExpanded: false },
        ],
      },
    ];

    component.cancelEdit(0);
  });

  it('should run #collapseAllCard()', () => {
    component.collapseAllCard();
  });

  it('should run #onSelectCard()', () => {
    component.TabValue = [];
    // component.sliceData = [];
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

    component.sitesService = component.sitesService;
    component.sitesService.allSmallCellsData = 'allSmallCellsData';
    component.logicforAlertData();
  });

  it('should run #getTotalDevices()', () => {
    component.getTotalDevices([
      {
        'display-name': '',
        devices: [],
        isExpanded: true || false,
      },
    ]);
  });

  it('should run #expandAllCard()', () => {
    component.isExpand = true;
    component.panelIndex = undefined;
    component.siteIndex = 0;
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
          { 'display-name': 'Services', service: [], isExpanded: false },
        ],
      },
    ];
    component.expandAllCard(true);
    jasmine.clock().tick(11);
    fixture.detectChanges();
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
          { 'display-name': 'Services', service: [], isExpanded: false },
        ],
      },
    ];
    component.onEdit(0, 0);
    component.isEditable = false;
    component.onEdit(0, 0);
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
  });

  it('should run #removeDevice()', () => {
    component.myTimeout = null;
    component.removeDevice(1, 0, 7568112);
  });

  it('should run #removeServiceGroup()', () => {
    component.removeServiceGroup(0, 0, 0);
  });

  it('should run #undoDevice()', () => {
    component.undoDevice();
  });

  it('should run #openDialog()', () => {
    component.dialog = component.dialog;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof ModalComponent>);
    component.openDialog(11, true);
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should run #openDialog()', () => {
    component.dialog = component.dialog;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof ModalComponent>);
    component.openDialog(0, false);
    expect(component.dialog.open).toHaveBeenCalled();
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
  });

  it('should run #selectedDevice()', () => {
    component.selectedDevice({
      group: '',
      serialNumber: 0,
    });
  });

  it('should run #calculateDeviceTop()', () => {
    component.calculateDeviceTop(0, [
      {
        'display-name': 'Cameras group',
        devices: [],
        isExpanded: true,
      },
    ]);
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
  });

  it('should run #calculateJointVerticalPosition()', () => {
    component.calculateJointVerticalPosition(
      [{ 'display-name': 'string', devices: [], isExpanded: true }],
      0
    );
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
  });
});
