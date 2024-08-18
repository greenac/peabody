import React, { useState, useEffect } from "react"
import logger from "../../logger/logger"
import ActorList from "./ActorList"
import SearchBar from "../SearchBar/SearchBar"
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll"
import { IActor } from "../../models/actor"
import {v4} from "uuid"
import { useSearchParams } from "react-router-dom"
import {
  apiRecentActors,
  apiPaginatedActors,
  IPaginatedActorResponse,
} from "../../handlers/api/actor"
import AlphabetSearch from "../AlphabetSearch/AlphabetSearch"

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
    console.log("debug: page use effect debug no args in use effect", searchParams.toString(), "p is:", Number(searchParams.get("p")), "evaluated p:", Number(searchParams.get("p")) || 0)
  }, [])

  useEffect(() => {
    console.log("debug: page use effect debug actors args in use effect", searchParams.toString(), "p is:", Number(searchParams.get("p")), "evaluated p:", Number(searchParams.get("p")) || 0)
  }, [ actors ])

  useEffect(() => {
    const requestId = v4()
    console.log("debug: page use effect debug search params args in use effect", searchParams.toString(), "p is:", Number(searchParams.get("p")), "evaluated p:", Number(searchParams.get("p")) || 0, requestId)
    //console.log("use effect text changed:", getSearchParamText(), "at p:", getSearchParamp(), "type:", getSearchParamType())
    //getActors(getSearchParamText(), getSearchParamp(), getSearchParamType()).catch(e => console.log("error debug: page use effect debugs with blank string", e))
    getActors(searchParams.get("q") || "", Number(searchParams.get("p")) || 0, searchParams.get("t") || "", requestId).catch(e => console.log("error debug: page use effect debugs with blank string", e))
  }, [ searchParams ])

  const textChanged = (text: string): void => {
    console.log("debug: page use effect debug text changed:", text)
    setSearchParams({ q: text, p: `${0}`, type: "" })
  }

  const fetchNext = async (p: number): Promise<void> => {
    console.log("debug: fetching next page", p)
    setSearchParams(params => {
      console.log("debug: setting page number with search params:", params.toString(), "to page number:", p)
      params.set("p", `${p}`)
      return params
      //{ q: getSearchParamText(), p: `${p}`, t: getSearchParamType() }
    })
  }

  const getSearchParamText = (): string => {
    return searchParams.get("q") || ""
  }

  const getSearchParamPage = (): number => {
    return Number(searchParams.get("p")) || 0
  }

  const getSearchParamType = (): string => {
    return searchParams.get("t") || ""
  }

  const getActors = async (searchText: string, pToLoad: number, type: string, id: string): Promise<void> => {
    console.log("debug: get actors for p to load:", pToLoad, "type:", type, "search text:", searchText, "id:", id)
    let acts: IActor[] = []
    try {
      switch (sortDirection) {
        case ActorPaneSortDirection.Name:
          let res: IPaginatedActorResponse
          res = await apiPaginatedActors(searchText, pToLoad, type)
          if (pToLoad === 0) {
            acts = [ ...res.actors ]
          } else {
            acts = [ ...actors, ...res.actors ]
          }
          setActors(acts)
          console.log("debug: fetched actors for p to load:", pToLoad, "type:", type, "search text:", searchText, "actors:", acts.length, "id:", id)
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

  const letterSelected = (selectedLetter: string) => {
    console.log("debug: page use effect debug letter selected called")
    setSearchParams({ q: selectedLetter, p: "0", t: "firstName" })
  }

  return (
      <div className="actor-pane">
         <div className="search-bar">
           <SearchBar placeholder={"Search..."} initialText={searchParams.get("q") || undefined} change={textChanged} />
           <AlphabetSearch letterSelected={letterSelected} />
         </div>
        <InfiniteScroll itemsPerPage={100} fetchNext={fetchNext} itemsToDisplay={actors.length} page={getSearchParamPage()}>
          <ActorList actors={actors} />
        </InfiniteScroll>
      </div>
  )
}

export default ActorPane
