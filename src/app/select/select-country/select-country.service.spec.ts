import { TestBed, inject } from '@angular/core/testing';

import { SelectCountryService } from './select-country.service';

describe('SelectCountryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectCountryService]
    });
  });

  it('should be created', inject([SelectCountryService], (service: SelectCountryService) => {
    expect(service).toBeTruthy();
  }));
});
