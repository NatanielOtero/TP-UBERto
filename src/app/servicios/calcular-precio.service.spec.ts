import { TestBed, inject } from '@angular/core/testing';

import { CalcularPrecioService } from './calcular-precio.service';

describe('CalcularPrecioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcularPrecioService]
    });
  });

  it('should be created', inject([CalcularPrecioService], (service: CalcularPrecioService) => {
    expect(service).toBeTruthy();
  }));
});
