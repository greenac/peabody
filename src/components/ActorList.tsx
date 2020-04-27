import React, { useState, useEffect } from "react"
import { IActor } from "../models/actor"
import logger from "../logger/logger"
import { apiGetAllActors } from "../handlers/api"

const ActorList = () => {
  const [ actors, setActors ] = useState<IActor[]>([])

  useEffect(() => {
    logger.log("Loaded the actor list component...you can do react!!")
  })

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
    <div className="actor-list">
      <button onClick={getActors}>Get dem Actors</button>
      <ul>
        {
          actors.map(act => {
            return <li key={act.fullName()}>{act.fullName()}</li>
          })
        }
      </ul>
    </div>
  )
}

export default ActorList
