import { capitalizeString } from "../utils/string"

export interface IActorData {
  id: string
  identifier: string
  firstName: string
  lastName: string
  middleName: string
  updated: Date
  movieIds: string[]
}

export interface IActor extends IActorData {
  fullName(): string
  displayName(): string
}

export class Actor implements IActor {
  public id: string
  public identifier: string
  public firstName: string
  public lastName: string
  public middleName: string
  public updated: Date
  public movieIds: string[]

  constructor(actor: IActorData) {
    this.id = actor.id
    this.firstName = actor.firstName
    this.lastName = actor.lastName
    this.middleName = actor.middleName
    this.identifier = actor.identifier
    this.updated = actor.updated
    this.movieIds = actor.movieIds
  }

  fullName(): string {
    let name: string
    if (this.middleName === "") {
      name = `${this.firstName} ${this.lastName}`
    } else {
      name = `${this.firstName} ${this.middleName} ${this.lastName}`
    }

    return name
  }

  displayName(): string {
    const name = this.fullName()
    const names = name.split(" ")
    let capitalizedName = ""
    switch (names.length) {
      case 1:
        capitalizedName = capitalizeString(names[0])
        break
      case 2:
        capitalizedName = `${capitalizeString(names[0])} ${capitalizeString(names[1])}`
        break
      default:
        capitalizedName = `${capitalizeString(names[0])} ${capitalizeString(names[1])} ${capitalizeString(names[2])}`
    }

    return capitalizedName
  }
}
