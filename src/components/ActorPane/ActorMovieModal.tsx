import React, {useEffect, useState} from "react"
import { IActor } from "../../models/actor"
import { IMovie } from "../../models/movie"
import logger from "../../logger/logger"
import { apiMoviesWithIds } from "../../handlers/api/movie"
import {
  Button,
  List,
  ListItem,
  ListIcon,
  ListContent,
} from "semantic-ui-react"

interface IActorMovieModalProps {
  actor: IActor
  onClose: (actorId: string) => void
}

const ActorMovieModal = (props: IActorMovieModalProps) => {
  const { actor } = props
  const [ movies, setMovies ] = useState<IMovie[]>([])


  useEffect(() => {
    logger.log("movies use effect")
    getMovies().then(() => logger.log("Fetched movies for actor:", actor.fullName()))
  }, [])

  const getMovies = async () => {
    if (actor.movieIds.length === 0) {
      return
    }

    let mvs: IMovie[] = []
    try {
      mvs = await apiMoviesWithIds(actor.movieIds)
    } catch (error) {
      logger.error("Failed to get actor:", actor.fullName(), "movies")
    }

    setMovies(mvs)
  }

  return (
    <List selection={true}>
      {
        movies.map(m => {
          return (
            <ListItem key={m.id}>
              <Button basic={true}>
                <ListIcon name="film" size="large" />
                <ListContent floated={"right"}>{m.name}</ListContent>
              </Button>
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default ActorMovieModal
