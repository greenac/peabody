import React, { MouseEvent } from "react"
import "semantic-ui-css/semantic.min.css"
import MovieCell from "./MovieCell"
import { List } from "semantic-ui-react"
import { IMovie } from "../../models/movie"

interface IMovieListProps {
  movies: IMovie[]
  onClick: (id :string) => void
}

const MovieList = (props: IMovieListProps) => {
  const { movies, onClick } = props

  const clicked = (id: string): void => {
    onClick(id)
  }

  return (
    <List relaxed>
      { movies.map((m: IMovie) => {
        return <MovieCell movie={m} onClick={clicked} />
      })}
    </List>
  )
}

export default MovieList
