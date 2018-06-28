import { TestBed, inject } from '@angular/core/testing';

import { AutheService } from './authe.service';

describe('AutheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutheService]
    });
  });

  it('should be created', inject([AutheService], (service: AutheService) => {
    expect(service).toBeTruthy();
  }));
});
