import React, { MouseEvent } from "react"
import "semantic-ui-css/semantic.min.css"
import { List } from "semantic-ui-react"
import { IMovie } from "../../models/movie"

interface IMovieCellProps {
  movie: IMovie
  onClick: (id :string) => void
}

const MovieCell = (props: IMovieCellProps) => {
  const { movie, onClick } = props

  const clicked = (evt: MouseEvent): void => {
    onClick(movie.id)
  }

  return (
    <List.Item key={movie.id} onClick={clicked}>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>{movie.identifier}</List.Header>
        <List.Description as='a'>{movie.path}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default MovieCell
