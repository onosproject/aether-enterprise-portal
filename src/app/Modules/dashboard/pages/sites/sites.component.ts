import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { sites } from '../../../../shared/classes/dashboard-data';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  sites: any;
  selected: any = 1;

  @Input() message: any;
  @Output() informParent = new EventEmitter();

  constructor() {
    this.sites = sites[0];
  }

  ngOnInit(): void {}

  onSelectCard(value: any) {
    this.selected = value;
    this.informParent.emit(value);
  }
}
