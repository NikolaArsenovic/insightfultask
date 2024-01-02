import { ErrorHandler, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CustomErrorHandler } from './error.handler';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/layout/layout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { apiBackendProvider } from './interceptors/api.interceptor';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    ErrorComponent,
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    apiBackendProvider,
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ]
})
export class CoreModule { }
