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

  const mvIds = new Set()

  const clicked = (id: string): void => {
    onClick(id)
  }

  return (
    <List divided relaxed>
      { movies.map((m: IMovie, i: number) => {
        console.log(m.id)
        if (mvIds.has(m.id)) {
          console.log("ALREADY HAS ID:", m.id)
        }

        console.log("Adding movie:", m.id, "counter:", i, m.name)

        mvIds.add(m.id)

        return <MovieCell movie={m} onClick={clicked} />
      })}
    </List>
  )
}

export default MovieList
