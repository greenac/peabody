
export interface IMovieData {
  id: string
  identifier: string
  name: string
  path: string
  studio: string
  series: string
  type: string
  meta: string
  repeatNum: number
  actorIds: string[]
}

export interface IMovie extends IMovieData {
  basePath: () => string
}

export class Movie implements IMovie {
  public id: string
  public identifier: string
  public name: string
  public path: string
  public studio: string
  public series: string
  public type: string
  public meta: string
  public repeatNum: number
  public actorIds: string[]

  constructor(movie: IMovieData) {
    this.id = movie.id
    this.identifier = movie.identifier
    this.name = movie.name
    this.path = movie.path
    this.studio = movie.studio
    this.series = movie.series
    this.type = movie.type
    this.meta = movie.meta
    this.repeatNum = movie.repeatNum
    this.actorIds = movie.actorIds
  }

  basePath(): string {
    const parts = this.path.split("/")
    return parts.slice(0, parts.length - 1).join("/")
  }
}
