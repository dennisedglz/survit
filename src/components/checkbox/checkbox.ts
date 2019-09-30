import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Multiple } from '../../models/questions';
import { AlertController } from 'ionic-angular';
import { Answer } from '../../models/answers';
import { AppDataProvider } from '../../providers/app-data/app-data';

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.html'
})
export class CheckboxComponent {

  @Output() clickSwipe = new EventEmitter<Answer>();
  @Input() question : Multiple;
  public answer: Answer;
  public value: string;

  constructor( public alertCtrl: AlertController, public appData: AppDataProvider) {
    this.value = "";
     this.answer = new Answer();
  }

  ngOnInit(){
    this.answer.id_survey = this.appData.currentSurvey;
    this.answer.id_question = this.question._id;
    this.answer.id_user = this.appData.surveyedID;
    this.answer.id_pollster = this.appData.userID;
  }

  nextSlide() {
    if(this.value == ""){
      //this.valueNeeded();
      this.answer.value = this.value;
      this.clickSwipe.emit(this.answer);
    }else{
      this.answer.value = this.value;
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
