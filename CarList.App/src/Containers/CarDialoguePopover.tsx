import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Dialogues from 'src/Redux/Constants/Dialogues';
import configurePopovers from 'src/configurePopovers';
import { closeDialogue, saveCar, deleteCar, updateCar } from 'src/Redux/Actions/App';
import {IAppState, ICarModel} from 'src/Types';
import Popover from 'src/Components/Popover/Popover';
import ActionButton from 'src/Components/ActionButton/ActionButton';
import styled from 'styled-components';
import FormInput from 'src/Components/FormInput/FormInput';


interface IPopOverContainerProps{
dialogue:Dialogues.Dialogue;
dispatch:Dispatch;
car:ICarModel;
}

function mapStateToProps(state:{app:IAppState}) {
  return ({
    dialogue: state.app.dialogue,
    car:state.app.car,
  });
}

const style:React.CSSProperties = {
  display: 'inline',
  marginLeft:'2em',
};

export class PopoverContainer extends React.Component<IPopOverContainerProps,ICarModel>{

  constructor(props:IPopOverContainerProps){
    super(props);
    this.closePopover = this.closePopover.bind(this);
    this.update = this.update.bind(this);
    this.save = this.save.bind(this);
  }

  public closePopover(dispatch:Dispatch){
    return () =>
     {
       dispatch(closeDialogue());
    }
  }

  public update(event:any){
    // tslint:disable-next-line
    event.target.id;
    // tslint:disable-next-line
    event.target.value;
    const car = {...this.props.car, [`${event.target.id}`]:event.target.value};
    this.props.dispatch(updateCar(car));
  }

  public save(newCar:boolean, deletion:boolean, enableSave:boolean){
    if(deletion){
      return()=> {
        deleteCar(this.props.dispatch, this.props.car.id);
      }
    }
    if(enableSave){
      return () => {
        saveCar(this.props.dispatch, this.props.car, newCar);
      }
    }
    return this.closePopover(this.props.dispatch);
  }

  public render(){
    const {car,dialogue, dispatch} = this.props;
    const config = configurePopovers[`${dialogue}`];
    const deleteDialogue = dialogue === Dialogues.DELETE_CAR_DIALOGUE;
    return dialogue ? (
      <Popover title={config.title}>
        <DetailsForm>
            {deleteDialogue ? (
            <div>
            <div>Are you sure you want to delete the:</div>
            <div>{`${car.year} ${car.make} ${car.model} ${car.trim}?`}</div>
            </div>
            )
            :
            (
            <span>
            <FormInput name={"make"} noEdit={config.noEdits} value={car.make} onChange={this.update} label="Make"/>
            <FormInput name={"model"} noEdit={config.noEdits} value={car.model} onChange={this.update} label="Model"/>
            <FormInput name={"trim"} noEdit={config.noEdits} value={car.trim} onChange={this.update} label="Trim"/>
            <FormInput name={"year"} noEdit={config.noEdits} value={car.year} onChange={this.update} label="Year"/>
            </span>
            )
            }
            {this.props.children}
        <div style={{ marginTop:'20px',float:'right'}}>
        <ActionButton style={style} text={'Save'} action={this.save(config.newCar, deleteDialogue, config.enableSave )} enabled={true}/>
        <ActionButton style={style} text={'Cancel'} action={this.closePopover(dispatch)} enabled={true}/>
        </div>
        </DetailsForm>
      </Popover>
    ): (null);
  }

}


const DetailsForm = styled.form`
text-align:left;
margin:10px;
box-sizing:border-box;
span {
    display:block;
    width:100%;
    box-sizing:border-box;
    label{
        display:inline-block;
        width:25%;
        box-sizing:border-box;
    }
    input{
        display:inline-block;
        width:75%
        box-sizing:border-box;
    }
}
`;

export default connect(mapStateToProps)(PopoverContainer);