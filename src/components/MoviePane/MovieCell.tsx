import React, { useState } from "react"
import MovieModal from "./MovieModal"
import { IMovie } from "../../models/movie"
import {
  Row,
  Col,
  ListGroupItem,
} from "react-bootstrap"

interface IMovieCellProps {
  movie: IMovie
  onModalClose: () => void
  movieUpdated: (movie: IMovie) => void
}

const MovieCell = (props: IMovieCellProps) => {
  const { movie, onModalClose } = props

  const [ showModal, setShowModal ] = useState(false)

  const activateModal = () => {
    console.log("Movie clicked:", movie.name)
    setShowModal(true)
  }

  const closeModal = () => {
    console.log("Setting modal to closed for movie:", movie.name)
    setShowModal(false)
    onModalClose()
  }

  return (
    <ListGroupItem onClick={activateModal}>
      <Row noGutters={true}>
        <Col md={1}>
          <MovieModal
            movie={movie}
            onClose={closeModal}
            movieUpdated={props.movieUpdated}
            showModal={showModal}
            activateModal={activateModal}
          />
        </Col>
        <Col>
          <Row>
            <h5>{movie.name}</h5>
          </Row>
          <Row>
            {movie.path}
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default MovieCell
