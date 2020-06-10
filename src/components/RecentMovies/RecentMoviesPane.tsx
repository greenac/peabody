import React, {SyntheticEvent, useEffect, useState} from "react"
import MovieCard from "../MovieCard/MovieCard"
import { IMovie } from "../../models/movie"
import logger from "../../logger/logger"
import { IActor } from "../../models/actor"

import {
  apiSearchMoviesByDate,
  apiOpenMovie,
} from "../../handlers/api/movie"
import {
  Card,
  ButtonProps,
} from "semantic-ui-react"


const MoviesByDateCollection = () => {
  const [ movies, setMovies ] = useState<IMovie[]>([])

  useEffect(() => {
    fetchMovies().catch(error => {})
  }, [])

  const fetchMovies = async () => {
    let mvs: IMovie[] = []
    try {
      mvs = await apiSearchMoviesByDate("")
    } catch (error) {
      logger.error("MoviesByDateCollection::fetchMovies failed with error:", error)
    } finally {
      setMovies(mvs)
    }
  }

  return (
    <div>
      <Card.Group>
        {
          movies.map((m: IMovie) => { return <MovieCard key={m.id} movie={m} /> })
        }
      </Card.Group>
    </div>
  )
}

export default MoviesByDateCollection
