import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Multiple, Question } from '../../models/questions';
import { AlertController } from 'ionic-angular';
import { Answer } from '../../models/answers';
import { AppDataProvider } from '../../providers/app-data/app-data';

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.html'
})
export class CheckboxComponent {

  @Output() clickSwipe = new EventEmitter<Answer>();
  @Input() question : Question;
  @Input() compounds: Array<string> = [];
  public answer: Answer;
  public value: string;
  public values: Array<string> = [];

  constructor( public alertCtrl: AlertController, public appData: AppDataProvider) {
    this.value = "";
     this.answer = new Answer();
  }

  ionViewWillEnter() {
    console.log('Checking before loading');
    if(this.question.compounds.length > 0) {
      console.log('this.question.compounds ', this.question.compounds);
    } else {

    }
  }


  ngOnInit(){
    console.log(this.question);
    this.answer.id_survey = this.appData.currentSurvey;
    this.answer.id_question = this.question._id;
    this.answer.questionID = this.question.questionID;
    this.answer.id_user = this.appData.surveyedID;
    this.answer.id_pollster = this.appData.userID;
  }

  nextSlide() {
    if(!this.values || this.values.length <= 0){
      this.valueNeeded();
    }else{
      console.log('Answer ', this.answer);
      this.answer.value = JSON.stringify(this.values);
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

  updateCheckbox($event, answer) {
    if($event.checked) {
      this.values.push(answer);
      console.log("is checked");
    }else {
      this.removeAns(answer);
    }
  }

  removeAns(answer){
    this.values.forEach( (item, index) => {
      if(item === answer) this.values.splice(index,1);
    });
  }
}
