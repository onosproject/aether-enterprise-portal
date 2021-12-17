import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'aep-select-sims',
  templateUrl: './select-sims.component.html',
  styles: [],
})
export class SelectSimsComponent implements OnInit {
  selectedSim: number = 0;

  sims = [
    {
      id: 1,
      simNumber: 72348723473240,
      isSelected: false,
    },
    {
      simNumber: 72348723473241,
      isSelected: false,
    },
    {
      simNumber: 72348723473242,
      isSelected: false,
    },
    {
      simNumber: 72348723473243,
      isSelected: false,
    },
    {
      simNumber: 72348723473244,
      isSelected: false,
    },
    {
      simNumber: 72348723473245,
      isSelected: false,
    },
    {
      simNumber: 72348723473246,
      isSelected: false,
    },
    {
      simNumber: 72348723473247,
      isSelected: false,
    },
    {
      simNumber: 72348723473248,
      isSelected: false,
    },
    {
      simNumber: 72348723473249,
      isSelected: false,
    },
    {
      simNumber: 72348723473250,
      isSelected: false,
    },
    {
      simNumber: 72348723473251,
      isSelected: false,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<SelectSimsComponent> // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.sims);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeSelection(simNumber: number): void {
    this.selectedSim = simNumber;
    // this.getSelectedSims()
  }
}
