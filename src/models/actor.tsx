import logger from "../logger/logger"

export interface IActorData {
  identifier: string
  collectionType: string
  firstName: string
  lastName: string
  middleName: string
}

export interface IActor extends IActorData {
  fullName(): string
  // getIdentifier(): string
  // getFirstName(): string
  // getMiddleName(): string
  // getLastName(): string
}

export class Actor implements IActor {
  public firstName: string
  public lastName: string
  public middleName: string
  public identifier: string
  public collectionType: string

  constructor(actor: IActorData) {
    this.firstName = actor.firstName
    this.lastName = actor.lastName
    this.middleName = actor.middleName
    this.collectionType = actor.collectionType
    this.identifier = actor.identifier
  }

  getFirstName(): string {
    return this.firstName
  }

  getMiddleName(): string {
    return this.middleName
  }

  getLastName(): string {
    return this.lastName
  }

  getIdentifier(): string {
    return this.identifier
  }

  fullName(): string {
    let name: string
    if (this.middleName !== "") {
      name = `${this.firstName} ${this.middleName} ${this.lastName}`
    } else {
      name = `${this.firstName} ${this.lastName}`
    }

    logger.log("fullName() called. name =", name)

    return name
  }
}
