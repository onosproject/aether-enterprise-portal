/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceComponent } from './delete-service.component';

describe('DeleteServiceComponent', () => {
  let component: DeleteServiceComponent;
  let fixture: ComponentFixture<DeleteServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteServiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
