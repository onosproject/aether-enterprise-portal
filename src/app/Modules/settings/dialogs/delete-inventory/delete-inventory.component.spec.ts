/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInventoryComponent } from './delete-inventory.component';

describe('DeleteInventoryComponent', () => {
  let component: DeleteInventoryComponent;
  let fixture: ComponentFixture<DeleteInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteInventoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
