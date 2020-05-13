import React from "react"
import { IMovie } from "../../models/movie"
import { List, Button } from "semantic-ui-react"
import { apiOpenMovie } from "../../handlers/api/movie"
import logger from "../../logger/logger"

interface ActorMovieListCellProps {
  movie: IMovie
}

const ActorMovieListCell = (props: ActorMovieListCellProps) => {
  const { movie } = props

  const openMovie = async () => {
    try {
      await apiOpenMovie(movie.id)
    } catch (error) {
      logger.error("ActorMovieListCell::openMovie failed with error:", error)
    }
  }

  return (
    <List.Item key={movie.id}>
      <List.Icon name="film" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>{movie.name}</List.Header>
        <Button icon="play" id={movie.id} onClick={openMovie} />
      </List.Content>
    </List.Item>
  )
}

export default ActorMovieListCell
