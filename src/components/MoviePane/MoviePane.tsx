import React, { useState, useEffect } from "react"
import logger from "../../logger/logger"
import MovieList from "./MovieList"
import InfiniteScroll from "react-infinite-scroll-component"
import { IMovie } from "../../models/movie"
import { apiGetUnknownMovies, IPaginatedMovieResponse } from "../../handlers/api/movie"

const MoviePane = () => {
  const [ movies, setMovies ] = useState<IMovie[]>([])
  const [ page, setPage ] = useState(0)
  const [ hasMore, setHasMore ] = useState(false)

  useEffect(() => {
    getUnknownMovies(0)
      .catch(error => {
        logger.error("Failed to get unknown movies with error:", error)
        setMovies([])
      })
  }, [])

  const getUnknownMovies = async (pageToLoad: number): Promise<void> => {
    let res: IPaginatedMovieResponse
    try {
      res = await apiGetUnknownMovies(pageToLoad)
      if (pageToLoad === 0) {
        setMovies(res.movies)
      } else {
        console.log("Total number of movies fetched is:", [ ...movies, ...res.movies ].length, "for page:", pageToLoad)
        setMovies([ ...movies, ...res.movies ])
      }

      console.log("got response:", res)

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
    const mvs = [ ...movies ]
    const index = mvs.findIndex(m => m.id === movie.id)

    if (index !== -1) {
      mvs[index] = movie
      setMovies(mvs)
    }
  }

  const refreshMovies = async (): Promise<void> => {
    setPage(page)
    setHasMore(true)
    setMovies([])
    await getUnknownMovies(page)
  }

  const loadMore = async (): Promise<void> => {
    await getUnknownMovies(page + 1)
  }

  return (
    <div className="actor-pane">
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <MovieList movies={movies} onModalClose={refreshMovies} movieUpdated={handleMovieUpdated} />
      </InfiniteScroll>
    </div>
  )
}

export default MoviePane
