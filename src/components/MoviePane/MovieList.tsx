import React from "react"
import MovieCell from "./MovieCell"
import { ListGroup } from "react-bootstrap"
import { IMovie } from "../../models/movie"

interface IMovieListProps {
  movies: IMovie[]
  movieUpdated: (movie: IMovie) => void
  onModalClose: () => void
}

const MovieList = (props: IMovieListProps) => {
  const { movies, onModalClose } = props

  return (
      <ListGroup variant={"flush"}>
        {
          movies.map((m: IMovie) => {
            return (
              <MovieCell
                key={m.id}
                movie={m}
                onModalClose={onModalClose}
                movieUpdated={props.movieUpdated}
              />
            )
          })
        }
      </ListGroup>
  )
}

export default MovieList
