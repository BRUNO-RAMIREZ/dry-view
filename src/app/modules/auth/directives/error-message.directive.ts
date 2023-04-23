import {Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class ErrorMessageDirective{
  private htmlElement: ElementRef<HTMLElement>;

  @Input() set mensaje(value: string) {
    this.htmlElement.nativeElement.innerText = value;
  };

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
    this.mensaje = 'Este campo es requerido';
  }
}
