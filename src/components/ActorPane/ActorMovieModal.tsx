import React, {useEffect, useState} from "react"
import { IActor } from "../../models/actor"
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  List,
  ListItem,
  ListIcon,
  ListContent,
} from "semantic-ui-react"

interface IActorMovieModalProps {
  shouldOpen: boolean
  actor: IActor
  onClose: (actorId: string) => void
}

const ActorMovieModal = (props: IActorMovieModalProps) => {
  const { shouldOpen, actor } = props

  if (shouldOpen) {
    console.log("ActorMovieModal shouldOpen:", shouldOpen)
  }

  const [ showModal, setShowModal ] = useState(shouldOpen)

  useEffect(() => {
    setShowModal(shouldOpen)
  }, [shouldOpen])

  const closeModal = () => {
    console.log("closing ActorMovieModal")
    setShowModal(false)
  }

  return (
    <Modal open={showModal} header={actor.fullName()} onClose={closeModal}>
      <ModalContent>
        <List selection={true}>
          <ListItem>
            <Button basic={true}>
              <ListIcon name="film" size="large" />
              <ListContent floated={"right"}>thing</ListContent>
            </Button>
          </ListItem>
        </List>
      </ModalContent>
      <ModalActions>
        <Button color="olive">Rocho, Rocho</Button>
        <Button color="red" onClick={closeModal}>Push it good</Button>
      </ModalActions>
    </Modal>
  )
}

export default ActorMovieModal
