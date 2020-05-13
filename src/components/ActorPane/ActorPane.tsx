import logger from "../../logger/logger"
import ActorList from "./ActorList"
import SearchBar from "../SearchBar/SearchBar"
import React, { useState, useEffect } from "react"
import { IActor } from "../../models/actor"
import {
  apiGetAllActors,
  apiSearchActorsWithName
} from "../../handlers/api/actor"

const ActorPane = () => {
  const [ actors, setActors ] = useState<IActor[]>([])
  const [ searchText, setSearchText ] = useState("")

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
      console.log("MovieModal::getActorsForName Failed to fetch actor(s) with name:", text, error)
      return
    }

    console.log("Got # actors:", acts.length)

    setActors(acts)
  }

  const getActors = async () => {
    let acts: IActor[] = []
    try {
      acts = await apiGetAllActors()
    } catch (error) {
      logger.error("ActorPane::Could not get all actors. Got error", error)
    } finally {
      setActors(acts)
    }
  }

  const actorSelected = (actor: IActor): void => {
    console.log("Got selected actor:", actor)
  }

  return (
    <div className="actor-pane">
      <SearchBar placeholder={"search..."} change={searchTextChanged} />
      <ActorList actors={actors} actorSelected={actorSelected}/>
    </div>
  )
}

export default ActorPane
