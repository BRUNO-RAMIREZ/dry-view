import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[changeColor]'
})
export class ChangeColorDirective implements OnChanges{
  @Input() color: string;

  constructor(private el: ElementRef) {
    this.color = '';
  }

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }

}
