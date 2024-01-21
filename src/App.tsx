import React from "react"
import "./App.css"
import "semantic-ui-css/semantic.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Menu from "./components/Nav/Nav"
import ActorPane, { ActorPaneSortDirection } from "./components/ActorPane/ActorPane"
import ActorMovieList from "./components/ActorPane/ActorMovieList"
import MoviePane from "./components/MoviePane/MoviePane"
import RecentMoviePane from "./components/RecentMovies/RecentMoviesPane"
import MovieSearchPane from "./components/MoviePane/MovieSearchPane"
import {
    Route,
    Routes,
    BrowserRouter as Router
} from "react-router-dom"



function App() {
  return (
      <React.StrictMode>
          <Router>
              <Menu />
              <Routes>
                  <Route path="/"  element={<ActorPane sortDirection={ActorPaneSortDirection.Name} />} />
                  <Route path="/actors"  element={<ActorPane sortDirection={ActorPaneSortDirection.Name} />} />
                  <Route path="/actors/recent"  element={<ActorPane sortDirection={ActorPaneSortDirection.Date} />} />
                  <Route path="/actors/movies/:actorId" element={<ActorMovieList />} />
                  <Route path="/movies"  element={<MoviePane />} />
                  <Route path="/movies/recent"  element={<RecentMoviePane />} />
                  <Route path="/movies/search"  element={<MovieSearchPane />} />
              </Routes>

          </Router>
      </React.StrictMode>
  )
}

export default App
