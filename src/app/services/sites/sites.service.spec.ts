/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';

import { SitesService } from './sites.service';
import { HttpClientModule } from '@angular/common/http';

describe('SitesService', () => {
  let service: SitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
