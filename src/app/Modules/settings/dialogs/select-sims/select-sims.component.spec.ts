import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSimsComponent } from './select-sims.component';

describe('SelectSimsComponent', () => {
  let component: SelectSimsComponent;
  let fixture: ComponentFixture<SelectSimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
