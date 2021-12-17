import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'aep-select-devices',
  templateUrl: './select-devices.component.html',
  styles: [],
})
export class SelectDevicesComponent implements OnInit {
  selectedDevice: number = 0;

  constructor(
    public dialogRef: MatDialogRef<SelectDevicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.sims);
  }

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

  devices = [
    {
      id: 1,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 2,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 3,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 4,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 5,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 6,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 7,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 8,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 9,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 10,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 11,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
    {
      id: 12,
      deviceName: 'Camera 1',
      locationName: 'Location 1',
    },
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeSelection(id: number) {
    this.selectedDevice = id;
    // this.getSelectedSims()
  }
}
