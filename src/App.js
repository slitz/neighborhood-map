import React, { Component } from 'react';
import ListView from './ListView'
import Map from './Map'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="list-view">
          <ListView/>
        </div>
        <div className="app">
          <Map/>
        </div>
      </div>
    );
  }
}

export default App;
