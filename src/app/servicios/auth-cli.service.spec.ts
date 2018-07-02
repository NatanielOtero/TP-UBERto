import { TestBed, inject } from '@angular/core/testing';

import { AuthCliService } from './auth-cli.service';

describe('AuthCliService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCliService]
    });
  });

  it('should be created', inject([AuthCliService], (service: AuthCliService) => {
    expect(service).toBeTruthy();
  }));
});
