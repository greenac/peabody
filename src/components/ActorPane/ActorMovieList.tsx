import React, { SyntheticEvent, useEffect, useState } from "react"
import { IMovie } from "../../models/movie"
import { Card, Button, ButtonProps, Header} from "semantic-ui-react"
import { apiMoviesForActor } from "../../handlers/api/actor"
import logger from "../../logger/logger"
import { RouteComponentProps } from "react-router-dom"
import { apiOpenMovie } from "../../handlers/api/movie"
import moment from "moment"

type RouteParams = { actorId: string }

const ActorMovieList = ({ match }: RouteComponentProps<RouteParams>) => {
  console.log("loading actor movie list")
  const [ movies, setMovies ] = useState<IMovie[]>([])

  useEffect(() => {
    console.log("Getting movies for actor:", (match.params.actorId))
    getMovies(match.params.actorId).catch(e => logger.error("Failed to fetch movies for actor", e))
  }, [])

  const getMovies = async (actorId: string): Promise<void> => {
    logger.log("get movies called")

    let mvs: IMovie[] = []
    try {
      mvs = await apiMoviesForActor(actorId)
    } catch (error) {
      logger.error("ActorMovieList::Failed to get movies for actor:", actorId)
    }

    setMovies(mvs)
  }

  const playMovie = async (
    e: SyntheticEvent<HTMLButtonElement, MouseEvent>,
    props: ButtonProps,
  ): Promise<void> => {
    const { id } = props
    try {
      await apiOpenMovie(id)
    } catch (error) {
      logger.error("ActorMovieListCell::openMovie failed with error:", error)
    }
  }

  return (
    <Card.Group>
      {
        movies.map((m: IMovie) => {
          return (
            <Card>
              <Card.Content>
                <Card.Header>{m.name}</Card.Header>
                <Card.Meta>{moment(m.updated).format("hh:mm:ss, MMMM Do YYYY")}</Card.Meta>
                <Card.Description>
                  <strong>{m.path}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button id={m.id} basic color="google plus" onClick={playMovie}>
                    Play
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>
  )
}

export default ActorMovieList
