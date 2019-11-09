import { LoginPage } from './../pages/login/login';
import { Component, NgZone, ViewChild } from '@angular/core';
import { AppDataProvider } from '../providers/app-data/app-data';
import { Network } from '@ionic-native/network';
import { Platform, Events, AlertController, Nav } from 'ionic-angular';
import { AppConstants } from './app.constants';
import { AudioRecorderProvider } from '../providers/audio-recorder/audio-recorder';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  status: any = ConnectionStatusEnum.Online;

  constructor(
    public readonly zone: NgZone,
    public events: Events,
    public appData: AppDataProvider,
    public network: Network,
    public platform: Platform,
    public alertCtrl: AlertController,
    public recorderProv: AudioRecorderProvider,
  ) {
    this.appData.loading = false;
    this.platform.ready().then(() => {
      this.initializeNetworkMonitor();
      this.configBackButtonAndroid();
      //this.isConnected();

    });


  }

  isConnected(): void {
    this.network.onDisconnect().subscribe(() => {
      this.status = ConnectionStatusEnum.Offline;
      console.log("OFFLINE");
    });
    this.appData.isConnected = false;
    this.network.onConnect().subscribe(() => {
      this.status = ConnectionStatusEnum.Online;
      console.log("ONLINE");
      this.appData.isConnected = true;
    });
  }


  initializeNetworkMonitor() {
    console.log("Initialize Network monitor");
    this.appData.isConnected = this.network.type !== this.network.Connection.NONE;
    //this.appSharedService.isConnectionModalOpen = false;

    this.events.subscribe(AppConstants.NO_DATA_CONNECTION_EVENT, (event: string) => this.onNoConnectionApiRequest(event));

    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.zone.run(() => {
        console.log("OnDisconnect");
        this.appData.isConnected = false;
      });
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      const networkTimeout = 3000; console.log("onConnect");
      setTimeout(() => {
        this.zone.run(() => {
          this.appData.isConnected = true;
        });
      }, networkTimeout);
    });
  }

  onNoConnectionApiRequest(event: string) {
    const title = 'Not connected to a network';
    const message = 'It looks like you don\'t have an internet connection. Check your device settings.';

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  /*initializeIdleMonitor() {
    //Ten minutes, 600 seconds
    const idleTimeout = 540;
    const timeout = 60;
    this.idle.setIdle(idleTimeout);
    this.idle.setTimeout(timeout);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onTimeoutWarning.subscribe(() => {
        if (!this.isIdleWarningOpen) {
            this.isIdleWarningOpen = true;
            this.idleAlert = this.notificationAlertSrv.customAcceptCancelAlert('Are you still browsing?', 'For your security, we\'ll automatically log you out after ten minutes.',
                'Stay here', 'Log out', this.stayHereHandler, this.logoutHandler);
        }
    });
    this.idle.onIdleEnd.subscribe(() => {
        this.appSharedService.idleState = 'No longer idle.';
    });
    this.idle.onTimeout.subscribe(() => {
        this.logout();
    });
    this.idle.onIdleStart.subscribe(() => {
        this.appSharedService.idleState = 'You\'ve gone idle!';
    });
  }*/


  configBackButtonAndroid = () => {
    this.platform.registerBackButtonAction(() => {
      if (this.platform.is('android') && this.appData.onSurvey) {        
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
                this.appData.onSurvey = false;
                if (this.recorderProv.isRecording) {
                  this.recorderProv.stopRecording();
                }
                console.log('Saved clicked');
                this.nav.pop();
              }
            }
          ]
        });
        prompt.present();
      }
    });
  }

}