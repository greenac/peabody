import React from "react"
import { IMovie } from "../../models/movie"
import {
  Button,
  Header,
  Modal,
} from "semantic-ui-react"

interface IMovieModalProps {
  movie: IMovie
}

const MovieModal = (props: IMovieModalProps) => {
  return (
    <Modal trigger={<Button icon="edit" size="tiny" verticalAlign="middle"></Button>} centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{props.movie.name}</Header>
          <p>
            {props.movie.id}
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default MovieModal
