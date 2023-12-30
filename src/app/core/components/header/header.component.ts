import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { filter, first, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  activatedroute = inject(ActivatedRoute);
  router = inject(Router);
  title$ = this.router.events.pipe(filter((event) => event instanceof ActivationEnd))
                             .pipe(map(item => item as ActivationEnd))
                             .pipe(map(({ snapshot }) => snapshot.data['title']))
                             .pipe(first());
}
