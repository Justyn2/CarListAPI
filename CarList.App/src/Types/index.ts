import { Dialogue } from 'src/Redux/Constants/Dialogues';

export interface IAppState {
    cars: ICarModel[];
    activeId?:string;
    dialogue:Dialogue;
    error:Error|null;
    loading?:boolean;
    loaded?:boolean;
    car?:ICarModel;
    currentFilter:filter;
}

export enum filter {
    makeasc=1,
    makedesc=2,
    modelasc=3,
    modeldesc=4,
    trimasc=5,
    trimdesc=6,
    yearasc=7,
    yeardesc=8,
}

export interface ICarModel extends ICarData {
    id: string|null;
}

export class CarModel
implements ICarModel{
    public id:string|null;
    public make:string;
    public model:string;
    public year: string;
    public trim: string;
}

export interface ICarData {
    make:string;
    model:string;
    year: string;
    trim: string;
}