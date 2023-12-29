import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { UrlService } from '../services/url.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  urlService = inject(UrlService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.urlService.isAbsoluteUrl(request.url)) {
      return next.handle(request);
    }

    const url = this.urlService.toAbsoluteUrl(request.url);

    return next.handle(request.clone({ url }) );
  }
}

export const apiBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true
};
