import { Injectable } from '@angular/core';

@Injectable()
export class AppDataProvider {
  public loading: boolean;
  public userID: string;
  public isConnected: boolean;
  public temporaryID: number;
  public surveyedID: string;
  public currentSurvey: number | string;
  public validSurveyed: boolean;
  public onSurvey:boolean;
  public compounds: Array<string>;

  constructor() {
    this.loading = false;
    this.userID = "";
    this.onSurvey = false;
    this.compounds = [];
  }


}
