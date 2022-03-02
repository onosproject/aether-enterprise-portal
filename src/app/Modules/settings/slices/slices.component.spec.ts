/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlicesComponent } from './slices.component';
import {
  // FormControl,
  // FormGroup,
  ReactiveFormsModule,
  // Validators,
} from '@angular/forms/';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { DeviceSimService } from 'src/app/services/device-sim.service';
// import { DeviceSimStub } from '../device-sim/device-sim.service.mock';
import { DeleteSlicesComponent } from '../dialogs/delete-slices/delete-slices.component';
import { of } from 'rxjs';

describe('Slices1Component', () => {
  let component: SlicesComponent;
  let fixture: ComponentFixture<SlicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlicesComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
      ],
      // providers: [{ provide: DeviceSimService, useClass: DeviceSimStub }],
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

  it('should run #changeSelectionDeviceGroups()', async () => {
    component.deviceGroupsInventory = component.deviceGroupsInventory;
    const id = 'cameras';
    const name = 'cameras';
    const devices = ['000SEN1', '000SEN2', '000SEN3'];
    const deviceGroupIndex = 0;
    component.changeSelectionDeviceGroups(id, name, devices, deviceGroupIndex);
  });

  it('should run #deleteSummaryDeviceGroups()', async () => {
    const deviceGroupIndex = 0;
    component.deleteSummaryDeviceGroups(deviceGroupIndex);
  });

  it('should run #changeSelectionServices()', async () => {
    component.servicesInventory = component.servicesInventory;
    const id = 'cameras';
    const name = 'cameras';
    const serviceIndex = 0;
    component.changeSelectionServices(id, name, serviceIndex);
  });

  it('should run #deleteSummaryServices()', async () => {
    const serviceIndex = 0;
    component.deleteSummaryServices(serviceIndex);
  });

  it('should run #onSubmit()', async () => {
    component.deviceGroupsInventory = component.deviceGroupsInventory;
    component.servicesInventory = component.servicesInventory;
    component.selectedServices = [
      {
        'application-id': 'VC-application',
        'display-name': 'Voice Control',
        selected: 1,
      },
    ];
    component.selectedDeviceGroups = [
      {
        'device-group-id': 'sensors',
        'display-name': 'Sensors Group',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        selected: 1,
      },
    ];
    component.summaryArray = [
      {
        summarySliceName: 'sensors',
        summarySliceType: 'sensors',
        summaryDownlink: '3-4 GHz',
        summaryUplink: '14-14.5 GHz',
        summaryTrafficClass: 'Sensitive',
        summarymbr: 5,
        summarygbr: 5,
        form: {
          value: {
            sliceName: 'sensors',
            sliceType: 'sensors',
          },
        },
      },
    ];
    component.onSubmit();
  });

  it('should run #dataConvert()', async () => {
    component.siteSlices = [
      {
        applications: ['nvr-application'],
        'device-groups': ['cameras'],
        'display-name': 'Cameras Slice',
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        mbr: 5,
        gbr: 10,
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
        downlink: '11-12 GHz',
      },
    ];
    component.siteServices = [
      {
        'application-id': 'nvr-application',
        'display-name': 'Network Video Recorder',
        selected: 1,
      },
    ];
    component.siteDeviceGroups = [
      [
        {
          'device-group-id': 'cameras',
          devices: [
            '7568111',
            '7568112',
            '7568113',
            '7568114',
            '7568115',
            '7568116',
            '7568117',
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
          selected: 1,
        },
      ],
    ];
    component.dataConvert();
  });

  it('should run #createNewSlicesFun()', async () => {
    component.createNewSlicesFun();
  });

  it('should run #expandTrigger()', async () => {
    component.expandSlices = [];
    const index = 0;
    component.expandTrigger(index);
  });

  it('should run #expandTrigger()', async () => {
    component.expandSlices = [0, 0];
    const index = 0;
    component.expandTrigger(index);
  });

  it('should run #closeExpand()', async () => {
    component.closeExpand();
  });

  it('should run #getTotalDevices()', async () => {
    const data = [
      {
        'device-group-id': 'cameras',
        devices: [
          '7568111',
          '7568112',
          '7568113',
          '7568114',
          '7568115',
          '7568116',
          '7568117',
          '7568118',
          '7568119',
        ],
        'display-name': 'Cameras group',
        selected: 1,
      },
    ];
    component.getTotalDevices(data);
  });

  it('should run #listViewTrigger()', async () => {
    component.listViewSlices = [];
    const index = 0;
    component.listViewTrigger(index);
  });

  it('should run #listViewTrigger()', async () => {
    component.listViewSlices = [0, 0];
    const index = 0;
    component.listViewTrigger(index);
  });

  it('should run #closeListView()', async () => {
    component.closeListView();
  });

  it('should run #editTrigger()', async () => {
    // TODO component.editTrigger();
  });

  it('should run #closeEditView()', async () => {
    component.closeEditView();
  });

  it('should run #getEditControl()', async () => {
    // TODO component.getEditControl();
  });

  it('should run #onEdit()', async () => {
    // TODO component.onEdit();
  });

  it('should run #deleteDeviceGroups()', async () => {
    component.siteSlices = [
      {
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
          },
          {
            'application-id': 'occupant-counter',
            'display-name': 'Occupant Counting Application',
          },
        ],
        'device-groups': [
          {
            'device-group-id': 'cameras',
            devices: [
              '7568111',
              '7568112',
              '7568113',
              '7568114',
              '7568115',
              '7568116',
              '7568117',
              '7568118',
              '7568119',
            ],
            'display-name': 'Cameras group',
          },
        ],
        'display-name': 'Cameras Slice',
        downlink: '11-12 GHz',
        gbr: 10,
        mbr: 5,
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
      },
    ];
    const sliceIndex = 0;
    const deviceGroupIndex = 0;
    component.deleteDeviceGroups(sliceIndex, deviceGroupIndex);
  });

  it('should run #deleteServices()', async () => {
    component.siteSlices = [
      {
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
          },
          {
            'application-id': 'occupant-counter',
            'display-name': 'Occupant Counting Application',
          },
        ],
        'device-groups': [
          {
            'device-group-id': 'cameras',
            devices: [
              '7568111',
              '7568112',
              '7568113',
              '7568114',
              '7568115',
              '7568116',
              '7568117',
              '7568118',
              '7568119',
            ],
            'display-name': 'Cameras group',
          },
        ],
        'display-name': 'Cameras Slice',
        downlink: '11-12 GHz',
        gbr: 10,
        mbr: 5,
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
      },
    ];
    const sliceIndex = 0;
    const serviceIndex = 0;
    component.deleteServices(sliceIndex, serviceIndex);
  });

  it('should run #deleteServices()', async () => {
    component.siteSlices = [
      {
        applications: [
          {
            'application-id': 'nvr-application',
            'display-name': 'Network Video Recorder',
          },
          {
            'application-id': 'occupant-counter',
            'display-name': 'Occupant Counting Application',
          },
        ],
        'device-groups': [
          {
            'device-group-id': 'cameras',
            devices: [
              '7568111',
              '7568112',
              '7568113',
              '7568114',
              '7568115',
              '7568116',
              '7568117',
              '7568118',
              '7568119',
            ],
            'display-name': 'Cameras group',
          },
        ],
        'display-name': 'Cameras Slice',
        downlink: '11-12 GHz',
        gbr: 10,
        mbr: 5,
        'slice-id': 'fremont-slice-cameras',
        'slice-type': 'cameras',
        'traffic-class': 'Sensitive',
        uplink: '5-6 GHz',
      },
    ];
    const sliceIndex = 0;
    component.deleteSlice(sliceIndex);
  });

  it('should run #changeSelectionAddDeviceGroups()', async () => {
    component.deviceGroupsInventory = component.deviceGroupsInventory;
    const id = 'cameras';
    const name = 'cameras';
    const devices = ['000SEN1', '000SEN2', '000SEN3'];
    const deviceGroupIndex = 0;
    component.changeSelectionAddDeviceGroups(
      id,
      name,
      devices,
      deviceGroupIndex
    );
  });

  it('should run #changeSelectionAddDeviceGroups()', async () => {
    component.deviceGroupsInventory = [
      {
        'device-group-id': 'sensors',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'Sensors Group',
        selected: 1,
      },
    ];
    component.selectedAddDeviceGroups = [
      {
        'device-group-id': 'sensors',
        devices: ['000SEN1', '000SEN2', '000SEN3'],
        'display-name': 'Sensors Group',
        selected: 1,
      },
    ];
    const id = 'sensors';
    const name = 'Sensors Group';
    const devices = ['000SEN1', '000SEN2', '000SEN3'];
    const deviceGroupIndex = 0;
    component.changeSelectionAddDeviceGroups(
      id,
      name,
      devices,
      deviceGroupIndex
    );
  });

  it('should run #changeSelectionAddServices()', async () => {
    component.servicesInventory = component.servicesInventory;
    const id = 'VC-application';
    const name = 'Voice Control';
    const serviceIndex = 0;
    component.changeSelectionAddServices(id, name, serviceIndex);
  });

  it('should run #changeSelectionAddServices()', async () => {
    component.servicesInventory = [
      {
        'application-id': 'VC-application',
        'display-name': 'Voice Control',
        selected: 1,
      },
    ];
    component.selectedAddServices = [
      {
        'application-id': 'VC-application',
        'display-name': 'Voice Control',
        selected: 1,
      },
    ];
    const id = 'VC-application';
    const name = 'Voice Control';
    const serviceIndex = 0;
    component.changeSelectionAddServices(id, name, serviceIndex);
  });

  it('should run #openDeleteDialog()', async () => {
    const sliceIndex = 0;
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof DeleteSlicesComponent>);
    component.openDeleteDialog(sliceIndex);
  });

  it('should run #calculateSVGHeight()', async () => {
    const slices = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
        {
          'application-id': 'occupant-counter',
          'display-name': 'Occupant Counting Application',
        },
      ],
      'device-groups': [
        {
          'device-group-id': 'cameras',
          devices: [
            '7568111',
            '7568112',
            '7568113',
            '7568114',
            '7568115',
            '7568116',
            '7568117',
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
        },
        {
          'device-group-id': 'cameras',
          devices: [
            '7568111',
            '7568112',
            '7568113',
            '7568114',
            '7568115',
            '7568116',
            '7568117',
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
        },
      ],
      'display-name': 'Cameras Slice',
      downlink: '11-12 GHz',
      gbr: 10,
      mbr: 5,
      'slice-id': 'fremont-slice-cameras',
      'slice-type': 'cameras',
      'traffic-class': 'Sensitive',
      uplink: '5-6 GHz',
    };
    component.calculateSVGHeight(slices);
  });

  it('should run #calculateSVGHeight()', async () => {
    const slices = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
        {
          'application-id': 'occupant-counter',
          'display-name': 'Occupant Counting Application',
        },
      ],
      'device-groups': [
        {
          'device-group-id': 'cameras',
          devices: [
            '7568111',
            '7568112',
            '7568113',
            '7568114',
            '7568115',
            '7568116',
            '7568117',
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
        },
        {
          'device-group-id': 'cameras',
          devices: [
            '7568111',
            '7568112',
            '7568113',
            '7568114',
            '7568115',
            '7568116',
            '7568117',
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
        },
        {
          'device-group-id': 'cameras',
          devices: [
            '7568111',
            '7568112',
            '7568113',
            '7568114',
            '7568115',
            '7568116',
            '7568117',
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
        },
      ],
      'display-name': 'Cameras Slice',
      downlink: '11-12 GHz',
      gbr: 10,
      mbr: 5,
      'slice-id': 'fremont-slice-cameras',
      'slice-type': 'cameras',
      'traffic-class': 'Sensitive',
      uplink: '5-6 GHz',
    };
    component.calculateSVGHeight(slices);
  });

  it('should run #calculateSVGHeight()', async () => {
    const slices = {
      applications: [
        {
          'application-id': 'nvr-application',
          'display-name': 'Network Video Recorder',
        },
      ],
      'device-groups': [
        {
          'device-group-id': 'cameras',
          devices: [
            '7568111',
            '7568112',
            '7568113',
            '7568114',
            '7568115',
            '7568116',
            '7568117',
            '7568118',
            '7568119',
          ],
          'display-name': 'Cameras group',
        },
      ],
      'display-name': 'Cameras Slice',
      downlink: '11-12 GHz',
      gbr: 10,
      mbr: 5,
      'slice-id': 'fremont-slice-cameras',
      'slice-type': 'cameras',
      'traffic-class': 'Sensitive',
      uplink: '5-6 GHz',
    };
    component.calculateSVGHeight(slices);
  });

  it('should run #calculateVerticalPosition()', async () => {
    const index = 0;
    component.calculateVerticalPosition(index);
  });
});
