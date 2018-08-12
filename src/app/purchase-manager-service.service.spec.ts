import { TestBed, inject } from '@angular/core/testing';

import { PurchaseManagerServiceService } from './purchase-manager-service.service';

describe('PurchaseManagerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseManagerServiceService]
    });
  });

  it('should be created', inject([PurchaseManagerServiceService], (service: PurchaseManagerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
