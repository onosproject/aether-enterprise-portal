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
      // console.log(window.location.hash);
      this.showNavbar =
        window.location.hash !== '#/' &&
        window.location.hash !== '#/login' &&
        window.location.hash !== '#/login/forgot-password';
    });
  }
}
