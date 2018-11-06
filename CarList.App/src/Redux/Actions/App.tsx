import { Dispatch } from 'redux';
import ApiClient from '../../Helpers/ApiClient';
import { ALL_CARS_LOAD,
    XHR_LOAD_FAIL,
    ALL_CARS_LOAD_SUCCESS,
    CLOSE_DIALOGUE,
    OPEN_DIALOGUE,
    SAVING_CAR, 
    } from '../Constants/App';
import { IAppState, ICarModel } from 'src/Types';
import * as Dialogues from '../Constants/Dialogues';
import { CarSaveModel } from 'src/Types/savecar';

const loadingAllCars = () => ({
    type:ALL_CARS_LOAD
});

const loadedAllCars = (cars:any) => ({
   payload:cars,
   type:ALL_CARS_LOAD_SUCCESS,
});

const XHRError = (error:Error) => ({
     payload: error,
     type:XHR_LOAD_FAIL,
});

const getCars = ()=>{
    const client = new ApiClient;
    const get = client.request('get');
    return (dispatch:Dispatch) => {
        dispatch(loadingAllCars());
        get(`https://localhost:5001/api/cars`).then(response => {
            const cars = response;
            return dispatch(loadedAllCars(cars));}, error => {
                return dispatch(XHRError(error));            
            }
        );
    }
}

export const savingCar = () => ({
    type:SAVING_CAR,
});

export const saveCar = (dispatch:any, car:ICarModel, newCar:boolean)=>{
    const client = new ApiClient;
    const data= new CarSaveModel(
        car.make,
        car.model,
        car.trim,
        car.year
    );
    const save = client.request(newCar?'post':"put");
    dispatch(savingCar());
    async function execute(){
    await save(
    `https://localhost:5001/api/cars/${newCar?'':car.id}`,
    {
        data:JSON.stringify(data),
        headers:{'Accept':'application/json',
        'Content-Type':'application/json' }
    }
    )
    .then(dispatch(getCars()),
        (error) => dispatch(XHRError(error))
    );}
    execute();
}


const shouldGetCars = (state:IAppState) => {
    if(state.loading){
        return false;
    } else {
        return true;
    } 
}

export function getCarsIfNeeded(){
    return (dispatch:any, getState:any ) => {
        if(shouldGetCars(getState())){
            return dispatch(getCars());
        }
    }
}

export const openDialogue = (id:string, dialogue:Dialogues.Dialogue) => ({
    payload:{id,dialogue},
    type:OPEN_DIALOGUE
})

export const newCarDialogue = () => ({
    payload:{id:null,dialogue:Dialogues.NEW_CAR_DIALOGUE},
    type:OPEN_DIALOGUE,
}); 

export const closeDialogue = () => ({
    type:CLOSE_DIALOGUE
}); 


