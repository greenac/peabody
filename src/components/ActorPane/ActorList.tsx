import React from "react"
import { IActor } from "../../models/actor"
import { CardGroup } from "semantic-ui-react"
import ActorCard from "../ActorCard/ActorCard"

interface IActorListProps {
  actors: IActor[],
}

const ActorList = (props: IActorListProps) => {
  const { actors } = props

  return (
    <CardGroup>
        {
          actors.map((a: IActor) => {
            return (
                <ActorCard actor={a}></ActorCard>
            )
          })
        }
    </CardGroup>
  )
}

export default ActorList
