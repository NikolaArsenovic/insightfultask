import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    InfoCardComponent
  ],
  exports: [
    InfoCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
