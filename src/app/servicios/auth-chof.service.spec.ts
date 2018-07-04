import { TestBed, inject } from '@angular/core/testing';

import { AuthChofService } from './auth-chof.service';

describe('AuthChofService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthChofService]
    });
  });

  it('should be created', inject([AuthChofService], (service: AuthChofService) => {
    expect(service).toBeTruthy();
  }));
});
