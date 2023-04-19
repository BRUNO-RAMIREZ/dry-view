import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class ErrorMessageDirective implements OnInit {
  private htmlElement;

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setColor();
  }

  private setColor(): void {
    this.htmlElement.nativeElement.style.color = 'red';
  }
}
