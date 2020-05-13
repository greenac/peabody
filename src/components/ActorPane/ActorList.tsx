import React, {SyntheticEvent} from "react"
import { IActor } from "../../models/actor"
import { List, ListItemProps } from "semantic-ui-react"
import logger from "../../logger/logger"

interface IActorListProps {
  actors: IActor[]
  actorSelected: (actor: IActor) => void
}

interface IActorMap { [ id: string ]: IActor }

const ActorList = (props: IActorListProps) => {
  const { actors, actorSelected } = props

  const actorMap: IActorMap = {}

  for (const actor of actors) {
    actorMap[actor.id] = actor
  }

  const actorClicked = (e: SyntheticEvent, props: ListItemProps): void => {
    const { id } = props
    console.log("Actor clicked called", id)
    const actor = actorMap[id]
    if (!actor) {
      logger.warn("ActorList::actorClicked no actor with id:", id)
      return
    }

    actorSelected(actor)
  }

  return (
    <List relaxed>
      {
        actors.map((a: IActor) => {
          return (
            <List.Item as="a" key={a.id} id={a.id} onClick={actorClicked}>
              <List.Icon name="user outline" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{a.fullName()}</List.Header>
              </List.Content>
            </List.Item>
          )
        })
      }
    </List>
  )
}

export default ActorList
