import { Simple } from './../../models/questions';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Answer } from '../../models/answers';
import { AppDataProvider } from '../../providers/app-data/app-data';


@Component({
  selector: 'simple-input',
  templateUrl: 'simple-input.html'
})
export class SimpleInputComponent {

  @Output() clickSwipe = new EventEmitter<Answer>();
  @Input() question : Simple;
  public value: string;
  public answer: Answer;
  
  constructor( public alertCtrl: AlertController, public appData: AppDataProvider) {
    this.value = "";
    this.answer = new Answer();
    /*public id: number;
     public id_survey: number;
     public id_question: number;
     public id_user: number; //Se genera en BE, tengo que mandarlo pedir antes de enviar las respuestas
     public id_pollster: number; //Encuestador
     public value: string[];*/
  }

  ngOnInit(){
    this.answer.id_survey = this.appData.currentSurvey;
    this.answer.id_question = this.question._id;
    this.answer.id_user = this.appData.surveyedID;
    this.answer.id_pollster = this.appData.userID;
    console.log(this.answer);
  }

  nextSlide() {
    if(this.value == ""){
      this.valueNeeded();
    }else{
      this.answer.value = this.value;
      console.log("Next Slide ", this.answer);
      this.clickSwipe.emit(this.answer);
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

}
