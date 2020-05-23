import React, {SyntheticEvent, useEffect, useState} from "react"
import { IMovie } from "../../models/movie"
import logger from "../../logger/logger"
import {
  apiSearchMoviesByDate,
  apiOpenMovie,
} from "../../handlers/api/movie"
import {
  Card,
  Button,
  ButtonProps,
  List,
} from "semantic-ui-react"
import {IActor} from "../../models/actor"


const MoviesByDateCollection = () => {
  const [ movies, setMovies ] = useState<IMovie[]>([])

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    let mvs: IMovie[] = []
    try {
      mvs = await apiSearchMoviesByDate("")
    } catch (error) {
      logger.error("MoviesByDateCollection::fetchMovies failed with error:", error)
    } finally {
      setMovies(mvs)
    }
  }

  const playMovieClicked = async (
    e: SyntheticEvent<HTMLButtonElement, MouseEvent>,
    props: ButtonProps,
  ): Promise<void> => {
    const { movieid } = props

    await apiOpenMovie(movieid)
  }

  return (
    <div>
      <Card.Group>
        {
          movies.map((m: IMovie) => {
            return (
              <Card key={m.id}>
                <Card.Content>
                  <Card.Header>{m.name}</Card.Header>
                  <Card.Description>
                    <List horizontal>
                      {
                        m.getActors().map((actor: IActor) => {
                          return (
                            <Button id={actor.id}>
                              <List.Item key={actor.id}>{actor.fullName()}</List.Item>
                            </Button>
                          )
                        })
                      }
                    </List>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button movieid={m.id} basic color="green" onClick={playMovieClicked}>
                      Play
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )
          })
        }
      </Card.Group>
    </div>
  )
}

export default MoviesByDateCollection
