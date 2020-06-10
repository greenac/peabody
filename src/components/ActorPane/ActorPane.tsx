import React, { useState, useEffect } from "react"
import logger from "../../logger/logger"
import ActorList from "./ActorList"
import SearchBar from "../SearchBar/SearchBar"
import { IActor } from "../../models/actor"

import {
  apiGetAllActorsWithMovies, apiRecentActors,
  apiSimpleSearchActorsWithNameAndMovies,
} from "../../handlers/api/actor"

export enum ActorPaneSortDirection {
  Date = "date",
  Name = "name",
}

interface IActorPaneProps {
  sortDirection: ActorPaneSortDirection
}

const ActorPane = (props: IActorPaneProps) => {
  const { sortDirection } = props
  const [ actors, setActors ] = useState<IActor[]>([])

  useEffect(() => {
    getActors().then(() => { console.log("got actors") })
  }, [])

  const searchTextChanged = (text: string): void => {
    if (sortDirection !== ActorPaneSortDirection.Name) {
      return
    }

    logger.log("search text changed to:", text)

    if (text.length === 0) {
      getActors()
    } else {
      textChanged(text)
    }
  }

  const textChanged = async (text: string): Promise<void> => {
    if (sortDirection === ActorPaneSortDirection.Name) {
      let acts: IActor[]
      try {
        acts = await apiSimpleSearchActorsWithNameAndMovies(text)
      } catch (error) {
        // TODO: show error to user
        logger.error("MovieModal::getActorsForName Failed to fetch actor(s) with name:", text, error)
        return
      }

      setActors(acts)
    }
  }

  const getActors = async () => {
    let acts: IActor[] = []
    try {
      switch (sortDirection) {
        case ActorPaneSortDirection.Name:
          acts = await apiGetAllActorsWithMovies()
          break
        case ActorPaneSortDirection.Date:
          acts = await apiRecentActors()
          break
      }
    } catch (error) {
      logger.error("ActorPane::Could not get actors. Got error", error)
    } finally {
      setActors(acts)
    }
  }

  return (
    <div className="actor-pane">
      <div className="search-bar">
        <SearchBar placeholder="Search..." change={searchTextChanged} />
      </div>
      <ActorList actors={actors} />
    </div>
  )
}

export default ActorPane
