import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { Answer } from '../../models/answers';
import { Simple, Tabla } from '../../models/questions';
import { Slides, AlertController } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';

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
  @Input() question : Tabla; 
  public value: string;
  public answer: Answer;
  public answersStr: any;
  public questionsBack: any;

  constructor( public appData: AppDataProvider, public alertCtrl: AlertController,) {
    this.value = "";
    this.answer = new Answer();
    this.answersStr = '';

  }


  ionViewDidLoad(){
   this.slidesTabla.lockSwipes(true);
  }

  ngOnInit(){
    this.answer.id_survey = this.appData.currentSurvey;
    this.answer.id_question = this.question._id;
    this.answer.id_user = this.appData.surveyedID;
    this.answer.id_pollster = this.appData.userID;
    //console.log(this.answer);
    console.log("BEFORE");
    this.questionsBack = this.shuffle(this.question.answers);
    console.log(this.questionsBack);
    console.log(this.question.answers);
  } 

  
 
  nextSlide() {
    let aux = this.value.split('-');
    let number = this.question.answers.indexOf(aux[0]);
    number = Number(number)+1;
    this.value = number.toString()+'-'+aux[1];

    console.log("Aux "+aux[1]);
    if(aux[1] == undefined){
      this.valueNeeded();
    }else{
      this.answersStr = this.answersStr == '' ? this.value : this.answersStr + '-' + this.value;
      this.value = '';
      console.log("Value");
      console.log(this.answersStr);
      if(this.slidesTabla.isEnd()){
        this.answer.value = this.answersStr;
        this.clickSwipe.emit(this.answer);
      }else{
        this.slidesTabla.lockSwipes(false);
        this.slidesTabla.slideNext();
        this.slidesTabla.lockSwipes(true);
    }
      
    }
  }

  valueNeeded(){
    let prompt = this.alertCtrl.create({
      title: 'Lo sentimos',
      message: "Es necesario responder la pregunta para continuar",
      buttons: [
        {
          text: 'Responder',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    prompt.present();
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
}
