import { Component, Output, EventEmitter } from '@angular/core';
import { smallCell } from '../../../../shared/classes/dashboard-data';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aep-small-cells',
  templateUrl: './small-cells.component.html',
  styleUrls: ['./small-cells.component.scss'],
})
export class SmallCellsComponent {
  @Output() informParent = new EventEmitter();

  parent: number = 0;
  child: number;
  selectedFilter: string = 'All';
  group: string;
  serialNumber: number;
  isRaiseTicket: boolean = false;
  chatView: boolean = false;
  ResponedStatus: string = 'Critical';
  smallCells: any;
  tickets: any;
  historys: any;
  respondIndex: number;
  TabIndex: number = 0;
  respondTab: string;
  isNotification: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private route: Router) {
    this.smallCells = smallCell[0][0].alerts;
    this.tickets = smallCell[0][0].tickets;
    this.historys = smallCell[0][0].history;

    this.activatedRoute.params.subscribe((data) => {
      this.isNotification = JSON.parse(data.isNotification);
    });

    // console.log('||||||||||||||', this.smallCells[0].alerts);
  }

  setparent(index: number): void {
    this.parent = index;
    this.isRaiseTicket = false;
    this.chatView = false;
  }
  setchild(index: number): void {
    this.child = index;
  }

  selectFilter(value: string): void {
    if (this.TabIndex === 0) {
      if (value === 'All') {
        this.smallCells = smallCell[0][0].alerts;
      } else {
        const result = this.smallCells.filter((res) => {
          return res.status === value;
        });
        this.smallCells = result;
      }
    }
    if (this.TabIndex === 1) {
      if (value === 'All') {
        this.tickets = smallCell[0][0].tickets;
      } else {
        const result = this.tickets.filter((res) => {
          return res.status === value;
        });
        this.tickets = result;
      }
    }

    this.selectedFilter = value;
  }

  selectedTabValue(event: { index: any }): void {
    // alert();
    this.TabIndex = event.index;
    // console.log(event);
    this.parent = 0;
    this.child = null;
  }
  selectedDevice(group: string, serialNumber: unknown): void {
    this.informParent.emit({
      group: group,
      serialNumber: serialNumber,
    });
  }

  raiseTicket(): void {
    this.chatView = false;
    this.isRaiseTicket = true;
  }
  openChatView(): void {
    this.chatView = true;
    this.isRaiseTicket = false;
  }

  setResponedStatus(status: string, index: number): void {
    this.respondIndex = index;
    // this.ResponedTab = title;
    if (this.TabIndex === 0) {
      if (status === 'Resolved') {
        this.smallCells[index].status = status;
        let object = [];
        object = this.smallCells.splice(index, 1);
        smallCell[0][0].history.push(object[0]);
      } else {
        this.smallCells[index].status = status;
      }
    }
    if (this.TabIndex === 1) {
      if (status === 'Resolved') {
        this.tickets[index].status = status;
        let object = [];
        object = this.tickets.splice(index, 1);
        smallCell[0][0].history.push(object[0]);
      } else {
        this.tickets[index].status = status;
      }
    }
    // console.log('-------------', this.smallCells[0].alerts[index]);
  }

  sortData(priorty: string): void {
    const order = ['High', 'Medium', 'Low'];
    if (this.TabIndex === 0) {
      if (priorty === 'high') {
        this.smallCells.sort(
          (low, high) =>
            order.indexOf(low.priorty) - order.indexOf(high.priorty)
        );
      } else {
        this.smallCells.sort(
          (low, high) =>
            order.indexOf(high.priorty) - order.indexOf(low.priorty)
        );
      }
    }
    if (this.TabIndex === 1) {
      if (priorty === 'high') {
        this.tickets.sort(
          (low, high) =>
            order.indexOf(low.priorty) - order.indexOf(high.priorty)
        );
      } else {
        this.tickets.sort(
          (low, high) =>
            order.indexOf(high.priorty) - order.indexOf(low.priorty)
        );
      }
    }
  }

  goToDashboard(): void {
    this.route.navigate(['/']);
  }
}
