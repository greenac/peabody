import React, {SyntheticEvent, useEffect, useState} from "react"
import { IActor } from "../../models/actor"
import { List, ListItemProps, Button } from "semantic-ui-react"
import logger from "../../logger/logger"
import ActorMovieModal from "./ActorMovieModal"

interface IActorListProps {
  actors: IActor[]
}

interface IActorMap { [ id: string ]: { actor: IActor , show: boolean }}

const ActorList = (props: IActorListProps) => {
  const { actors } = props

  const [ actorMap, setActorMap ] = useState<IActorMap>({})

  useEffect(() => {
    logger.log("Actor list use effect called with actors:", actors.length)

    resetActorMap()
  }, [actors])


  const resetActorMap = ():void => {
    console.log("resetting actor map")

    const am: IActorMap = {}
    for (const actor of actors) {
      am[actor.id] = { actor, show: false }
    }

    setActorMap({ ...am })
  }

  const actorClicked = (e: SyntheticEvent, props: ListItemProps): void => {
    console.log("Actor map:", actorMap, "actor map length:", Object.keys(actorMap).length, "actor length:", actors.length)

    const { id } = props

    console.log("Actor clicked called", id)

    const actor = actorMap[id].actor
    if (!actor) {
      logger.warn("ActorList::actorClicked no actor with id:", id)
      return
    }

    const am = { ...actorMap }
    am[id].show = true

    console.log("Before set actor map on actor clicked")
    setActorMap(am)
  }

  const onModalClose = (actorId: string): void => {
    console.log("onModalClose")
    resetActorMap()
  }

  return (
    <List relaxed>
      {
        Object.values(actorMap).map((ai: { actor: IActor, show: boolean }) => {
          console.log("rendering actor list")
          return (
            <List.Item as="a" key={ai.actor.id} id={ai.actor.id} onClick={actorClicked}>
              <List.Icon name="user outline" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{ai.actor.fullName()}</List.Header>
                <List.Description>
                  <Button icon="film" />
                  <ActorMovieModal
                    actor={ai.actor}
                    shouldOpen={ai.show}
                    onClose={onModalClose}
                  />
                </List.Description>
              </List.Content>
            </List.Item>
          )
        })
      }
    </List>
  )
}

export default ActorList
