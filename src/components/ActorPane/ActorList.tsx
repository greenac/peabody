import React from "react"
import "semantic-ui-css/semantic.min.css"
import { List } from "semantic-ui-react"
import { IActor } from "../../models/actor"

interface IActorListProps {
  actors: IActor[]
}

const ActorList = (props: IActorListProps) => {
  const { actors } = props

  return (
    <List divided relaxed>
      {
        actors.map((a: IActor) => {
          return (
            <List.Item key={a.identifier}>
              <List.Icon name='github' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>{a.identifier}</List.Header>
                <List.Description as='a'>{a.fullName()}</List.Description>
              </List.Content>
            </List.Item>
          )
        })
      }
    </List>
  )
}

export default ActorList
