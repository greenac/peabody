import React from "react"
import moment from "moment"
import { IActor } from "../../models/actor"
import { Link } from "react-router-dom"
import {
  Card,
  Button,
} from "semantic-ui-react"

interface IActorListProps { actors: IActor[] }

const ActorList = (props: IActorListProps) => {
  const { actors } = props

  return (
    <div>
      <Card.Group>
        {
          actors.map((a: IActor) => {
            return (
              <Card key={a.id}>
                <Card.Content>
                  <Card.Header>{a.displayName()}</Card.Header>
                  <Card.Meta>
                    {`Updated ${moment(a.updated).format("hh:mm:ss, MMMM Do YYYY")}`}
                  </Card.Meta>
                  <Card.Description>
                    <strong>{`Number Of Movies ${a.movieIds.length}`}</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Link to={`/actors/movies/${a.id}`}>
                      <Button id={a.id} basic color="blue">
                        Movies
                      </Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            )
          })
        }
      </Card.Group>
    </div>
  )
}

export default ActorList
