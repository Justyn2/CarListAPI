export class CarSaveModel{
    public Make:string;
    public Model:string;
    public Year: string;
    public Trim: string;
    constructor( make:string,
        model:string,
        trim:string,
        year:string
    ){
        this.Make = make;
        this.Model = model;
        this.Trim = trim;
        this.Year = year;
    }
}