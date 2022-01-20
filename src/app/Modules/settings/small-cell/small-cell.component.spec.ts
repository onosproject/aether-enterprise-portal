import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCellComponent } from './small-cell.component';

describe('SmallCellComponent', () => {
  let component: SmallCellComponent;
  let fixture: ComponentFixture<SmallCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
