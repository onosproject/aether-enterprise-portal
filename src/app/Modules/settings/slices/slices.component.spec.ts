import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlicesComponent } from './slices.component';

describe('Slices1Component', () => {
  let component: SlicesComponent;
  let fixture: ComponentFixture<SlicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
