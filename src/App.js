import React, { Component } from 'react';
import './App.css';
import ViewImg from './component/viewimg'
import Control from './component/control'

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="containerPizza">
        <ViewImg ></ViewImg>
        <Control ></Control>
      </div>
    );
  }

}

export default App;
