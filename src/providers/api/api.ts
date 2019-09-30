import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../app/app.constants';
import { Survey } from '../../models/survey';


@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
  }

  private coreGet<T>(url: string, headers: any): Promise<T> {
    return this.http.get<T>(`${url}`).toPromise<T>();
  }

  private corePost<T>(url: string, body: any, headers: any | null): Promise <T> {
    return this.http.post<T>(`${url}`, body, {headers}).toPromise<T>();
  }

  login(email: string, password: string) {
    const url = `${AppConstants.LoginURL}?email=${email}&password=${password}`;
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return this.corePost<string[]>(url, {}, headers);

  }


  getSurveys() {
    const url = AppConstants.GetEncuestasURL;
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return this.coreGet<Survey[]>(url, headers);
    
  }

  //SaveAnswer
  saveAnswer(id_survey: string, id_question: string, id_user: string, id_pollster: string, value: string) {
    
    //const url = `${AppConstants.SaveAnswer}`;
    const url = `${AppConstants.SaveAnswer}?id_survey=${id_survey}&id_question=${id_question}&id_user=${id_user}&id_pollster=${id_pollster}&value=${value}`;
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    //return this.corePost();
    //return this.corePost<string[]>(url, {'id_survey': id_survey, 'id_question': id_question, 'id_user': id_user, 'id_pollster': id_pollster, 'value': valueStr}, headers);
    return this.corePost<string[]>(url, {}, headers);
  }

  getSurveyedID() {
    const url = AppConstants.GetSurveyedID;
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return this.coreGet<string>(url, headers);
  }

  saveAudioImgLatLng(id_surveyed: string, picture_url: string, audio_url: string, lat: string, long: string){
    const url = `${AppConstants.SaveAudioImgLatLng}?id_surveyed=${id_surveyed}&picture_url=${picture_url}&audio_url=${audio_url}&lat=${lat}&long=${long}`;
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return this.corePost<string[]>(url, {}, headers);
  }

}
