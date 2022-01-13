import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDevicesComponent } from './delete-devices.component';

describe('DeleteDevicesComponent', () => {
  let component: DeleteDevicesComponent;
  let fixture: ComponentFixture<DeleteDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDevicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
