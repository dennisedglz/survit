export class Answer {
     public id_survey: number | string;
     public id_question: number | string;
     public id_user: number | string; //Se genera en BE, tengo que mandarlo pedir antes de enviar las respuestas
     public validID: boolean;
     public id_pollster: number | string; //Encuestador
     public value: string;
     constructor(){
          this.id_survey = null;
          this.id_question = null;
          this.id_user = null;
          this.id_pollster = null;
          this.value = null;
          this.validID = false;
     }
}

export class Surveyed {
     public id: number;
     public picture_url: string;
     public audio_url: string;
     public lat: string;
     public long: string;
     public validID: boolean;
     constructor() {
          this.id = null;
          this.picture_url = null;
          this.audio_url = null;
          this.lat = null;
          this.long = null;
          this.validID = false;
     }
}