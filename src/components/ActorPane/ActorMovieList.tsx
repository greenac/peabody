import React, { SyntheticEvent } from "react"
import { IActor } from "../../models/actor"
import { List, ListItemProps } from "semantic-ui-react"

interface IActorListProps {
  actor: IActor
}

const ActorMovieList = (props: IActorListProps) => {
  const { actor } = props

  const actorClicked = (e: SyntheticEvent, props: ListItemProps): void => {
    const { id } = props
    console.log("Actor clicked called", id)
  }

  return (
    <List relaxed>
      {
        
      }
    </List>
  )
}

export default ActorMovieList
