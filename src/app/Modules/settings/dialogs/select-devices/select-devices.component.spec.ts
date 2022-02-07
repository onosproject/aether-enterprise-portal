import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/Modules/material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';

import { SelectDevicesComponent } from './select-devices.component';

describe('SelectDevicesComponent', () => {
  let component: SelectDevicesComponent;
  let fixture: ComponentFixture<SelectDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule],
      declarations: [SelectDevicesComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
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
