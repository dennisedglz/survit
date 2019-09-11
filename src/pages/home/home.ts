import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EncuestaPage } from '../encuesta/encuesta';
import { AppDataProvider } from './../../providers/app-data/app-data';
import { AlertProvProvider } from '../../providers/alert-prov/alert-prov';
import { Survey } from '../../models/survey';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public surveys: Survey[];
  public surveysToSave: Survey[];
  constructor(
    public navCtrl: NavController, 
    public appData: AppDataProvider, 
    public api: ApiProvider,
    public alertPrv: AlertProvProvider,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.getSurveys();
    this.surveys = [];
    this.surveysToSave = [];
  }
  
  openSurvey(survey: Survey) {
    this.appData.currentSurvey = survey._id;
    this.navCtrl.push(EncuestaPage, {'survey': survey} , {animate: false});
  }

  getSurveys() {
    this.appData.loading = true;
    this.api.getSurveys()
    .then(data => {
        //this.surveys = data;
        this.filtrarEncuestas(data);
        this.appData.loading = false;
      console.log(this.surveys);
      this.surveys.forEach(element => {
        console.log("id "+element._id);
      });
    }).catch(err => {
      this.alertPrv.errorConexion();
      console.log("There was an error");
      console.log(err);

    });  
  }

  filtrarEncuestas(encuestas: Survey[]) {
    let userId = this.appData.userID;
    let today = new Date();
    let endate;
    let i = 0;
   
    encuestas.forEach(e => {
      endate = new Date(e.end_date);
      
      if(today < endate && e.usersId.indexOf(userId) >= 0) {
        this.surveys[i] = e;
        i++;
      }
    });
  }

  logout() {
    this.appData.loading = true;
    this.appData.userID = '';
    this.navCtrl.setRoot(LoginPage);
  }

  saveLocalSurveys(){
    this.storage.get('surveys').then((val) => {
      if(val){
        console.log("local: ",val);
        console.log(val)
      }else{
        console.log("Else val");
        let prompt = this.alertCtrl.create({
          title: 'No se encontraron encuestas pendientes',
          message: "Las encuestas ya se han guardado",
          buttons: [
            {
              text: 'Continuar',
              handler: data => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        prompt.present();
      }
    }).catch(() => {
       console.log("err on storage");
      let prompt = this.alertCtrl.create({
        title: 'No se encontraron encuestas pendientes',
        message: "Las encuestas ya se han guardado",
        buttons: [
          {
            text: 'Continuar',
            handler: data => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      prompt.present();
    });
  }
}
