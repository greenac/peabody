import React from "react"
import { Link } from "react-router-dom"


const Nav = () => {
  return (
    <nav >
      <ul className="nav-links">
        <Link to="/actors">
          <li>Actors</li>
        </Link>
        <Link to="/actors/recent">
          <li>Recent Actors</li>
        </Link>
        <Link to="/movies">
          <li>Untagged Movies</li>
        </Link>
        <Link to="/movies/recent">
          <li>Recent Movies</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
