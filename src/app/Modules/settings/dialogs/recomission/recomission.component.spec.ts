import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomissionComponent } from './recomission.component';

describe('RecomissionComponent', () => {
  let component: RecomissionComponent;
  let fixture: ComponentFixture<RecomissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecomissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
