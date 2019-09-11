import { RangeInputComponent } from './../components/range-input/range-input';
import { NumberInputComponent } from './../components/number-input/number-input';
import { Checkbox2Component } from './../components/checkbox2/checkbox2';
import { CheckboxComponent } from './../components/checkbox/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppDataProvider } from '../providers/app-data/app-data';
import { LoginPage } from '../pages/login/login';
import { EncuestaPage } from '../pages/encuesta/encuesta';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';
import { SimpleInputComponent } from '../components/simple-input/simple-input';
import { JustTextComponent } from '../components/just-text/just-text';
import { EndSurveyComponent } from '../components/end-survey/end-survey';
import { AlertProvProvider } from '../providers/alert-prov/alert-prov';
import { ApiProvider } from '../providers/api/api';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EncuestaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      backButtonText: '',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'ios-transition',
      mode: 'ios'
    }),
    IonicStorageModule.forRoot({
      name: '_survit',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    ComponentsModule,
    CommonModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    EncuestaPage,
    CheckboxComponent,
    Checkbox2Component,
    NumberInputComponent,
    RangeInputComponent,
    SimpleInputComponent,
    JustTextComponent,
    SimpleInputComponent,
    EndSurveyComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppDataProvider,
    AlertProvProvider,
    ApiProvider,
    Network,
  ]
})
export class AppModule {}
