import { Component, Input } from '@angular/core';

@Component({
  selector: 'aep-joiner',
  templateUrl: './joiner.component.svg',
  styleUrls: ['./joiner.component.scss'],
})
export class JoinerComponent {
  @Input() title: string = 'joiner';
  @Input() startX: number = 0;
  @Input() startY: number = 0;
  @Input() endX: number = 0;
  @Input() endY: number = 0;
  @Input() color: string = '#000000';
  @Input() dash: string = '';

  get halfX(): number {
    return this.startX + (this.endX - this.startX) / 2;
  }

  get halfY(): number {
    return this.startY + (this.endY - this.startY) / 2;
  }

  curveCalculatorOrtho(hx: number, hy: number): string {
    const halfWayY = (this.endY + this.startY) / 2;
    const halfWayX = (this.endX + this.startX) / 2;
    const ms = 'M ' + this.startX + ' ' + this.startY;
    const lmx = 'L ' + halfWayX + ' ' + this.startY;
    const lmy = 'L ' + halfWayX + ' ' + this.endY;
    const end = 'L ' + this.endX + ' ' + this.endY;
    return ms + ' ' + lmx + ' ' + lmy + ' ' + end;
  }
}
