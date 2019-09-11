import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { Answer } from '../../models/answers';
import { Simple } from '../../models/questions';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the TablaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tabla',
  templateUrl: 'tabla.html'
})
export class TablaComponent {
  @ViewChild(Slides) slidesTabla: Slides;  
  @Output() clickSwipe = new EventEmitter<Answer>();
  @Input() question : any; 
  public value: string;
  public answer: Answer;

  constructor() {
    this.value = "";
    this.answer = new Answer();
    console.log("Question tabla");
    console.log(this.question);
  }

  nextSlide() {
    if(this.slidesTabla.isEnd()){
      this.clickSwipe.emit(this.answer);
    }else{
      //this.slidesTabla.lockSwipes(false);
      this.slidesTabla.slideNext();
      //this.slidesTabla.lockSwipes(true);
    }
  }

}
