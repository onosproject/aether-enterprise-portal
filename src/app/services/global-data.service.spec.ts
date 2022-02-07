import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GlobalDataService } from './global-data.service';

describe('GlobalDataService', () => {
  let service: GlobalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GlobalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
