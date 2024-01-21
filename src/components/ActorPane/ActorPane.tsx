import React, { useState, useEffect } from "react"
import logger from "../../logger/logger"
import ActorList from "./ActorList"
import SearchBar from "../SearchBar/SearchBar"
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll"
import { IActor } from "../../models/actor"
import { useSearchParams } from "react-router-dom"
import {
  apiRecentActors,
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
  const [ searchParams, setSearchParams ] = useSearchParams()

  useEffect(() => {
    console.log("use effect with no args will look for text", getSearchParamText(), "at page:", getSearchParamPage())
    getActors(getSearchParamText(), getSearchParamPage()).catch(e => console.log("error getting actors with blank string", e))
  }, [])

  useEffect(() => {
    console.log("use effect text changed:", getSearchParamText(), "at page:", getSearchParamPage())
    getActors(getSearchParamText(), getSearchParamPage()).catch(e => console.log("error getting actors with blank string", e))
  }, [ searchParams ])

  const textChanged = (text: string): void => {
    setSearchParams({ q: text, page: `${0}` })
  }

  const fetchNext = async (p: number): Promise<void> => {
    setSearchParams({ q: getSearchParamText(), page: `${p}` })
  }

  const getSearchParamText = (): string => {
    return searchParams.get("q") || ""
  }

  const getSearchParamPage = (): number => {
    return Number(searchParams.get("page")) || 0
  }

  const getActors = async (searchText: string, pageToLoad: number): Promise<void> => {
    console.log("getting actor for page to load:", pageToLoad, "search text:", searchText)
    let acts: IActor[] = []
    try {
      switch (sortDirection) {
        case ActorPaneSortDirection.Name:
          let res: IPaginatedActorResponse
          res = await apiPaginatedActors(searchText, pageToLoad)
          if (pageToLoad === 0) {
            setActors([ ...res.actors ])
          } else {
            setActors([ ...actors, ...res.actors ])
          }

          break
        case ActorPaneSortDirection.Date:
          acts = await apiRecentActors()
          setActors(acts)
          break
      }
    } catch (error) {
      logger.error("ActorPane::Could not get actors. Got error", error)
    }
  }

  return (
      <div className="actor-pane">
         <div className="search-bar">
           <SearchBar placeholder={"Search..."} initialText={searchParams.get("q") || undefined} change={textChanged} />
        </div>
        <InfiniteScroll itemsPerPage={100} fetchNext={fetchNext} itemsToDisplay={actors.length}>
          <ActorList actors={actors} />
        </InfiniteScroll>
      </div>
  )
}

export default ActorPane
