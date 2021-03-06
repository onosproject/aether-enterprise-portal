/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

export interface PeriodicElement {
  ChangeID: string;
  TimeStamp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
  { TimeStamp: '22:11:59 Jan 1 2022', ChangeID: 'ABC12345' },
];

@Component({
  selector: 'aep-audit-user',
  templateUrl: './audit-user.component.html',
  styleUrls: ['./audit-user.component.scss'],
})
export class AuditUserComponent {
  displayedColumns = ['TimeStamp', 'ChangeID'];
  dataSource = ELEMENT_DATA;

  indexIs: number = null;

  setIndex(index: number): void {
    this.indexIs = index;
  }
}
