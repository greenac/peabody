import React from "react"
import MovieCell from "./MovieCell"
import { List } from "semantic-ui-react"
import { IMovie } from "../../models/movie"

interface IMovieListProps {
  movies: IMovie[]
  onModalClose: () => void
}

const MovieList = (props: IMovieListProps) => {
  const { movies, onModalClose } = props

  return (
    <List relaxed>{
      movies.map((m: IMovie) => {
      return (
        <MovieCell key={m.id} movie={m} onModalClose={onModalClose}/>
      )
    }) }</List>
  )
}

export default MovieList
