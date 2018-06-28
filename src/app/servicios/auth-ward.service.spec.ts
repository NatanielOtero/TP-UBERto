import { TestBed, inject } from '@angular/core/testing';

import { AuthWardService } from './auth-ward.service';

describe('AuthWardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthWardService]
    });
  });

  it('should be created', inject([AuthWardService], (service: AuthWardService) => {
    expect(service).toBeTruthy();
  }));
});
