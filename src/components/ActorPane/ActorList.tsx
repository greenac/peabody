import React, {SyntheticEvent} from "react"
import { IActor } from "../../models/actor"
import { List, ListItemProps } from "semantic-ui-react"

interface IActorListProps {
  actors: IActor[]
  actorSelected: (actor: IActor) => void
}

const ActorList = (props: IActorListProps) => {
  const { actors } = props

  const actorClicked = (e: SyntheticEvent, props: ListItemProps): void => {
    const { id } = props
    console.log("Actor clicked called", id)
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
