import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/Modules/material/material.module';

import { SelectDevicesComponent } from './select-devices.component';

describe('SelectDevicesComponent', () => {
  let component: SelectDevicesComponent;
  let fixture: ComponentFixture<SelectDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [SelectDevicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
