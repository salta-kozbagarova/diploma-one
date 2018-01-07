import { TestBed, inject } from '@angular/core/testing';

import { AdministrativeDivisionService } from './administrative-division.service';

describe('AdministrativeDivisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrativeDivisionService]
    });
  });

  it('should be created', inject([AdministrativeDivisionService], (service: AdministrativeDivisionService) => {
    expect(service).toBeTruthy();
  }));
});
