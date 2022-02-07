import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DeviceGroupsHelperService } from './device-groups-helper.service';

describe('DeviceGroupsHelperService', () => {
  let service: DeviceGroupsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DeviceGroupsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
