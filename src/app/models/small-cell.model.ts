/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SmallCell {
  'display-name': string;
  position: {
    'position-x': number;
    'position-y': number;
    'site-plan': string;
  };
  'small-cell-id': string;
}
