import { TestBed, inject } from '@angular/core/testing';

import { SearchRadiusService } from './search-radius.service';

describe('SearchRadiusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchRadiusService]
    });
  });

  it('should be created', inject([SearchRadiusService], (service: SearchRadiusService) => {
    expect(service).toBeTruthy();
  }));
});
