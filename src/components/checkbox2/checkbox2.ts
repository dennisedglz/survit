import { Component, EventEmitter, Output } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'checkbox2',
  templateUrl: 'checkbox2.html'
})
export class Checkbox2Component {

  @Output() clickSwipe = new EventEmitter<string>();
  
  public value: string;
  constructor( public alertCtrl: AlertController) {
    this.value = "";
  }

  nextSlide() {
    if(this.value == ""){
      this.valueNeeded();
    }else{
      this.clickSwipe.emit();
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
