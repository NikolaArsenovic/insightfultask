import { Environment } from '../models/environment.model';
import { TestBed } from '@angular/core/testing';
import { UrlService } from './url.service';
import { environment } from 'src/environments/environment';

describe('UrlServiceService', () => {
  let service: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Environment, useValue: environment }
      ]
    });
    service = TestBed.inject(UrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
