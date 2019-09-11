import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Platform, AlertController } from 'ionic-angular';



/*
  Generated class for the AudioRecorderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AudioRecorderProvider {

  public audioRecord: MediaObject;
  public directory: string;
  public recordName: string;
  public extension: string;
  public isRecording: boolean;
  public date: Date;

  constructor(
    public http: HttpClient,
    public media: Media,
    public alertCtrl: AlertController,
    public file: File,
    public platform: Platform
  ) {
    console.log('AudioRecorderProvider Provider Active');
    this.date = new Date();

    if (this.platform.is('ios')) {
      this.directory = this.file.tempDirectory;
      this.extension = 'm4a';
    } else if (this.platform.is('android')) {
      this.directory = this.file.externalRootDirectory;
      this.extension = '3gp';
    }

    this.isRecording = false;
    this.recordName = `survit_${this.date.getDate()}-${this.date.getMonth() + 1}-${this.date.getFullYear()}.${this.extension}`;
  }

  startRecording = (surveyName: any) => {
    try {
      var fullDirectory = ((this.platform.is('ios')) ? this.directory.replace(/^file:\/\//, '') : this.directory) + 'SurvIT/';

      this.file.checkDir(this.directory, 'SurvIT').then((exists) => {
        var fullSurveyDirectory = `${fullDirectory}${surveyName}/`;
        this.file.checkDir(this.directory + 'SurvIT', surveyName).then((exists) => {
          this.checkFileOnDirectory(fullSurveyDirectory, this.recordName);
        }).catch((error) => {
          this.file.createDir(this.directory + 'SurvIT', surveyName, true).then((directoryEntry) => {
            this.checkFileOnDirectory(fullSurveyDirectory, this.recordName);
          }).catch((error) => {
            this.checkFileOnDirectory(fullDirectory, this.recordName);
          });;
        });
      }).catch((error) => {
        this.file.createDir(this.directory, 'SurvIT', true).then((directoryEntry) => {
          var fullSurveyDirectory = `${fullDirectory}${surveyName}/`;
          this.file.createDir(this.directory + 'SurvIT', surveyName, true).then((directoryEntry) => {
            this.checkFileOnDirectory(fullSurveyDirectory, this.recordName);
          }).catch((error) => {
            this.checkFileOnDirectory(fullDirectory, this.recordName);
          });;
        }).catch((error) => {
          this.checkFileOnDirectory(this.directory, this.recordName);
        });;
      });
    }
    catch (e) {
      this.alertCtrl.create({
        title: 'Error',
        message: 'Algo ha salido mal al iniciar grabación. Intenta de nuevo porfavor.',
        mode: 'danger'
      }).present();
    }
  }

  stopRecording = () => {
    try {
      this.audioRecord.stopRecord();
      this.isRecording = false;
    }
    catch (e) {
      this.alertCtrl.create({
        title: 'Error',
        message: 'Algo ha salido mal al detener grabación.',
        mode: 'danger'
      }).present();
    }
  }

  playPlayback = () => {

  }

  stopPlayback = () => {

  }

  checkFileOnDirectory = (path: string, fileName: string) => {
    this.file.checkFile(path, fileName).then((exists) => {
      let newName = `survit_${this.date.getDate()}-${this.date.getMonth() + 1}-${this.date.getFullYear()}-${this.date.getTime()}.${this.extension}`;
      this.createFileOnDirectory(path, newName, false);
    }).catch((error) => {
      this.createFileOnDirectory(path, fileName, false);
    });
  }

  createFileOnDirectory = (path, fileName, replace) => {
    this.file.createFile(path, fileName, replace).then(() => {
      this.audioRecord = this.media.create(path + fileName);
      this.audioRecord.startRecord();
      this.isRecording = true;
    }).catch(() => {
      this.alertCtrl.create({
        title: 'Error',
        message: 'Algo ha salido mal al iniciar grabación. Intenta de nuevo porfavor.',
        mode: 'danger'
      }).present();
    });
  }

}
