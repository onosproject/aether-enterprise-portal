import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'aep-decomission',
  templateUrl: './decomission.component.html',
  styles: [],
})
export class DecomissionComponent {
  constructor(
    public dialogRef: MatDialogRef<DecomissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string }
  ) {}
}
