import { ErrorHandler, NgZone, inject } from "@angular/core";

import { HttpErrorResponse } from "@angular/common/http";
import { UtilService } from "./services/util.service";

export class CustomErrorHandler implements ErrorHandler {
  util = inject(UtilService);
  ngZone = inject(NgZone);

  handleError(error: HttpErrorResponse) {
    console.log(error)
		this.ngZone.runTask( () => {
      this.util.setSpinnerLoaderInProgress(false);
      this.util.setError(error);
		} );
  }
}
