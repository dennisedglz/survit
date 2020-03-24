import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
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
  public day: string = "";
  public month: string = "";
  public message: string = "";
  public months = ['','Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  constructor(
    public navCtrl: NavController, 
    public appData: AppDataProvider, 
    public api: ApiProvider,
    public alertPrv: AlertProvProvider,
    public alertCtrl: AlertController,
    public storage: Storage,
    private menu: MenuController
  ) {
    this.getSurveys();
    this.surveys = [];
    this.surveysToSave = [];
  }

  ionViewWillEnter(){ 
    
  }
  
  openSurvey(survey: Survey) {
    this.appData.currentSurvey = survey._id;
    this.navCtrl.push(EncuestaPage, {'survey': survey, 'size': survey.questions.length} , {animate: false});
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
      endate = new Date('06/20/2020');
      console.log(endate);
      console.log(today);

      //if(today < endate && e.usersId.indexOf(userId) >= 0) {
      if(today < endate) {
        console.log("valid");
        var aux = e.end_date.split('-');
        var aux2 = e.start_date.split('-');
        this.surveys[i] = e;
        this.surveys[i].dayDisplay = aux[2]; 
        this.surveys[i].monthDisplay = this.months[Number(aux[1])];
        this.surveys[i].readStartDate = 'Inicia: ' + aux2[2] + ' de ' + this.months[Number(aux2[1])] + ' ' + aux2[0];
        console.log(this.surveys[i].readStartDate);
        this.surveys[i].readEndDate = 'Finaliza: ' + aux[2] + ' de ' + this.months[Number(aux[1])] + ' ' + aux[0];
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
    this.appData.loading = true;
    /*let prompt = this.alertCtrl.create({
      title: 'Under Development',
      message: "Esta funcionalidad aún está en desarrollo.",
      buttons: [
        {
          text: 'Aceptar',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();*/
    this.storage.get('surveys').then((val) => {
      console.log("Save Local surveys");
      if(val){
        let notSaved = [];
        val.forEach(ans => {
          let auxOldID = "";
          let auxNewID = "";
          console.log("local element: ");
          console.log(ans);
          
          //GET SURVEYED ID WHEN IT'S NOT VALID
          if(!ans.validID && auxOldID != ans.id_user){
            this.api.getSurveyedID().then(res => {
              if(res){
                auxOldID = ans.id_user;
                auxNewID = res;
                ans.id_user = auxNewID;
                ans.validID = true;
              }else{
                ans.validID = false;
              }
            }).catch(err => {
              ans.validID = false;
            });

            if(ans.validID){
              console.log("Saving");
              this.api.saveAnswer(ans.id_survey.toString(), ans.id_question.toString(), this.appData.surveyedID.toString(), ans.id_pollster.toString(), ans.value).then(res => {
                if(res){
                  console.log("SaveAnswer success");
                  console.log(res);
      
                }else{
                  console.log("SaveAnswer err");
                  console.log(res);
                  notSaved.push(ans);
                  this.errorUploadEncuesta();
                }
              }).catch(err => {
                this.errorUploadEncuesta();
                notSaved.push(ans);
              });
            }else{
              notSaved.push(ans);
            }
          }


          if(!ans.validID && auxOldID == ans.id_user){
            ans.id_user = auxNewID;
            ans.validID = true;
            console.log("Saving");
            this.api.saveAnswer(ans.id_survey.toString(), ans.id_question.toString(), this.appData.surveyedID.toString(), ans.id_pollster.toString(), ans.value).then(res => {
              if(res){
                console.log("SaveAnswer success");
                console.log(res);
    
              }else{
                console.log("SaveAnswer err");
                console.log(res);
                notSaved.push(ans);
                this.errorUploadEncuesta();
              }
            }).catch(err => {
              this.errorUploadEncuesta();
              notSaved.push(ans);
            });
          }
          


          console.log("Not Saved");
          console.log(notSaved);
          this.storage.set('surveys', "");
          this.storage.set('surveys', notSaved);
          
        });
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

    this.appData.loading = false;
  }

  errorUploadEncuesta(){
    console.log("SaveAnswer err");
   /* let prompt = this.alertCtrl.create({
      title: 'Lo sentimos',
      message: "Ocurrió un error al guardar la encuesta, por favor compruebe su conexión e intente más tarde.",
      buttons: [
        {
          text: 'Continuar',
          handler: data => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    prompt.present();*/
  }

  openMenu() {
    this.menu.open();
  }
}
