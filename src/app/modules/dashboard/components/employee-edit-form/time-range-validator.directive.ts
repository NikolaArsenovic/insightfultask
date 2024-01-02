import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appTimeRangeValidator]'
})
export class TimeRangeValidatorDirective {
  @Input() control?:AbstractControl<unknown, unknown> | null;

  constructor(public el: ElementRef, public renderer: Renderer2 ) {}

  @HostListener('input', ["$event.target.value"]) onInput(e: string) {

    const hours = parseInt(e.split(':')[0]);
    const minutes = parseInt(e.split(':')[1]);

    const hoursMin = parseInt(this.el.nativeElement.getAttribute('min').split(':')[0]);
    const minutesMin = parseInt(this.el.nativeElement.getAttribute('min').split(':')[1]) + 1;

    const hoursMax = parseInt(this.el.nativeElement.getAttribute('max').split(':')[0]);
    const minutesMax = parseInt(this.el.nativeElement.getAttribute('max').split(':')[1]) - 1;

    if(hours < hoursMin || hours > hoursMax) {
      if(this.control) {
        this.control.patchValue(this.formatTime(hoursMin, minutesMin));
      }
    } else if(hours === hoursMin && minutes < minutesMin) {
      if(this.control) {
        this.control.patchValue(this.formatTime(hoursMin, minutesMin));
      }
    } else if(hours === hoursMax && minutes > minutesMax) {
      if(this.control) {
        this.control.patchValue(this.formatTime(hoursMax, minutesMax));
      }
    }
  }

  formatTime(hours: number, minutes: number): string {
    return (hours.toString().length === 1 ? '0' + hours : hours) + ':' + (minutes.toString().length === 1 ? '0' + minutes : minutes.toString());
  }
}
