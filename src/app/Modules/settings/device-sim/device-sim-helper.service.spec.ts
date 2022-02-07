import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DeviceSimHelperService } from './device-sim-helper.service';

describe('DeviceSimHelperService', () => {
  let service: DeviceSimHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DeviceSimHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
