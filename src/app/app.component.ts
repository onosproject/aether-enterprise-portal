/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'aether';
  showNavbar: boolean = true;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showNavbar =
        window.location.hash !== '#/' &&
        window.location.hash !== '#/login' &&
        window.location.hash !== '#/login/forgot-password';
    });
  }
}
