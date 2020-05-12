import React, { MouseEvent } from "react"
import { IActor } from "../../models/actor"
import { List, Button } from "semantic-ui-react"

interface IMovieModalListItemProps {
  actor: IActor
  onClick: (id :string) => void
}

const MovieModalListItem = (props: IMovieModalListItemProps) => {
  const { actor, onClick } = props

  const clicked = (evt: MouseEvent): void => {
    evt.preventDefault()

    onClick(actor.id)
  }

  return (
      <List.Item key={actor.id}>
          <Button onClick={clicked}>
            {actor.fullName()}
          </Button>
      </List.Item>
  )
}

export default MovieModalListItem
