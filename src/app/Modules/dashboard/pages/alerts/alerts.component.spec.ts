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
  });

  it('should run #setparent()', () => {
    component.setparent(0);
  });

  it('should run #setchild()', () => {
    component.setchild(0);
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
    component.selectFilter('Ignore');
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
    component.selectFilter('Ignore');
  });

  // it('should run #selectedTabValue()', () => {
  //    component.selectedTabValue(<MatTabChangeEvent>);
  // });

  it('should run #selectedDevice()', () => {
    component.informParent = component.informParent;
    spyOn(component.informParent, 'emit');
    component.selectedDevice('', {});
    expect(component.informParent.emit).toHaveBeenCalled();
  });

  it('should run #raiseTicket()', () => {
    component.raiseTicket();
  });

  it('should run #openChatView()', () => {
    component.openChatView();
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
    component.snackBar = component.snackBar;
    component.setResponedStatus('ignor', 0);
  });

  it('should run #sortData()', () => {
    component.smallCells = [
      {
        status: null,
      },
    ];
    spyOn(component.smallCells, 'sort').and.returnValue([
      {
        priorty: {},
      },
    ]);
    component.TabIndex = 1;

    component.tickets = component.tickets;
    spyOn(component.tickets, 'sort').and.returnValue([
      {
        priorty: {},
      },
    ]);
    component.sortData('high');
    component.tickets = component.tickets;
    component.sortData('low');
    component.TabIndex = 0;
    component.sortData('high');
    component.sortData('low');
    expect(component.smallCells.sort).toHaveBeenCalled();
    expect(component.tickets.sort).toHaveBeenCalled();
  });

  it('should run #goToDashboard()', () => {
    component.route = component.route;
    spyOn(component.route, 'navigate');
    component.goToDashboard();
    expect(component.route.navigate).toHaveBeenCalled();
  });
});
