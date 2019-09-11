import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaPage } from './encuesta';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EncuestaPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaPage),
    ComponentsModule
  ],
})
export class EncuestaPageModule {}
