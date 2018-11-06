import { handleActions } from 'redux-actions';
import { ALL_CARS_LOAD,
  XHR_LOAD_FAIL,
  ALL_CARS_LOAD_SUCCESS,
  CLOSE_DIALOGUE,
  OPEN_DIALOGUE,
  SAVING_CAR,
} from '../Constants/App';
import { IAppState, CarModel } from 'src/Types';

const initialState:IAppState
= {
    cars: [],
    dialogue:null,
    error: null,
    loaded: false,
    loading: false
  };

  export default handleActions({
    [ALL_CARS_LOAD]: (store) => ({...store,
      cars:[],
      error: null,
      loaded: false,
      loading: true,
    }),
    [SAVING_CAR]: (store) => ({...store,
      error: null,
      loaded: false,
      loading: true,
    }),
    [ALL_CARS_LOAD_SUCCESS]: (store, { payload }:any) =>
    ({ 
        ...store,
        cars:payload?payload:[],
        dialogue:null,
        error: null,
        loaded: true,
        loading: false, 
      }),
    [XHR_LOAD_FAIL]: (store, {payload}:any ) => 
      { 
        let error:Error|null = null;
        if(payload){
         error=payload; 
        }
        return {...store,
        cars:[],
        error,
        loaded: false,
        loading: false,};
      },
      [OPEN_DIALOGUE]:(store, {payload}:any) => 
      {
        const car=store.cars.find(x=>x.id===payload.id)
        || new CarModel();
        return {
        ...store,
        dialogue: payload.dialogue,
        car
      }
      },
      [CLOSE_DIALOGUE]:(store) => ({
        ...store,
        dialogue:null,
      })
  }, initialState);