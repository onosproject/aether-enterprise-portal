import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCellsComponent } from './small-cells.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';

describe('SmallCellsComponent', () => {
  let component: SmallCellsComponent;
  let fixture: ComponentFixture<SmallCellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallCellsComponent],
      imports: [MatMenuModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
