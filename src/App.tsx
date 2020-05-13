import React from "react"
import "./App.css"
import "semantic-ui-css/semantic.min.css"
import Menu from "./components/Nav/Nav"
import ActorPane from "./components/ActorPane/ActorPane"
import MoviePane from "./components/MoviePane/MoviePane"
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div id="app-content">
          <Menu />
          <Switch>
            <Route path="/" exact component={MoviePane} />
            <Route path="/actors" component={ActorPane} />
            <Route path="/movies" component={MoviePane} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
