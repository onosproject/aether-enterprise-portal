import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSlicesComponent } from './delete-slices.component';

describe('DeleteSlicesComponent', () => {
  let component: DeleteSlicesComponent;
  let fixture: ComponentFixture<DeleteSlicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSlicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSlicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
