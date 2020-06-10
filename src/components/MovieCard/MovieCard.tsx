import React, { useState, useEffect } from "react"
import moment from "moment"
import logger from "../../logger/logger"
import { IMovie } from "../../models/movie"
import { IActor } from "../../models/actor"
import {
  apiActorsInMovie,
  apiOpenMovie,
} from "../../handlers/api/movie"
import {
  Card,
  Button,
  List,
  Grid,
  Segment,
} from "semantic-ui-react"

interface IMovieCardProps {
  movie: IMovie
}

const MovieCard = (props: IMovieCardProps) => {
  const { movie } = props

  const [ actors, setActors ] = useState<IActor[]>([])
  useEffect(() => {
    if (movie.actorIds.length === 0) {
      return
    }

    if (movie.actors.length === 0) {
      fetchActors().catch(error => {})
    } else {
      setActors(movie.getActors())
    }
  }, [])

  const fetchActors = async () => {
    let acts: IActor[] = []
    try {
      logger.log("Fetching actors for movie:", movie.name, movie.actorIds)
      acts = await apiActorsInMovie(movie.id)
    } catch (error) {
      logger.error("MovieCard::fetchActors failed with error:", error)
      return
    }
    
    setActors(acts)
  }

  const playMovie = async () => {
    try {
      await apiOpenMovie(movie.id)
    } catch (error) {
      logger.error("MovieCard::playMovie failed with error:", error)
    }
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>{movie.name}</Card.Header>
        <Card.Meta>
          {`Updated ${moment(movie.updated).format("hh:mm:ss, MMMM Do YYYY")}`}
        </Card.Meta>
        <Card.Description>
          <List horizontal>
            {
              actors.map(actor => {
                return (
                  <Button id={actor.id} key={actor.id}>
                    <List.Item key={actor.id}>{actor.fullName()}</List.Item>
                  </Button>
                )
              })
            }
          </List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button fluid basic color="blue" onClick={playMovie}>
          Play
        </Button>
      </Card.Content>
    </Card>
  )
}

export default MovieCard
