import { Component, inject } from '@angular/core';

import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  util = inject(UtilService);

  close() {
    this.util.setError(null);
  }
}
