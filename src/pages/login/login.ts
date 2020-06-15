import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';
import { AppDataProvider } from './../../providers/app-data/app-data';
import { ApiProvider } from '../../providers/api/api';
import { AlertProvProvider } from '../../providers/alert-prov/alert-prov';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public username: string = 'dennisedglz';
  public password: string = '12345';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private appData: AppDataProvider,
    private api: ApiProvider,
    public alertPrv: AlertProvProvider,

  ) {
    this.appData.loading = false;
  }


  login() {
    this.appData.loading = true;
    this.api.login(this.username, this.password).then(data => {
      if(data){
        this.appData.loading = false;
        this.appData.userID = data._id;
        if(data.active && !data.isDeleted) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.alertPrv.errorLogin();
        }
      }else{
        this.appData.loading = false;
        this.alertPrv.errorLogin();
      }
    }).catch(err => {
      this.appData.loading = false;
      this.alertPrv.errorConexion();
    })
    
  }
}
