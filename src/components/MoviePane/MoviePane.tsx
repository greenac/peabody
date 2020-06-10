import logger from "../../logger/logger"
import MovieList from "./MovieList"
import InfiniteScroll from "react-infinite-scroll-component"
import React, { useState, useEffect } from "react"
import { IMovie } from "../../models/movie"
import { apiGetUnknownMovies, IUnknownMovieResponse } from "../../handlers/api/movie"

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
    let res: IUnknownMovieResponse
    try {
      res = await apiGetUnknownMovies(pageToLoad)
      if (pageToLoad === 0) {
        setMovies(res.movies)
      } else {
        setMovies([ ...movies, ...res.movies ])
      }

      if (page * res.size < res.total) {
        setPage(pageToLoad)
        setHasMore(true)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      logger.error("MoviePane::getUnknownMovies could not get unknown movies. Error", error)
    }


  }

  const refreshMovies = async (): Promise<void> => {
    setPage(0)
    setHasMore(true)
    setMovies([])
    await getUnknownMovies(0)
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
        <MovieList movies={movies} onModalClose={refreshMovies} />
      </InfiniteScroll>
    </div>
  )
}

export default MoviePane
