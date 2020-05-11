import React, { MouseEvent } from "react"
import { List, Grid, GridColumn } from "semantic-ui-react"
import { IMovie } from "../../models/movie"
import MovieModal from "./MovieModal"

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
      <List.Icon name="film" size="large" verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>{movie.identifier}</List.Header>
        <List.Description as='a'>
            <Grid columns={2}>
              <GridColumn width={6}>
                {movie.path}
              </GridColumn>
              <GridColumn>
                <MovieModal movie={movie}></MovieModal>
              </GridColumn>
            </Grid>
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default MovieCell
