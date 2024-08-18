import React, {useEffect} from "react"
import { IActor } from "../../models/actor"
import { CardGroup } from "semantic-ui-react"
import ActorCard from "../ActorCard/ActorCard"

interface IActorListProps {
  actors: IActor[],
}

const ActorList = (props: IActorListProps) => {
  const { actors } = props

  useEffect(() => {
    console.log("debug: actor list got number of actors to render:", actors.length)
  }, [actors])

  return (
    <CardGroup>
        {
          actors.map((a: IActor) => {
            return (
                <ActorCard key={`actor-card-key-${a.id}`} actor={a} />
            )
          })
        }
    </CardGroup>
  )
}

export default ActorList
