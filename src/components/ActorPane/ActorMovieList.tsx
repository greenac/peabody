import React, { SyntheticEvent, useEffect, useState } from "react"
import logger from "../../logger/logger"
import MovieCard from "../MovieCard/MovieCard"
import { IMovie } from "../../models/movie"
import { apiMoviesForActor } from "../../handlers/api/actor"
import { RouteComponentProps } from "react-router-dom"
import { Card } from "semantic-ui-react"

type RouteParams = { actorId: string }

const ActorMovieList = ({ match }: RouteComponentProps<RouteParams>) => {
  const [ movies, setMovies ] = useState<IMovie[]>([])

  useEffect(() => {
    getMovies(match.params.actorId).catch(e => logger.error("Failed to fetch movies for actor", e))
  }, [])

  const getMovies = async (actorId: string): Promise<void> => {
    logger.log("get movies called")

    let mvs: IMovie[] = []
    try {
      mvs = await apiMoviesForActor(actorId)
    } catch (error) {
      logger.error("ActorMovieList::Failed to get movies for actor:", actorId)
    }

    setMovies(mvs)
  }

  return (
    <Card.Group>
      {
        movies.map(m => { return <MovieCard key={m.id} movie={m} /> })
      }
    </Card.Group>
  )
}

export default ActorMovieList
