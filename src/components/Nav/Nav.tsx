import React, {SyntheticEvent, useState} from "react"
import { Link } from "react-router-dom"
import {
  Menu,
  MenuItemProps,
} from "semantic-ui-react"

enum Page {
  UnknownMovies = "unknown-movies",
  Actors = "actors",
}

const Nav = () => {
  const [ activeItem, setActiveItem ] = useState(Page.UnknownMovies)

  const itemClicked = (e: SyntheticEvent, props: MenuItemProps):void => {
    const { name } = props

    console.log("item clicked:", name)

    e.preventDefault()

    setActiveItem(name as Page)
  }

  return (
    <div>
      <Menu pointing secondary >
        <Menu.Item
          as={Link}
          to="/movies"
          name={Page.UnknownMovies}
          active={activeItem === Page.UnknownMovies}
          onClick={itemClicked}>
          Movies
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/actors"
          name={Page.Actors}
          active={activeItem === Page.Actors}
          onClick={itemClicked}>
          Actors
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Nav
