import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecomissionComponent } from './decomission.component';

describe('DecomissionComponent', () => {
  let component: DecomissionComponent;
  let fixture: ComponentFixture<DecomissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecomissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecomissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
