import React, { useState, useEffect } from "react"
import logger from "../../logger/logger"
import ActorList from "./ActorList"
import SearchBar from "../SearchBar/SearchBar"
import InfiniteScroll from "react-infinite-scroll-component"
import { IActor } from "../../models/actor"
import {
  apiRecentActors,
  apiSimpleSearchActorsWithNameAndMovies,
  apiPaginatedActors,
  IPaginatedActorResponse,
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
  const [ page, setPage ] = useState(0)
  const [ hasMore, setHasMore ] = useState(false)

  useEffect(() => {
    if (actors.length === 0) {
      getActors(0).then(() => { console.log("got actors") })
    }
  }, [])

  const searchTextChanged = (text: string): void => {
    if (sortDirection !== ActorPaneSortDirection.Name) {
      return
    }

    logger.log("search text changed to:", text)

    if (text.length === 0) {
      getActors(0).catch(e => logger.error(e))
    } else {
      textChanged(text).catch(e => logger.error(e))
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

  const getActors = async (pageToLoad: number) => {
    console.log("getting actor for page:", pageToLoad, "page:", page, "sort direction:", sortDirection)
    let acts: IActor[] = []
    try {
      switch (sortDirection) {
        case ActorPaneSortDirection.Name:
          let res: IPaginatedActorResponse
          res = await apiPaginatedActors(pageToLoad)
          console.log("got actor response:", res)
          setActors([ ...actors, ...res.actors ])

          if (page * res.size < res.total) {
            setPage(pageToLoad)
            setHasMore(true)
          } else {
            setHasMore(false)
          }
          break
        case ActorPaneSortDirection.Date:
          console.log("actor pane sorting by date")
          acts = await apiRecentActors()
          setActors(acts)
          break
      }
    } catch (error) {
      logger.error("ActorPane::Could not get actors. Got error", error)
    }
  }

  const loadMore = async () => {
    console.log("loading more actors...")
    await getActors(page + 1)
  }

  return (
    <div className="actor-pane">
      <div className="search-bar">
        <SearchBar placeholder="Search..." change={searchTextChanged} />
      </div>
      <InfiniteScroll
        dataLength={actors.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ActorList actors={actors} />
      </InfiniteScroll>
    </div>
  )
}

export default ActorPane
