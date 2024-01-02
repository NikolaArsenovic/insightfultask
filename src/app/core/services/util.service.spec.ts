import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('spinnerLoaderInProgress$ should emit false initially', (done) => {
    service.spinnerLoaderInProgress$.subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('setSpinnerLoaderInProgress should update spinnerLoaderInProgress$', (done) => {
    service.setSpinnerLoaderInProgress(true);
    service.spinnerLoaderInProgress$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('errorActive$ should emit null initially', (done) => {
    service.errorActive$.subscribe(error => {
      expect(error).toBeNull();
      done();
    });
  });

  it('setError should update errorActive$', (done) => {
    const testError = new HttpErrorResponse({});
    service.setError(testError);
    service.errorActive$.subscribe(error => {
      expect(error).toEqual(testError);
      done();
    });
  });
});
