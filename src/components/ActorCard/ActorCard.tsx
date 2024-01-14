import React, { useState, useEffect } from "react"
import moment from "moment"
import { IActor } from "../../models/actor"
import { Card, Button } from "react-bootstrap"
import {apiGetActorProfilePic} from "../../handlers/api/actor"
import {Link} from "react-router-dom"

interface IActorCardProps {
    actor: IActor
}

const ActorCard = (props: IActorCardProps) => {
    const { actor } = props
    const [ profilePic, setProfilePic] =  useState<string>()
    
    useEffect(() => {
        getProfilePic(actor.id).catch(e => console.log("ActorCard->failed to get profile pic with error:", e))
    }, [])

    const getProfilePic = async (actorId: string): Promise<void> => {
        let blob: Blob
        try {
            blob = await apiGetActorProfilePic(actorId)
        } catch (error) {
            console.log("getProfilePic::Failed to get profile pic for actor:", actorId, error)
            return
        }

        const url = URL.createObjectURL(blob)
        setProfilePic(url)
        console.log("set profile pic to:", url)
    }

    return (
        <Card key={`actor-list-card-key-${actor.id}`} style={{ width: '18rem' }}>
            <Card.Header>
                <img src={profilePic} />
                {actor.displayName()}
            </Card.Header>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                    {`Updated ${moment(actor.updated).format("hh:mm:ss, MMMM Do YYYY")}`}
                </Card.Subtitle>
                <Card.Text>
                    {`Number Of Movies ${actor.movieIds.length}`}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link to={`/actors/movies/${actor.id}`}>
                    <Button id={actor.id}>
                        Movies
                    </Button>
                </Link>
            </Card.Footer>
        </Card>
    )
}

export default ActorCard
