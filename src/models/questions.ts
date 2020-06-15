export class Simple {
    public _id: string = "";
    public  name: string = "";
    public question: string = "";
    public category: string = "";
    public order: number = 0;
}

export class Multiple {
    public _id: string = "";
    public name: string = "";
    public question: string = "";
    public category: string = "";
    public answers: string[];
    public order: number = 0;
}

export class Tabla {
    public _id: string = "";
    public name: string = "";
    public question: string = "";
    public category: string = "";
    public answers: string[];
    public answers2: string [];
    public order: number = 0;
}

export class Question {
    options: Array<string> = [];
    headers: Array<string> = [];
    compounds;
    conditions; 
    _id: string = '';
    questionID: string = '';
    text: string = '';
    help: string = '';
    type: string = '';
}