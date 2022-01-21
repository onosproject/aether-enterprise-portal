import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DeviceSimService } from './device-sim.service';

describe('DeviceSimService', () => {
  let service: DeviceSimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DeviceSimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});