import { IActorData, IActor, Actor } from "./actor"

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
  updated: Date
  actorIds: string[]
  actors: IActorData[]
}

export interface IMovie extends IMovieData {
  basePath: () => string
  getActors: () => IActor[]
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
  public updated: Date
  public actorIds: string[]
  public actors: IActorData[]

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
    this.updated = movie.updated
    this.actorIds = movie.actorIds
    this.actors = movie.actors
  }

  basePath(): string {
    const parts = this.path.split("/")
    return parts.slice(0, parts.length - 1).join("/")
  }

  getActors(): IActor[] {
    return this.actors.map(a => new Actor(a))
  }
}
