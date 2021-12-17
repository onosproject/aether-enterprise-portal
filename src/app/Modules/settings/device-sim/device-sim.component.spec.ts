import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSimComponent } from './device-sim.component';

describe('DeviceSimComponent', () => {
  let component: DeviceSimComponent;
  let fixture: ComponentFixture<DeviceSimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
