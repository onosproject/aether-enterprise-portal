import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'aep-services',
  templateUrl: './services.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 500, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 500, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  styles: [],
})
export class ServicesComponent implements OnInit {
  //var
  anankiFormGroup: FormGroup;
  addNewServiceForm: boolean = false;
  editServiceForm: boolean = false;

  ngOnInit(): void {
    this.anankiFormGroup = new FormGroup({
      appName: new FormControl(null),
      protocol: new FormControl(null),
      portStart: new FormControl(null),
      mbr: new FormControl(null),
      portEnd: new FormControl(),
    });
  }

  addNewServiceFormFun(): void {
    this.addNewServiceForm = true;
    this.editServiceForm = false;
  }
  editServiceFormFun(): void {
    this.addNewServiceForm = false;
    this.editServiceForm = true;
  }
  editServiceFormClose(): void {
    this.editServiceForm = false;
  }
}
