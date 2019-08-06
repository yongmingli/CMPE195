import React from 'react';
import logo from './logo.svg';
import './App.css';

import View1 from './View1';

function App() {
  return (
    <div className="App" hey={1}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class RealApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConsumer: true,
      isMerchant: true,
    };
  }

  handleClick() {
    this.setState({
      isConsumer: false
    });
  }

  render() {
    if (!this.state.isConsumer) {
      return null;
    }
    return <div>
      <button onClick={this.handleClick} />
      <MiniApp variable1={this.state.isMerchant} />
    </div>
  }
}

export default App;
