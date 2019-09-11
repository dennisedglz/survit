export class Survey {
    public _id: string = "";
    public name: string = "";
    public welcome_message: string = "";
    public start_date: string = "";
    public end_date: string = "";
    public questions: any;
    public __v: number = 0;
    public usersId: string[] = [];
    public creation_date: string = "";
}