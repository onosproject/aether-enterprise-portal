import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { AuditUserComponent } from './audit-user.component';

describe('AuditUserComponent', () => {
  let component: AuditUserComponent;
  let fixture: ComponentFixture<AuditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuditUserComponent],
      imports: [MatMenuModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
