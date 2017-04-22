import { TestBed, inject } from '@angular/core/testing';

import { TictactoeService } from './tictactoe.service';

describe('TictactoeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TictactoeService]
    });
  });

  it('should ...', inject([TictactoeService], (service: TictactoeService) => {
    expect(service).toBeTruthy();
  }));
});
