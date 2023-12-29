import { Injectable, inject } from '@angular/core';

import { Environment } from '../models/environment.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
// REF: https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
  private absoluetUrlPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
  environment = inject(Environment);

  public isAbsoluteUrl(urlInput: string): boolean {
    return this.absoluetUrlPattern.test(urlInput);
  }

  public toAbsoluteUrl(relativeUrl: string): string {
    const baseUrlEndIdx = this.environment.baseApiUrl?.endsWith('/') ? -1 : undefined;
    const relativeUrlStartIdx = relativeUrl.startsWith('/') ? 1 : 0;
    return `${this.environment.baseApiUrl?.slice(0, baseUrlEndIdx)}/${relativeUrl.slice(relativeUrlStartIdx)}`;
  }
}
