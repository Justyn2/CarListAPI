import * as React from 'react';
import logo from 'src/logo.svg';
import * as SC from './App.styles';

class App extends React.Component {
  public render() {
    return (
      <SC.App>
        <SC.AppHeader className="App-header">
          <SC.AppLogo src={logo} className="App-logo" alt="logo" />
          <SC.AppTitle className="App-title">Welcome to React</SC.AppTitle>
        </SC.AppHeader>
        <SC.AppIntro className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </SC.AppIntro>
      </SC.App>
    );
  }
}

export default App;
