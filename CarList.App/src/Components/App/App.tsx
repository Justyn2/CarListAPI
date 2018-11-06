import * as React from 'react';
import PopOverContainer from 'src/Containers/CarDialoguePopover';
import { getCarsIfNeeded, newCarDialogue } from 'src/Redux/Actions/App';
import * as Dialogues from 'src/Redux/Constants/Dialogues';
import logo from '../../logo.svg';
import ActionButton from '../ActionButton/ActionButton';
import { AppHeader, AppLogo, AppMain, AppTitle } from './App.styles';
import CarGrid from 'src/Containers/CarGrid';

export interface IAppProps
{
  dispatch?:any;
  dialogue:Dialogues.Dialogue;
  error:Error|null;
}
class App extends React.Component<IAppProps,{}> {

  constructor(props:IAppProps){
  super(props);
  this.openNewCarDialogue = this.openNewCarDialogue.bind(this);

}
  public componentDidMount() {
    this.props.dispatch(getCarsIfNeeded());
  }
  public openNewCarDialogue(){
    return this.props.dispatch(newCarDialogue());
  }
  public render() {
    const { error, dialogue}=this.props;
    return (
      <AppMain>
        <PopOverContainer/>
        <AppHeader className="App-header">
          <AppLogo src={logo} className="App-logo" alt="logo" />
          <AppTitle className="App-title">Car Demo App </AppTitle> 
        </AppHeader>
        <div style={{margin:"0 10px"}}>
        {error ? `${error.name}:${error.message}`:``}
        <ActionButton 
          style={{float:'right'}}
          text='Add New'
          action={this.openNewCarDialogue}
          enabled={dialogue !== Dialogues.NEW_CAR_DIALOGUE} 
        />
        <div style={{clear:'both'}} />
        <CarGrid/>
        </div>
      </AppMain>
    );
  }
}

export default App;
