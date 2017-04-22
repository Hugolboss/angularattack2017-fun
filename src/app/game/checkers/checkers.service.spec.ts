import { TestBed, inject } from '@angular/core/testing';

import { CheckersService } from './checkers.service';

describe('CheckersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckersService]
    });
  });

  it('should ...', inject([CheckersService], (service: CheckersService) => {
    expect(service).toBeTruthy();
  }));
});
