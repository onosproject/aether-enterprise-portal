/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';

@Component({
  selector: 'aep-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  TabParentValue = ['bandwidth'];
  TabChildValue = ['1h'];
}
