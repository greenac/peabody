import React, { useEffect, useState } from "react"
import { IActor } from "../../models/actor"
import { IMovie } from "../../models/movie"
import { List } from "semantic-ui-react"
import { apiMoviesWithIds } from "../../handlers/api/movie"
import ActorMovieListCell from "./ActorMovieListCell"
import logger from "../../logger/logger"

interface IActorMovieListProps {
  movieIds: string[]
}

const ActorMovieList = (props: IActorMovieListProps) => {
  const { movieIds } = props

  const [ movies, setMovies ] = useState<IMovie[]>([])

  useEffect(() => {
    getMovies()
  }, [movieIds])

  const getMovies = async (): Promise<void> => {
    logger.log("get movies called")
    if (movieIds.length === 0) {
      return
    }

    let mvs: IMovie[] = []
    try {
      mvs = await apiMoviesWithIds(movieIds)
    } catch (error) {
      logger.error("ActorMovieList::Failed to get movies for actor:", movieIds)
    }

    setMovies(mvs)
  }

  return (
    <List relaxed>
      {
        movies.map((m: IMovie) => {
          logger.log("rendering movie:", m)
          return <ActorMovieListCell movie={m} />
        })
      }
    </List>
  )
}

export default ActorMovieList
