import React from 'react';
import logo from './logo.svg';
import './App.css';
import ActorPane from "./components/ActorPane/ActorPane"
import MoviePane from "./components/MoviePane/MoviePane"
import "semantic-ui-css/semantic.min.css"


function App() {
  return (
    <div className="App">
      <div id="app-content">
        <MoviePane></MoviePane>
      </div>
    </div>
  );
}

export default App;
