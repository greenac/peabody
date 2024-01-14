import React from "react"
import moment from "moment"
import { IActor } from "../../models/actor"
import { Link } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import { CardGroup } from "semantic-ui-react"

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
              <Card key={`actor-list-card-key-${a.id}`} style={{ width: '18rem' }}>
                <Card.Header>
                  {a.displayName()}
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    {`Updated ${moment(a.updated).format("hh:mm:ss, MMMM Do YYYY")}`}
                  </Card.Subtitle>
                  <Card.Text>
                    {`Number Of Movies ${a.movieIds.length}`}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/actors/movies/${a.id}`}>
                    <Button id={a.id}>
                      Movies
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            )
          })
        }
    </CardGroup>
  )
}

export default ActorList
