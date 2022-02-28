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
import { SitePlan } from 'src/app/models/site-plan.model';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modals/delete-card/modal.component';

describe('SlicesComponent', () => {
  let component: SlicesComponent;
  let _SitePlan: SitePlan;

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

  it('should run #expandSlice()', async () => {
    component.expandSlice();
  });

  it('should run #collapseSlice()', async () => {
    component.isExpand = true || false;
    component.informParent = component.informParent;

    component.collapseSlice();
  });

  it('should run #cancelEdit()', async () => {
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

  it('should run #collapseAllCard()', async () => {
    component.collapseAllCard();
  });

  it('should run #onSelectCard()', async () => {
    component.TabValue = [];
    component.sliceData = [];
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
      sitePlans: _SitePlan,
    });
  });

  it('should run #logicforAlertData()', async () => {
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

  it('should run #getTotalDevices()', async () => {
    component.getTotalDevices([
      {
        'display-name': '',
        devices: [],
        isExpanded: true || false,
      },
    ]);
  });

  // it('should run #getDevices()', async () => {
  //   component.sliceData = component.sliceData || {};
  //   component.sliceData = [null];
  //   component.getDevices([]);
  // });

  it('should run #expandAllCard()', async () => {
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
    component.expandAllCard(false);
  });

  it('should run #openAlerts()', async () => {
    component.sitesService = component.sitesService;
    component.sitesService.numberOfAlerts = 0;
    component.sitesService.allSmallCellsData = [
      {
        group: {},
      },
    ];
    component.informParent = component.informParent;
    component.openAlerts(0, '');
  });

  it('should run #onEdit()', async () => {
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

  it('should run #setAccordion()', async () => {
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

  it('should run #removeDevice()', async () => {
    component.myTimeout = null;
    component.removeDevice(1, 0, 7568112);
  });

  it('should run #removeServiceGroup()', async () => {
    component.removeServiceGroup(0, 0, 0);
  });

  it('should run #undoDevice()', async () => {
    component.undoDevice();
  });

  it('should run #openDialog()', async () => {
    component.dialog = component.dialog;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof ModalComponent>);
    component.openDialog(0, true);
  });

  it('should run #openDialog()', async () => {
    component.dialog = component.dialog;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof ModalComponent>);
    component.openDialog(0, false);
  });

  it('should run #hideAcknowledgedView()', async () => {
    component.sliceData = [
      {
        alerts: 0,
        devices: [
          {
            devices: [],
          },
        ],
        services: [
          { 'display-name': 'Services', service: [], isExpanded: false },
        ],
      },
    ];
    component.hideAcknowledgedView();
  });

  it('should run #selectedDevice()', async () => {
    component.selectedDevice({
      group: '',
      serialNumber: 0,
    });
  });

  it('should run #calculateDeviceTop()', async () => {
    component.calculateDeviceTop(0, [
      {
        'display-name': 'Cameras group',
        devices: [],
        isExpanded: true,
      },
    ]);
  });
  it('should run #calculateDeviceTop()', async () => {
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

  it('should run #calculateJointVerticalPosition()', async () => {
    component.calculateJointVerticalPosition(
      [{ 'display-name': 'string', devices: [], isExpanded: true }],
      0
    );
  });

  it('should run #goToPhysicalView()', async () => {
    (component.sitePlans = {
      isometric: true,
      layers: [],
      origin: 'ORIGIN_TOP_LEFT',
    }),
      (component.informParent = component.informParent);
    component.goToPhysicalView();
    component.sitePlans = null;
    component.goToPhysicalView();

    // expect(component.informParent.emit).toHaveBeenCalled();
    // expect(component.showSnackBar).toHaveBeenCalled();
  });

  it('should run #showSnackBar()', async () => {
    component.snackBar = component.snackBar;
    component.showSnackBar();
    // expect(component.snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should run #calculateSVGHeight()', async () => {
    component.calculateSVGHeight([
      { 'display-name': 'Cameras group', devices: [], isExpanded: true },
    ]);
  });
});
