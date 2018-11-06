import { connect } from 'react-redux';
import App, { IAppProps } from 'src/Components/App/App';
import {IAppState} from 'src/Types';

function mapStateToProps(state:{app:IAppState}) {
  const { dialogue, error} : IAppProps = state.app;
  return {dialogue,error};
}

export default connect(mapStateToProps)(App);