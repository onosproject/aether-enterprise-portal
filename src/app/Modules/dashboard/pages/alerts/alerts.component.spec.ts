/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { smallCell } from '../../../../shared/classes/dashboard-data';

describe('SmallCellsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertsComponent],
      imports: [
        MatMenuModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    component.ngOnInit();
    expect(component.smallCells).toEqual(smallCell[0][0].alerts);
  });

  it('should run #setparent()', () => {
    component.setparent(0);
    expect(component.parent).toEqual(0);
    expect(component.isRaiseTicket).toBeFalse();
    expect(component.chatView).toBeFalse();
  });

  it('should run #setchild()', () => {
    component.setchild(0);
    expect(component.child).toEqual(0);
  });

  it('should run #selectFilter()', () => {
    component.smallCells = [
      {
        id: 1,
        title: 'Alert Causing Entity Camera 2(CG)',
        priorty: 'Low',
        status: 'Ignore',
        group: 'Cameras group',
      },
    ];
    component.TabIndex = 0;
    component.selectFilter('All');
    expect(component.smallCells).toEqual(smallCell[0][0].alerts);
  });

  it('should run #selectFilter()', () => {
    component.smallCells = [
      {
        id: 1,
        title: 'Alert Causing Entity Camera 2(CG)',
        priorty: 'Low',
        status: 'Ignore',
        group: 'Cameras group',
      },
    ];
    component.TabIndex = 1;
    component.selectFilter('All');
    expect(component.tickets).toEqual(smallCell[0][0].tickets);
  });

  it('should run #selectedTabValue()', () => {
    component.selectedTabValue({ index: 0, tab: null });
    expect(component.TabIndex).toEqual(0);
    expect(component.parent).toEqual(0);
    expect(component.child).toEqual(null);
  });

  it('should run #selectedDevice()', () => {
    component.informParent = component.informParent;
    spyOn(component.informParent, 'emit');
    component.selectedDevice('', {});
    expect(component.informParent.emit).toHaveBeenCalled();
  });

  it('should run #raiseTicket()', () => {
    component.raiseTicket();
    expect(component.chatView).toBeFalse();
    expect(component.isRaiseTicket).toBeTrue();
  });

  it('should run #openChatView()', () => {
    component.openChatView();
    expect(component.chatView).toBeTrue();
    expect(component.isRaiseTicket).toBeFalse();
  });

  it('should run #setResponedStatus()', () => {
    component.TabIndex = 1;
    component.tickets = [
      {
        status: null,
      },
    ];
    spyOn(component.tickets, 'splice').and.callThrough();
    component.smallCells = [
      {
        status: null,
      },
    ];
    component.snackBar = component.snackBar;
    spyOn(component.snackBar, 'openFromComponent');
    component.setResponedStatus('Resolved', 0);
    expect(component.respondIndex).toEqual(0);
    expect(component.tickets.splice).toHaveBeenCalled();
    expect(component.snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should run #setResponedStatus()', () => {
    component.TabIndex = 1;
    component.tickets = [
      {
        status: null,
      },
    ];
    component.smallCells = [
      {
        status: null,
      },
    ];
    component.setResponedStatus('Ignor', 0);
    expect(component.TabIndex).toEqual(1);
    expect(component.tickets[0].status).toEqual('Ignor');
  });

  it('should run #setResponedStatus()', () => {
    component.TabIndex = 0;

    component.smallCells = [
      {
        status: null,
      },
    ];
    spyOn(component.smallCells, 'splice').and.callThrough();
    spyOn(component.snackBar, 'openFromComponent');
    component.setResponedStatus('Resolved', 0);
    expect(component.TabIndex).toEqual(0);
    expect(component.respondIndex).toEqual(0);
    expect(component.smallCells.splice).toHaveBeenCalled();
    expect(component.snackBar.openFromComponent).toHaveBeenCalled();
  });

  it('should run #setResponedStatus()', () => {
    component.TabIndex = 0;
    component.tickets = [
      {
        status: null,
      },
    ];
    component.smallCells = [
      {
        status: null,
      },
    ];
    component.setResponedStatus('Ignor', 0);
    expect(component.TabIndex).toEqual(0);
    expect(component.smallCells[0].status).toEqual('Ignor');
  });

  it('should run #sortData()', () => {
    component.smallCells = [
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
    ];
    component.TabIndex = 0;
    component.sortData('high');
    expect(component.smallCells).toEqual([
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
    ]);
  });

  it('should run #sortData()', () => {
    component.smallCells = [
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
    ];

    component.TabIndex = 0;
    component.sortData('low');
    expect(component.smallCells).toEqual([
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
    ]);
  });

  it('should run #sortData()', () => {
    component.TabIndex = 1;
    component.tickets = [
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
    ];
    component.sortData('high');
    expect(component.tickets).toEqual([
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
    ]);
  });

  it('should run #sortData()', () => {
    component.TabIndex = 1;
    component.tickets = [
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
    ];
    component.sortData('low');
    expect(component.tickets).toEqual([
      {
        id: 2,
        title: 'Alert Causing Entity Camera 4(CG)',
        priorty: 'Low',
        status: 'null',
        group: 'Cameras group',
        serialNumber: 7568112,
      },
      {
        id: 1,
        title: 'Alert Causing Entity Camera 1(CG)',
        priorty: 'High',
        status: 'Critical',
        group: 'Cameras group',
        serialNumber: 7568111,
      },
    ]);
  });

  it('should run #goToDashboard()', () => {
    spyOn(component.route, 'navigate');
    component.goToDashboard();
    expect(component.route.navigate).toHaveBeenCalled();
  });
});
