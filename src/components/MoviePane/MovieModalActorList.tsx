import React from "react"
import { IActor } from "../../models/actor"
import { ListGroup, Button } from "react-bootstrap"

interface MovieModalActorListProps {
  actors: IActor[]
  onClick: (id :string) => void
}

const MovieModalActorList = ({ actors, onClick }: MovieModalActorListProps) => {
  return (
    <ListGroup horizontal>
      {
        actors.map(actor => {
          return (
            <Button
                key={`movie-modal-actor-list-button-${actor.id}`}
                variant={"outline-primary"}
                className={"movie-modal-actor-list-button"}
                onClick={() => onClick(actor.id)}
            >
              {actor.fullName()}
            </Button>
          )
        })
      }
    </ListGroup>
  )
}

export default MovieModalActorList
