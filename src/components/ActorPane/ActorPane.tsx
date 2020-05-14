import logger from "../../logger/logger"
import ActorList from "./ActorList"
import ActorMovieList from "./ActorMovieList"
import SearchBar from "../SearchBar/SearchBar"
import React, { useState, useEffect } from "react"
import { IActor } from "../../models/actor"
import {
  apiGetAllActorsWithMovies,
  apiSearchActorsWithName, apiSearchActorsWithNameAndMovies,
} from "../../handlers/api/actor"


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
      acts = await apiSearchActorsWithNameAndMovies(text)
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
      <ActorList actors={actors}  />
    </div>
  )
}

export default ActorPane
