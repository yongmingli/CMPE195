import React, { Component } from "react";
import { ReactiveBase, DataSearch, RatingsFilter,RangeSlider } from "@appbaseio/reactivesearch";
import injectTapEventPlugin from 'react-tap-event-plugin';
//import Loginscreen from './components/Login/Loginscreen'
import Login from './components/Login/Login.js'
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Login parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;