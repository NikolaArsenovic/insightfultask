import { ApiInterceptor } from './api.interceptor';
import { Environment } from '../models/environment.model';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

describe('ApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiInterceptor,
      { provide: Environment, useValue: environment }
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiInterceptor = TestBed.inject(ApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
