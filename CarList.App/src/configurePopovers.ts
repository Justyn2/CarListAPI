import * as Dialogues from './Redux/Constants/Dialogues';

export default {
    [Dialogues.NEW_CAR_DIALOGUE]:{title:'Add New Car', noEdits:false, newCar:true, enableSave:true},
    [Dialogues.EDIT_CAR_DIALOGUE]:{title:'Edit Car', noEdits:false, newCar:false, enableSave:true},
    [Dialogues.DELETE_CAR_DIALOGUE]:{title:'Delete Car', noEdits:true, newCar:false, enableSave:true},
    [Dialogues.CAR_DETAILS_DIALOGUE]:{title:'Car Details', noEdits:true, newCar:false, enableSave:false},
}