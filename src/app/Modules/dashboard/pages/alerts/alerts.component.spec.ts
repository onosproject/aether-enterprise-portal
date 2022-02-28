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

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  it('should run #setparent()', async () => {
    component.setparent(0);
  });

  it('should run #setchild()', async () => {
    component.setchild(0);
  });

  it('should run #selectFilter()', async () => {
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
  it('should run #selectFilter()', async () => {
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

  it('should run #selectFilter()', async () => {
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
  it('should run #selectFilter()', async () => {
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

  // it('should run #selectedTabValue()', async () => {
  //    component.selectedTabValue(<MatTabChangeEvent>);
  // });

  it('should run #selectedDevice()', async () => {
    component.informParent = component.informParent;
    component.selectedDevice('', {});
  });

  it('should run #raiseTicket()', async () => {
    component.raiseTicket();
  });

  it('should run #openChatView()', async () => {
    component.openChatView();
  });

  it('should run #setResponedStatus()', async () => {
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

    component.setResponedStatus('Resolved', 0);
  });

  it('should run #setResponedStatus()', async () => {
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

    component.setResponedStatus('ignor', 0);
  });

  it('should run #setResponedStatus()', async () => {
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
    component.TabIndex = 0;
    component.setResponedStatus('Resolved', 0);
  });

  it('should run #setResponedStatus()', async () => {
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
    component.TabIndex = 0;
    component.setResponedStatus('ignor', 0);
  });

  it('should run #sortData()', async () => {
    component.smallCells = [
      {
        status: null,
      },
    ];
    component.TabIndex = 1;
    component.sortData('high');
    component.sortData('low');

    component.TabIndex = 0;
    component.sortData('high');
    component.sortData('low');
  });

  it('should run #goToDashboard()', async () => {
    component.route = component.route;
    component.goToDashboard();
  });
});
