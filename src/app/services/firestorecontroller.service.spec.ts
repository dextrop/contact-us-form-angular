import { TestBed } from '@angular/core/testing';

import { FirestorecontrollerService } from './firestorecontroller.service';

describe('FirestorecontrollerService', () => {
  let service: FirestorecontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorecontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
