import React from "react"
import { Container, Button, Col, Row } from "react-bootstrap"

interface AlphabetSearchProps {
    letterSelected: (selected: string) => void
}

const alphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
]

const AlphabetSearch = (props: AlphabetSearchProps) => {
    const { letterSelected } = props

    const clicked = (event: React.MouseEvent<HTMLButtonElement>) => {
       letterSelected(event.currentTarget.id || "A")
    }

    return (
        <Container fluid>
            {
                alphabet.map(letter => {
                    return (
                        <span className={"alphabet-search-button-wrapper"}>
                            <Button id={letter} onClick={clicked}>{letter}</Button>
                        </span>
                    )
                })
            }
        </Container>
    )
}

export default AlphabetSearch
