import logger from "../../logger/logger"
import ActorList from "./ActorList"
import ActorMovieList from "./ActorMovieList"
import SearchBar from "../SearchBar/SearchBar"
import React, { useState, useEffect } from "react"
import { IActor } from "../../models/actor"
import {
  apiGetAllActorsWithMovies,
  apiSearchActorsWithName,
} from "../../handlers/api/actor"
import {
  Grid,
  GridColumn,
} from "semantic-ui-react"

const ActorPane = () => {
  const [ actors, setActors ] = useState<IActor[]>([])
  const [ searchText, setSearchText ] = useState("")
  const [ movieIds, setMovieIds ] = useState<string[]>([])

  useEffect(() => {
    getActors().then(() => { console.log("got actors") })
  }, [])

  const searchTextChanged = (text: string): void => {
    logger.log("search text changed to:", text)
    setSearchText(text)

    if (text.length === 0) {
      getActors()
    } else {
      textChanged(text)
    }
  }

  const textChanged = async (text: string): Promise<void> => {
    let acts: IActor[]
    try {
      acts = await apiSearchActorsWithName(text)
    } catch (error) {
      // TODO: show error to user
      logger.error("MovieModal::getActorsForName Failed to fetch actor(s) with name:", text, error)
      return
    }

    logger.log("Got # actors:", acts.length, "movie ids:", movieIds)

    setActors(acts)
  }

  const getActors = async () => {
    let acts: IActor[] = []
    try {
      acts = await apiGetAllActorsWithMovies()
    } catch (error) {
      logger.error("ActorPane::Could not get all actors. Got error", error)
    } finally {
      setActors(acts)
    }

    if (acts.length > 0) {
      setMovieIds([])
    }
  }

  const actorSelected = (actor: IActor): void => {
    logger.log("Got selected actor:", actor, "ids:", actor.movieIds)
    setMovieIds(actor.movieIds)
  }

  return (
    <div className="actor-pane">
      <SearchBar placeholder="Search..." change={searchTextChanged} />
      <Grid columns={2}>
        <GridColumn>
          <ActorList actors={actors} actorSelected={actorSelected} />
        </GridColumn>
        <GridColumn>
          <ActorMovieList movieIds={movieIds} />
        </GridColumn>
      </Grid>
    </div>
  )
}

export default ActorPane
