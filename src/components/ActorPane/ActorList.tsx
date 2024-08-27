import React, {useEffect} from "react"
import { IActor } from "../../models/actor"
import { Card } from "semantic-ui-react"
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
    <Card.Group>
        {
          actors.map((a: IActor) => {
            return (
                <ActorCard key={`actor-card-key-${a.id}`} actor={a} />
            )
          })
        }
    </Card.Group>
  )
}

export default ActorList
