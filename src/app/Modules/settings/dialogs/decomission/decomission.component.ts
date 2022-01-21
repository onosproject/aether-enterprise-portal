import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'aep-decomission',
  templateUrl: './decomission.component.html',
  styles: [],
  providers: [],
})
export class DecomissionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: string }) {}
}
