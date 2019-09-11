import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertProvProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
  }

  errorLogin(){
    let prompt = this.alertCtrl.create({
      title: 'Lo sentimos',
      message: "El correo o la contraseña son incorrectos. Intente de nuevo.",
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  errorConexion(){
    let prompt = this.alertCtrl.create({
      title: 'Lo sentimos',
      message: "Ha ocurrido un error de conexión. Intente de nuevo más tarde.",
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
