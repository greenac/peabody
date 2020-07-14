import React, { SyntheticEvent, useState } from "react"
import logger from "../../logger/logger"
import { IMovie } from "../../models/movie"
import { IActor } from "../../models/actor"
import MovieModalListItem from "./MovieModalListItem"
import {
  Button,
  Header,
  Modal,
  Form,
  List,
  Grid,
  GridColumn, ButtonProps
} from "semantic-ui-react"
import {
  apiAddActorsToMovie, apiMovieDelete,
  apiOpenMovie
} from "../../handlers/api/movie"
import {
  apiSearchActorsWithName,
  apiNewActor
} from "../../handlers/api/actor"

interface IMovieModalProps {
  movie: IMovie
  onClose: () => void
}

const MovieModal = (props: IMovieModalProps) => {
  const { movie, onClose } = props
  const [ actor, setActor ] = useState<string>("")
  const [ chosenActors, setChosenActors ] = useState<IActor[]>([])
  const [ actors, setActors ] = useState<IActor[]>([])

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

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault()

    await addActorsToMovie()
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
        ...[ a ],
      ])
      setActor("")
    }
  }

  const actorSelected = (actorId: string):void => {
    console.log("Actor was selected:", actorId)

    let a: IActor | undefined
    for (const act of actors) {
      if (act.id === actorId) {
        a = act
        break
      }
    }

    if (a) {
      setChosenActors([ ...chosenActors, ...[ a ]])
      setActor("")
      setActors([])
    }
  }

  const addActorsToMovie = async (): Promise<void> => {
    if (chosenActors.length === 0) {
      return
    }

    await apiAddActorsToMovie(movie.id, chosenActors.map(a => a.id))
  }

  const closeModal = (): void => {
    onClose()
  }

  const openMovie = async (): Promise<void> => {
    try {
      await apiOpenMovie(movie.id)
    } catch (error) {
      logger.error("MovieModal::openMovie failed with error:", error)
    }
  }

  const handleDelete = async (): Promise<void> => {
    try {
      await apiMovieDelete(movie.id)
    } catch (error) {
      logger.error("Failed to delete movie:", movie.id)
    }
  }

  const handleAddedActorClicked = (e: SyntheticEvent, props: ButtonProps): void => {
    console.log("actor clicked:", props.id)
    let acts = [ ...chosenActors ]
    const size = acts.length
    for (let i=0; i < size; i++) {
      console.log("checking actor:", acts[i].fullName())
      if (acts[i].id === props.id) {
        console.log("got hit:", props.id)
        acts.splice(i, 1)
        break
      }
    }

    if (acts.length < size) {
      setChosenActors(acts)
    }
  }

  return (
    <Modal trigger={<Button icon="edit" size="small" />} onClose={closeModal} centered={false}>
      <Modal.Header>
        <Grid columns={4}>
          <GridColumn width={1}>
            <Button icon="play" onClick={openMovie} />
          </GridColumn>
          <GridColumn width={1}>
            <Button icon="add" onClick={addNewActor} />
          </GridColumn>
          <GridColumn width={12}>
            <p>{movie.name}</p>
          </GridColumn>
          <GridColumn width={1}>
            <Button icon="delete" onClick={handleDelete} />
          </GridColumn>
          <GridColumn width={1}>
            <Button icon="sync" onClick={handleSubmit} />
          </GridColumn>
        </Grid>
      </Modal.Header>
      <Modal.Content>
          <Header>
            <List horizontal>
              {
                chosenActors.map((actor: IActor) => {
                  return (
                    <Button id={actor.id} onClick={handleAddedActorClicked}>
                      <List.Item key={actor.id}>{actor.fullName()}</List.Item>
                    </Button>
                  )
                })
              }
            </List>
          </Header>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input value={actor} placeholder="Name" onInput={namesTextChanged} onChange={()=>{}}/>
            </Form.Field>
          </Form>
          <List horizontal>
            {
              actors.map((a: IActor) => {
                return <MovieModalListItem actor={a} onClick={actorSelected} />
              })
            }
          </List>
      </Modal.Content>
    </Modal>
  )
}

export default MovieModal
