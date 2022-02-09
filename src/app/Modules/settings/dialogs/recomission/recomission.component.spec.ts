/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomissionComponent } from './recomission.component';

describe('RecomissionComponent', () => {
  let component: RecomissionComponent;
  let fixture: ComponentFixture<RecomissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecomissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
