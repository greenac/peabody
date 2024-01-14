import React, { SyntheticEvent, useState, useEffect } from "react"
import logger from "../../logger/logger"
import MovieModalActorList from "./MovieModalActorList"
import { IMovie } from "../../models/movie"
import { IActor } from "../../models/actor"
import {
  apiAddActorsToMovie,
  apiMovieDelete,
  apiOpenMovie,
  apiActorsInMovie,
  removeActorFromMovie,
} from "../../handlers/api/movie"
import {
  apiSearchActorsWithName,
  apiNewActor,
} from "../../handlers/api/actor"
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap"

interface IMovieModalProps {
  movie: IMovie
  showModal: boolean
  movieUpdated: (movie: IMovie) => void
  activateModal: () => void
  onClose: () => void
}

const MaxActorsToShow = 10

const MovieModal = (props: IMovieModalProps) => {
  const { movie, onClose, activateModal } = props
  const [ actor, setActor ] = useState<string>("")
  const [ chosenActors, setChosenActors ] = useState<IActor[]>([])
  const [ actors, setActors ] = useState<IActor[]>([])

  useEffect(() => {
    getActorsInMovie().catch(e => logger.error("MovieModal::useEffect failed with error:", e))
  }, [ movie] )

  const getActorsInMovie = async () => {
    const actors = await apiActorsInMovie(movie.id)
    setChosenActors(actors)
  }

  const getActorsForName = async (name: string): Promise<void> => {
    let acts: IActor[]
    try {
      acts = await apiSearchActorsWithName(name)
    } catch (error) {
      // TODO: show error to user
      console.log("MovieModal::getActorsForName Failed to fetch actor(s) with name:", name, error)
      return
    }

    setActors(acts)
  }

  const namesTextChanged = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault()

    const n = e.target.value
    setActor(n)

    await getActorsForName(n)
  }

  const addNewActor = async (): Promise<void> => {
    let a: IActor | undefined
    try {
      a = await apiNewActor(actor)
    } catch (error) {
      console.log("MovieModal::addNewActor failed with error:", error)
    }

    if (a) {
      setChosenActors([
        ...chosenActors,
        ...[a],
      ])
      setActor("")
    }
  }

  const actorSelected = (actorId: string): void => {
    const act = actors.find(a => a.id === actorId)
    if (act) {
      const newActors = [ ...chosenActors, ...[ act ]]
      newActors.sort((a1: IActor, a2: IActor): number => a1.fullName().localeCompare(a2.fullName()))
      setChosenActors(newActors)
      setActor("")
      setActors([])
    }
  }

  const addActorsToMovie = async (): Promise<void> => {
    if (chosenActors.length === 0) {
      return
    }

    await apiAddActorsToMovie(movie.id, chosenActors.map(a => a.id))
    onClose()
  }

  const openMovie = async (): Promise<void> => {
    try {
      await apiOpenMovie(movie.id)
    } catch (error) {
      logger.error("MovieModal::openMovie failed with error:", error)
    }
  }

  const actorsToAdd = (): IActor[] => {
    if (actors.length <= MaxActorsToShow) {
      return actors
    }

    return actors.slice(0, MaxActorsToShow)
  }

  const deleteMovie = async (): Promise<void> => {
    try {
      await apiMovieDelete(movie.id)
    } catch (error) {
      logger.error("Failed to delete movie:", movie.id)
    }

    onClose()
  }

  const removeActor = async (actorId: string): Promise<void> => {
    let m: IMovie
    try {
      m = await removeActorFromMovie(movie.id, actorId)
      await getActorsInMovie()
      props.movieUpdated(m)
    } catch (error) {
      logger.error("Failed to remove actor:", actorId, "from movie:", movie.name, error)
    }
  }

  const handleAddedActorClicked = async (actorId: string): Promise<void> => {
    let acts = [ ...chosenActors ]
    const size = acts.length
    const i = acts.findIndex(a => a.id === actorId)
    if (i > -1) {
      await removeActor(acts[i].id)
      acts.splice(i, 1)
    }

    if (acts.length < size) {
      setChosenActors(acts)
    }
  }

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <span>
      <Button variant={"light"} color={"warning"} onClick={() => activateModal()}>Details</Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.showModal}
      >
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            {movie.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <Container fluid>
             <Form>
             <Form.Group>
               <Form.Label>Search Name</Form.Label>
               <Form.Control value={actor} placeholder="Enter Name" size="lg" onInput={namesTextChanged} onChange={()=>{}}/>
             </Form.Group>
          </Form>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <MovieModalActorList actors={actorsToAdd()} onClick={actorSelected} />
        </Modal.Body>
        <Modal.Body>
          {
            chosenActors.map((actor, index) => {
              return (
                <Button
                  className="movie-modal-action-button"
                  variant={"outline-info"}
                  key={`${actor.id}-${index}`}
                  id={actor.id}
                  onClick={async () => { await handleAddedActorClicked(actor.id) }}
                >
                  {actor.fullName()}
                </Button>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col>
                <Button
                  className={"movie-modal-action-button"}
                  variant={"success"}
                  onClick={() => openMovie()}
                >
                  Play
                </Button>
                <Button
                  className={"movie-modal-action-button"}
                  disabled={actor.length === 0}
                  onClick={addNewActor}
                >
                  Add New
                </Button>
              </Col>
              <Col md={{offset: 1, span: "auto"}}>
                <Button
                  className={"movie-modal-action-button"}
                  variant={"success"}
                  disabled={chosenActors.length === 0}
                  onClick={async () => {await addActorsToMovie()}}
                >
                  Save
                </Button>
                <Button
                  className={"movie-modal-action-button"}
                  onClick={async () => {await deleteMovie()}}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </span>
  )
}

export default MovieModal
