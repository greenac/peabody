import React, { useEffect, useState} from "react"
import logger from "../../logger/logger"
import MovieCard from "../MovieCard/MovieCard"
import { IMovie } from "../../models/movie"
import { CardGroup } from "semantic-ui-react"
import { apiSearchMoviesByDate } from "../../handlers/api/movie"


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

  const handleMovieUpdated = (movie: IMovie): void => {
    const mvs = [ ...movies ]
    const index = mvs.findIndex(m => m.id === movie.id)

    if (index !== -1) {
      mvs[index] = movie
      setMovies(mvs)
    }
  }

  return (
    <div>
      <CardGroup>
        {
          movies.map((m: IMovie) => { return <MovieCard key={m.id} movie={m} movieUpdated={handleMovieUpdated} /> })
        }
      </CardGroup>
    </div>
  )
}

export default MoviesByDateCollection
