import React, {useState, useEffect} from "react"
import logger from "../../logger/logger"
import MovieList from "./MovieList"
import SearchBar from "../SearchBar/SearchBar"
import InfiniteScroll from "react-infinite-scroll-component"
import { IMovie } from "../../models/movie"
import { IPaginatedMovieResponse } from "../../handlers/api/movie"
import { apiSearchMoviesWithName } from "../../handlers/api/movie"

const MovieSearchPane = () => {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    getMovies("", 0)
      .catch(error => {
        logger.error("Failed to get unknown movies with error:", error)
        setMovies([])
      })
  }, [])

  const searchTextChanged = (text: string): void => {
    logger.log("search text changed to:", text)
    getMovies(text, page).catch(e => logger.error(e))
  }

  const textChanged = async (text: string): Promise<void> => {
    let res: IPaginatedMovieResponse
    try {
      res = await apiSearchMoviesWithName(text, page)
    } catch (error) {
      // TODO: show error to user
      logger.error("MovieModal::getActorsForName Failed to fetch actor(s) with name:", text, error)
      return
    }

    setSearchValue(text)
    setMovies(res.movies)
  }

  const getMovies = async (searchText: string, pageToLoad: number): Promise<void> => {
    let res: IPaginatedMovieResponse
    try {
      res = await apiSearchMoviesWithName(searchText, pageToLoad)
      console.log("got movie response: size", res.size, "length:", res.length, "page:", res.page, "total:", res.total)
      if (pageToLoad === 0) {
        console.log("setting movies for zero page:", pageToLoad)
        setMovies(res.movies)
      } else {
        console.log("")
        console.log("Total number of movies fetched is:", [...movies, ...res.movies].length)
        setMovies([...movies, ...res.movies])
      }

      setSearchValue(searchText)

      if (page * res.size < res.total && res.movies.length >= res.size) {
        setPage(pageToLoad)
        setHasMore(true)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      logger.error("MoviePane::getUnknownMovies could not get unknown movies. Error", error)
    }
  }

  const handleMovieUpdated = (movie: IMovie): void => {
    const mvs = [...movies]
    const index = mvs.findIndex(m => m.id === movie.id)

    if (index !== -1) {
      mvs[index] = movie
      setMovies(mvs)
    }
  }

  const refreshMovies = async (): Promise<void> => {
    // setPage(page)
    // setHasMore(true)
    // setMovies([])
    // await getMovies("", page)
    console.log("modal closed")
  }

  const loadMore = async (): Promise<void> => {
    console.log("load more firing for page:", page + 1, "with search value:", searchValue)
    await getMovies(searchValue, page + 1)
  }

  return (
    <div className="actor-pane">
      <div className="search-bar">
        <SearchBar placeholder="Search..." change={searchTextChanged}/>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign: "center"}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <MovieList movies={movies} onModalClose={refreshMovies} movieUpdated={handleMovieUpdated}/>
      </InfiniteScroll>
    </div>
  )
}

export default MovieSearchPane
