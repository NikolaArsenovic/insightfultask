import { BehaviorSubject, Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private spinnerLoaderInProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private error: BehaviorSubject<HttpErrorResponse | null> = new BehaviorSubject<HttpErrorResponse | null>(null);

  get spinnerLoaderInProgress$(): Observable<boolean> {
    return this.spinnerLoaderInProgress.asObservable()
  }

  get errorActive$(): Observable<HttpErrorResponse | null> {
    return this.error.asObservable()
  }

  setSpinnerLoaderInProgress(value: boolean): void {
    this.spinnerLoaderInProgress.next(value);
  }

  setError(error: HttpErrorResponse | null): void {
    this.error.next(error);
  }
}
