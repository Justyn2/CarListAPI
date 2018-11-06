import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Dialogues from 'src/Redux/Constants/Dialogues';
import configurePopovers from 'src/configurePopovers';
import { closeDialogue, saveCar } from 'src/Redux/Actions/App';
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

export class PopoverContainer extends React.Component<IPopOverContainerProps,{}>{

  constructor(props:IPopOverContainerProps){
    super(props);
    this.closePopover = this.closePopover.bind(this);
  }

  public closePopover(dispatch:Dispatch){
    return () =>
     {
       dispatch(closeDialogue());
    }
  }

  public save(newCar:boolean){
        return () => {
          saveCar(this.props.dispatch,this.props.car, newCar);
        }
  }

  public render(){
    const {car,dialogue, dispatch} = this.props;
    const config = configurePopovers[`${dialogue}`];
    return dialogue ? (
      <Popover title={config.title}>
        <DetailsForm>
            {dialogue === Dialogues.DELETE_CAR_DIALOGUE ? (
            <div>
            <div>Are you sure you want to delete the:</div>
            <div>{`${car.year} ${car.make} ${car.model} ${car.trim}?`}</div>
            </div>
            )
            :
            (
            <span>
            <FormInput name={"Make"} noEdit={config.noEdits} value={car.make} label="Make"/>
            <FormInput name={"Model"} noEdit={config.noEdits} value={car.model} label="Model"/>
            <FormInput name={"Trim"} noEdit={config.noEdits} value={car.trim} label="Trim"/>
            <FormInput name={"Year"} noEdit={config.noEdits} value={car.year} label="Year"/>
            </span>
            )
            }
            {this.props.children}
        <div style={{ marginTop:'20px',float:'right'}}>
        <ActionButton style={style} text={'Save'} action={this.save(config.newCar)} enabled={true}/>
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