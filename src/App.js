import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VolumeBreakoutGraph from './containers/VolumeBreakoutGraph';
import EpisodeAnalysis from './containers/EpisodeAnalysisGraphs';
import TimeSpanSelector from './containers/TimeSpanSelector';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>COMPETITOR SENTIMENT ANALYSIS</h2>
        </div>
        <TimeSpanSelector />
        <VolumeBreakoutGraph />
        <EpisodeAnalysis />
      </div>
    );
  }
}

export default App;
