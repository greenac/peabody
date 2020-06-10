import React from "react"
import "./App.css"
import "semantic-ui-css/semantic.min.css"
import Menu from "./components/Nav/Nav"
import ActorPane, { ActorPaneSortDirection } from "./components/ActorPane/ActorPane"
import ActorMovieList from "./components/ActorPane/ActorMovieList"
import MoviePane from "./components/MoviePane/MoviePane"
import RecentMoviePane from "./components/RecentMovies/RecentMoviesPane"
import "bootstrap/dist/css/bootstrap.min.css"

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
            <Route path="/" exact render={()=> <ActorPane sortDirection={ActorPaneSortDirection.Name}/>} />
            <Route path="/actors" exact render={()=> <ActorPane sortDirection={ActorPaneSortDirection.Name}/>} />
            <Route path="/actors/recent" exact render={()=> <ActorPane sortDirection={ActorPaneSortDirection.Date}/>} />
            <Route path="/actors/movies/:actorId" component={ActorMovieList} />
            <Route path="/movies" exact component={MoviePane} />
            <Route path="/movies/recent" exact component={RecentMoviePane} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
