/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material/material.module';

import { DecomissionComponent } from './decomission.component';

describe('DecomissionComponent', () => {
  let component: DecomissionComponent;
  let fixture: ComponentFixture<DecomissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecomissionComponent],
      imports: [MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecomissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
