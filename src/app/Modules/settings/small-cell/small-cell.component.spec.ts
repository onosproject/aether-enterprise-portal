/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { SmallCellComponent } from './small-cell.component';

describe('SmallCellComponent', () => {
  let component: SmallCellComponent;
  let fixture: ComponentFixture<SmallCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallCellComponent],
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
