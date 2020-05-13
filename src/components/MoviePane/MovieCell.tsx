import React from "react"
import { List, Grid, GridColumn } from "semantic-ui-react"
import { IMovie } from "../../models/movie"
import MovieModal from "./MovieModal"

interface IMovieCellProps {
  movie: IMovie
  onModalClose: () => void
}

const MovieCell = (props: IMovieCellProps) => {
  const { movie, onModalClose } = props

  return (
    <List.Item key={movie.id}>
      <List.Icon name="film" size="large" verticalAlign='middle' />
      <List.Content>
        <List.Header>{movie.name}</List.Header>
        <List.Description>
            <Grid columns={2}>
              <GridColumn width={8}>
                {movie.path}
              </GridColumn>
              <GridColumn>
                <MovieModal movie={movie} onClose={onModalClose} />
              </GridColumn>
            </Grid>
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default MovieCell
