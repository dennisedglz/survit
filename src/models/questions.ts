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