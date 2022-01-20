import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDevicegroupsComponent } from './delete-devicegroups.component';

describe('DeleteDevicegroupsComponent', () => {
  let component: DeleteDevicegroupsComponent;
  let fixture: ComponentFixture<DeleteDevicegroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDevicegroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDevicegroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
