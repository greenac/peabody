import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

const Menu = () => {
return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Peabody</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">
            <Link className={"nav-link"} to="/actors">
              Actors
            </Link>
          </Nav.Link>
          <Nav.Link href="#home">
            <Link className={"nav-link"} to="/actors/recent">
              Recent Actors
            </Link>
          </Nav.Link>
          <Nav.Link href="#home">
            <Link className={"nav-link"} to="/movies">
              Untagged Movies
            </Link>
          </Nav.Link>
          <Nav.Link href="#home">
            <Link className={"nav-link"} to="/movies/recent">
              Recent Movies
            </Link>
          </Nav.Link>
          <Nav.Link href="#home">
            <Link className={"nav-link"} to="/movies/search">
              Search Movies
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
