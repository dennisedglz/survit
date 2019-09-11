import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home/home';
import { IonicModule } from 'ionic-angular';
import { EncuestaPage } from './encuesta/encuesta';
import { EncuestaPageModule } from './encuesta/encuesta.module';
import { HomePageModule } from './home/home.module';
import { LoginPageModule } from './login/login.module';
import { LoginPage } from './login/login';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EncuestaPageModule,
        HomePageModule,
        LoginPageModule,
        IonicModule.forRoot(LoginPage),
        IonicModule.forRoot(HomePage),
        IonicModule.forRoot(EncuestaPage),
    ],
    declarations: [
        LoginPage,
        EncuestaPage,
        HomePage,
    ],
    exports: [
        LoginPage,
        EncuestaPage,
        HomePage,
    ]
})
export class PagesModule { }