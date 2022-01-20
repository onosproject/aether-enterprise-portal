import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinerComponent } from './joiner.component';

describe('JoinerComponent', () => {
  let component: JoinerComponent;
  let fixture: ComponentFixture<JoinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
