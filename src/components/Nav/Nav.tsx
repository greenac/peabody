import React, {SyntheticEvent, useState} from "react"
import { Link } from "react-router-dom"


enum Page {
  Home = "home",
  UnknownMovies = "unknown-movies",
  Actors = "actors",
}

const Nav = () => {
  const [ activeItem, setActiveItem ] = useState(Page.Home)

  // const itemClicked = (e: SyntheticEvent, props: MenuItemProps):void => {
  //   const { name } = props
  //
  //   console.log("item clicked:", name)
  //
  //   e.preventDefault()
  //
  //   setActiveItem(name as Page)
  // }

  return (
    <nav >
      <ul className="nav-links">
        <Link to="/actors">
          <li>Actors</li>
        </Link>
        <Link to="/movies">
          <li>Movies</li>
        </Link>
        <Link to="/movies/date">
          <li>Recent Movies</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
