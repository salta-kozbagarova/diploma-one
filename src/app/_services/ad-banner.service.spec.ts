import { TestBed, inject } from '@angular/core/testing';

import { AdBannerService } from './ad-banner.service';

describe('AdBannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdBannerService]
    });
  });

  it('should be created', inject([AdBannerService], (service: AdBannerService) => {
    expect(service).toBeTruthy();
  }));
});
