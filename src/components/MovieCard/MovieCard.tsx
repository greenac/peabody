import React, { useState, useEffect } from "react"
import moment from "moment"
import MovieModal from "../MoviePane/MovieModal"
import logger from "../../logger/logger"
import { IMovie } from "../../models/movie"
import { IActor } from "../../models/actor"
import {
  apiActorsInMovie,
  apiOpenMovie,
} from "../../handlers/api/movie"
import { Card, Button } from "react-bootstrap"

interface IMovieCardProps {
  movie: IMovie
  movieUpdated: (movie: IMovie) => void
}

const MovieCard = (props: IMovieCardProps) => {
  const { movie } = props

  const [ actors, setActors ] = useState<IActor[]>([])
  const [ showModal, setShowModal ] = useState<boolean>(false)

  useEffect(() => {
    if (movie.actorIds.length === 0) {
      return
    }

    if (!movie.actors || movie.actors.length === 0) {
      fetchActors().catch(error => {})
    } else {
      setActors(movie.getActors())
    }
  }, [movie])

  const fetchActors = async () => {
    let acts: IActor[] = []
    try {
      acts = await apiActorsInMovie(movie.id)
    } catch (error) {
      logger.error("MovieCard::fetchActors failed with error:", error)
      return
    }

    movie.actors = acts

    setActors(acts)
  }

  const playMovie = async () => {
    try {
      await apiOpenMovie(movie.id)
    } catch (error) {
      logger.error("MovieCard::playMovie failed with error:", error)
    }
  }

  const onModalClose = () => {
    setShowModal(false)
  }

  const activateModal = () => {
    setShowModal(true)
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {movie.name}
        </Card.Title>
        <Card.Text>
          {`Updated: ${moment(movie.updated).format("YYYY-MM-DD hh:mm")}`}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        {
          actors.map(actor => {
            return (
              <div className={"movie-card-actor-name"} id={actor.id} key={actor.id}>{actor.fullName()}</div>
            )
          })
        }
      </Card.Body>
      <Card.Footer>
        <Button onClick={playMovie}>Play</Button>
        <MovieModal
          movie={movie}
          onClose={onModalClose}
          movieUpdated={props.movieUpdated}
          showModal={showModal}
          activateModal={activateModal}
        />
      </Card.Footer>
    </Card>
  )
}

export default MovieCard
