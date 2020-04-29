import React, { useState } from "react"
import { IActor } from "../../models/actor"
import logger from "../../logger/logger"
import { apiGetAllActors } from "../../handlers/api"
import ActorList from "./ActorList"
import SearchBar from "../SearchBar/SearchBar"
import Button from "semantic-ui-react"

const ActorPane = () => {
  const [ actors, setActors ] = useState<IActor[]>([])

  const searchTextChanged = (text: string): void => {
    logger.log("search text changed to:", text)
  }

  const searchTextSubmitted = (text: string): void => {
    logger.log("search text submitted:", text)
  }

  const getActors = async () => {
    let acts: IActor[] = []
    try {
      acts = await apiGetAllActors()
    } catch (error) {
      logger.error("ActorList::Could not get all actors. Got error", error)
    } finally {
      setActors(acts)
    }
  }

  return (
    <div className="actor-pane">
      <SearchBar placeholder={"search"} label={"hello"} change={searchTextChanged} submit={searchTextSubmitted}>something</SearchBar>
      <button onClick={getActors}>Get dem Actors</button>
      <ActorList actors={actors} />
    </div>
  )
}

export default ActorPane
