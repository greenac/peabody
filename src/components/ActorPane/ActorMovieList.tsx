import React, { useEffect, useState } from "react"
import logger from "../../logger/logger"
import MovieCard from "../MovieCard/MovieCard"
import { IMovie } from "../../models/movie"
import { IActor } from "../../models/actor"
import { apiGetActor, apiMoviesForActor, apiGetActorProfilePic } from "../../handlers/api/actor"
import { RouteComponentProps } from "react-router-dom"
import { Card  } from "semantic-ui-react"
import {ButtonGroup, Button, Container, Row, Col, Image} from "react-bootstrap"

type RouteParams = { actorId: string }

enum MovieSortOption {
  Name = "name",
  Date = "date",
}

let sortOption = MovieSortOption.Name

const ActorMovieList = ({ match }: RouteComponentProps<RouteParams>) => {

  const [ movies, setMovies ] = useState<IMovie[]>([])
  const [ actor, setActor ] = useState<IActor>()
  const [ profilePic, setProfilePic] =  useState<string>()

  useEffect(() => {
    Promise.all([
      getMovies(match.params.actorId),
      getActor(match.params.actorId),
      getProfilePic(match.params.actorId),
    ]).catch(e => console.log("ActorMovieList::useEffect::Failed to fetch actor or movies for actor id:", match.params.actorId, e))
  }, [] )

  const getMovies = async (actorId: string): Promise<void> => {
    let mvs: IMovie[] = []
    if (movies.length === 0) {
      try {
        mvs = await apiMoviesForActor(actorId)
      } catch (error) {
        logger.error("ActorMovieList::Failed to get movies for actor:", actorId)
      }
    } else {
      mvs = [ ...movies ]
    }

    switch (sortOption) {
      case MovieSortOption.Name:
        mvs.sort((m1, m2) => {
          return m1.name.localeCompare(m2.name)
        })
        break
      case MovieSortOption.Date:
        mvs.sort((m1, m2) => {
          return m2.updated.getTime() - m1.updated.getTime()
        })
        break
    }

    setMovies(mvs)
  }

  const getProfilePic = async (actorId: string): Promise<void> => {
    let blob: Blob
    try {
      blob = await apiGetActorProfilePic(actorId)
    } catch (error) {
      console.log("getProfilePic::Failed to get profile pic for actor:", actorId, error)
      return
    }

    const url = URL.createObjectURL(blob)
    setProfilePic(url)
    console.log("set profile pic to:", url)
  }

  const getActor = async (actorId: string): Promise<void> => {
    let act: IActor

    try {
      act = await apiGetActor(actorId)
    } catch (error) {
      console.log("getActor::Failed to get actor for actor id:", actorId, error)
      return
    }

    setActor(act)
  }

  const toggleSortName = async (): Promise<void> => {
    console.log("toggleSortName::sort option:", sortOption)
    if (sortOption === MovieSortOption.Name) {
      return
    }

    sortOption = MovieSortOption.Name

    await getMovies(match.params.actorId)
  }

  const toggleSortDate = async (): Promise<void> => {
    console.log("toggleSortDate::sort option:", sortOption)

    if (sortOption === MovieSortOption.Date) {
      return
    }

    sortOption = MovieSortOption.Date

    await getMovies(match.params.actorId)
  }

  const handleMovieUpdated = (movie: IMovie): void => {
    const mvs = [ ...movies ]
    const index = mvs.findIndex(m => m.id === movie.id)

    if (index !== -1) {
      mvs[index] = movie
      setMovies(mvs)
    }
  }

  return (
    <Container fluid>
      <Container fluid>
          <Row>
            <Col className={"actor-list-profile-pic-col"} md={2}><Image className="actor-list-profile-pic" src={profilePic} /></Col>
            <Col>{`${actor?.displayName()} ${actor?.movieIds.length} Movies`}</Col>
          </Row>
      </Container>
      <div className="actor-movie-button-container">
        <ButtonGroup>
          <Button
            variant={sortOption === MovieSortOption.Name ? "primary" : "secondary"}
            active={sortOption === MovieSortOption.Name}
            onClick={toggleSortName}
          >
            Name
          </Button>
          <Button
            variant={sortOption === MovieSortOption.Date ? "primary" : "secondary"}
            active={sortOption === MovieSortOption.Date}
            onClick={toggleSortDate}
          >
            Date
          </Button>
        </ButtonGroup>
      </div>
      <Card.Group>
        {
          movies.map(m => <MovieCard key={m.id} movie={m} movieUpdated={handleMovieUpdated} /> )
        }
      </Card.Group>
    </Container>
  )
}

export default ActorMovieList
