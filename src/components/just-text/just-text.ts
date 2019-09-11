import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'just-text',
  templateUrl: 'just-text.html'
})
export class JustTextComponent {

  @Output() clickSwipe = new EventEmitter<string>();
  @Input() message : string = "";

  constructor() {
  }

  nextSlide() {
    this.clickSwipe.emit(); 
  }

}
