import { TestBed, inject } from '@angular/core/testing';

import { GetDrinksDataService } from './get-drinks-data.service';

describe('GetDrinksDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDrinksDataService]
    });
  });

  it('should be created', inject([GetDrinksDataService], (service: GetDrinksDataService) => {
    expect(service).toBeTruthy();
  }));
});
