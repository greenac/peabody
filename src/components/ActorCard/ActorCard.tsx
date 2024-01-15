import React, { useState, useEffect } from "react"
import moment from "moment"
import { IActor } from "../../models/actor"
import { Card, Button, Container, Row, Col, Image } from "react-bootstrap"
import {apiGetActorProfilePic} from "../../handlers/api/actor"
import { Link } from "react-router-dom"
import defaultProfilePic from "../../images/default-profile-pic.gif"

interface IActorCardProps {
    actor: IActor
}

const localStorageActorPicId = "peabody-actor-pic"

const ActorCard = (props: IActorCardProps) => {
    const { actor } = props
    const [ profilePic, setProfilePic] =  useState<string>()

    useEffect(() => {
        console.log("get profile pic hit for actor:", actor.displayName())
        getProfilePic(actor.id).catch(e => console.log("ActorCard->failed to get profile pic with error:", e))
    }, [ actor ])

    const getProfilePic = async (actorId: string): Promise<void> => {
        let blob = getActorPicFromLocalStorage(actorId)
        if (!!blob) {
            setProfilePic(URL.createObjectURL(blob))
            return
        }

        try {
            blob = await apiGetActorProfilePic(actorId)
        } catch (error) {
            setProfilePic(defaultProfilePic)
            return
        }

        const buf = await blob.arrayBuffer()

        saveActorPicToLocalStorage(actorId, Buffer.from(buf))

        setProfilePic(URL.createObjectURL(blob))
    }

    const getActorPicFromLocalStorage = (actorId: string): Blob | undefined => {
        const picBase64 = localStorage.getItem(makeLocalStorageActorKey(actorId))
        if (!picBase64) {
            return undefined
        }

        return new Blob([ Buffer.from(picBase64, 'base64') ])
    }

    const saveActorPicToLocalStorage= (actorId: string, data: Buffer): void => {
        try {
            localStorage.setItem(makeLocalStorageActorKey(actorId), data.toString("base64"))
        } catch (e) {
            localStorage.clear()
            saveActorPicToLocalStorage(actorId, data)
        }
    }

    const makeLocalStorageActorKey = (actorId: string): string => {
        return `${localStorageActorPicId}-${actorId}`
    }

    return (
        <Card key={`actor-list-card-key-${actor.id}`} style={{ width: '18rem' }}>
            <Card.Header>
                <Container>
                    <Row>
                        <Col md={6}><Image className="actor-card-profile-pic" src={profilePic} /></Col>
                        <Col>{actor.displayName()}</Col>
                    </Row>
                </Container>
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
