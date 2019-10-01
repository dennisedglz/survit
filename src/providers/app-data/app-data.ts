import { Injectable } from '@angular/core';

@Injectable()
export class AppDataProvider {
  public loading: boolean;
  public userID: string;
  public isConnected: boolean;
  public temporaryID: number;
  public surveyedID: number;
  public currentSurvey: number | string;
  public validSurveyed: boolean;
  public onSurvey:boolean;

  constructor() {
    this.loading = false;
    this.userID = "";
    this.onSurvey = false;

  }


}
