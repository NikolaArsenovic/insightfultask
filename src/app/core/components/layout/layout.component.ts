import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  util = inject(UtilService);
}
