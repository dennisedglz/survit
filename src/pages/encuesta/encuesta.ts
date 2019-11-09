import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Navbar, AlertController, Platform } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
import { Surveyed, Answer } from '../../models/answers';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AudioRecorderProvider } from '../../providers/audio-recorder/audio-recorder';
import { Geolocation } from '@ionic-native/geolocation';

 
@IonicPage()
@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {
  @ViewChild(Slides) slides: Slides;  
  @ViewChild(Navbar) navBar: Navbar;
  public survey:any;
  public answers: Answer[] = [];
  public surveyed: Surveyed;
  public surveys: any;
  public size: number = 0;
  public contador: number = 0;
  public auxLat: Answer;
  public auxLng: Answer;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public appData: AppDataProvider,
    public api: ApiProvider,
    public storage: Storage,
    public recorderProv:AudioRecorderProvider,
    public platform: Platform,
    public geolocation: Geolocation
  ) {
    this.initSurveyed();
    this.survey = this.navParams.get("survey");
    console.log(this.survey);
    this.surveyed = new Surveyed();
    this.size = this.navParams.get("size");
    this.surveyed = new Surveyed();
  }
  
  
  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    this.slides.pager = false;
    this.setBackButtonAction();
    this.appData.onSurvey = true;
  }

  setBackButtonAction() {
    this.navBar.backButtonClick = () => {
      if(!this.slides.isBeginning()){
        this.contador--;
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
      }else{
        this.goOut();
      }
    };
  }

  goOut(){
    let prompt = this.alertCtrl.create({
      title: '¿Quieres abandonar la encuesta?',
      message: "Recuerda que una vez que salgas se perderá la información recaudada",
      buttons: [
        {
          text: 'Continuar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Abandonar',
          handler: data => {  
            if(this.platform.is('cordova') && this.survey.audio){
              if(this.recorderProv.isRecording ){
                this.recorderProv.stopRecording();
              }
            }
            console.log('Saved clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    prompt.present();
  }

  //slides to next item
  goNext(){
    this.contador++;
    this.slides._isEnd
    if(this.contador > this.size){
      this.finalizarEncuesta();
    }else{
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
    }
    this.appData.loading = false;
  }

  //gets the output function from the component
  onSwipeEmitted(ans: Answer) {
    console.log("Answer");
    console.log(ans);
    this.answers.push(ans);
    this.appData.loading = true;
    setTimeout(() => {
      this.goNext();
     }, 1000);
  }
 
  onSwipeEmittedNotAns(){
    this.appData.loading = true;
    setTimeout(() => {
      this.goNext();
     }, 1000);
  }

  finalizarEncuesta(){
    console.log("FINALIZAR ENCUESTA: ");
    console.log(this.answers);
    

    this.geolocation.getCurrentPosition().then((resp) => {
      this.auxLat.id_pollster = this.answers[0].id_pollster;
      this.auxLng.id_pollster = this.answers[0].id_pollster;
      this.auxLat.id_survey = this.answers[0].id_survey;
      this.auxLng.id_survey = this.answers[0].id_survey;
      this.auxLat.id_question = 'lat';
      this.auxLng.id_question = 'lng';
      //auxLat.id_user = this.appData.surveyedID;
      //auxLng.id_user = this.appData.surveyedID;
      this.auxLat.validID = this.answers[0].validID;
      this.auxLng.validID = this.answers[0].validID;
      this.auxLng.value = resp.coords.latitude.toString();
      this.auxLat.value = resp.coords.longitude.toString();
      console.log("LAT AND LNG");
      console.log(resp);
      console.log(this.auxLat);
      console.log(this.auxLng);
      // resp.coords.latitude
      // resp.coords.longitude
      this.answers.push(this.auxLat);
      this.answers.push(this.auxLng);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    
    this.answers.forEach(el => {
      if(el == undefined){

      }else{
        el.id_user = this.appData.surveyedID;
        el.validID = true;
        console.log(el);
      }
    });

    console.log("SURVEYED ID finalizar "+this.appData.surveyedID);
    
    console.log("Respuestas de encuesta");
    console.log(this.answers);
    if(this.platform.is('cordova') && this.survey.audio){
      if(this.recorderProv.isRecording ){
        this.recorderProv.stopRecording();
      }
    }
    
    this.saveEncuesta();
    let prompt = this.alertCtrl.create({
      title: 'La encuesta ha finalizado',
      message: "Gracias por su tiempo. La encuesta ha terminado.",
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

  initSurveyed(){
    this.api.getSurveyedID().then(res => {
      if(res){
        this.appData.surveyedID = res;
        this.appData.validSurveyed = true;
      }else{
        this.localSurveyed();
      }
      
      console.log("PLATFORM ", this.platform);
      console.log("AUDIO "+this.survey.audio);
      console.log("SURVEYED ID "+this.appData.surveyedID);
      if(this.platform.is('cordova') && this.survey.audio){
        if(!this.recorderProv.isRecording){
          this.recorderProv.startRecording(this.survey.name);
        }
      }
    }).catch(err => {
      console.log("error on surveyed");
      console.log(err);
      this.localSurveyed();
    });
  }

  localSurveyed(){

    this.storage.get('idSurveyed').then((val) => {
      if(val){
        val = Number(val) + 1;
        this.appData.surveyedID = val;
        this.appData.validSurveyed = false;
      }else{
        this.storage.set('idSurveyed', '1');
        this.appData.surveyedID = '1';
        this.appData.validSurveyed = false;
      }
    });
    console.log(this.appData);
  }

  saveEncuesta(){
    if(this.appData.isConnected){
      this.uploadEncuesta();
    }else{
      //this.uploadEncuesta();
      this.localEncuesta();
    }
    
  }

  uploadEncuesta() {
    this.answers.forEach(ans => {
      let userId = null;
      //saveAnswer(id_survey: string, id_question: string, id_user: string, id_pollster: string, value: string[])
      if(this.appData.validSurveyed){
        console.log("Valid survey");
        console.log(ans);
        userId = ans.id_user;
        this.api.saveAnswer(ans.id_survey.toString(), ans.id_question.toString(), this.appData.surveyedID.toString(), ans.id_pollster.toString(), ans.value).then(res => {
          console.log("API SAVEANSWER");
          console.log(res);
          if(res){
            console.log("SaveAnswer success");
            console.log(res);

          }else{
            console.log("SaveAnswer err");
            console.log(res);
            this.errorUploadEncuesta();
          }
        }).catch(err => {
          console.log("ERR API SAVEANSWER");
          console.log(err);
          this.errorUploadEncuesta();
          this.localEncuesta();
        });
      }else{
        this.initSurveyed();
        this.localEncuesta();
      }
      
    });
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
  

  localEncuesta() {
    this.surveys = [];
    this.storage.get('surveys').then((val) => {
      console.log("local: ",val);
      if(val){
        this.surveys = val;
        this.answers.forEach(ans => {
          this.surveys.push(ans);
        });
        console.log("Saving:", this.surveys);
        this.storage.set('surveys', this.surveys);
      }else{
        this.surveys = [];
        this.answers.forEach(ans => {
          this.surveys.push(ans);
        });
        console.log("Saving:", this.surveys);
        this.storage.set('surveys', this.surveys);
      }
    }).catch(() => {
      this.surveys = [];
      this.answers.forEach(ans => {
        this.surveys.push(ans);
      });
      console.log("Saving:", this.surveys);
      this.storage.set('surveys', this.surveys);
    });
    console.log("Surveys on localstorage");
    console.log(this.surveys);
  }

}
