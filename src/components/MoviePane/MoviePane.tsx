import logger from "../../logger/logger"
import MovieList from "./MovieList"
import React, { useState, useEffect } from "react"
import { IMovie } from "../../models/movie"
import { apiGetUnknownMovies } from "../../handlers/api"

const MoviePane = () => {
  const [ movies, setMovies ] = useState<IMovie[]>([])

  useEffect(() => {
    getUnknownMovies()
      .catch(error => {
        console.log("Failed to get unknown movies with error:", error)
        setMovies([])
      })
  }, [])

  const getUnknownMovies = async () => {
    let mvs: IMovie[] = []
    try {
      mvs = await apiGetUnknownMovies()
    } catch (error) {
      logger.error("MovePane::Could not get unknown movies. Got error", error)
    } finally {
      setMovies(mvs)
    }
  }

  const movieClicked = (id: string): void => {
    console.log("Movie clicked:", id)
  }

  return (
    <div className="actor-pane">
      <MovieList movies={movies} onClick={movieClicked} />
    </div>
  )
}

export default MoviePane
