
export interface IActorData {
  id: string
  identifier: string
  firstName: string
  lastName: string
  middleName: string
}

export interface IActor extends IActorData {
  fullName(): string
}

export class Actor implements IActor {
  public id: string
  public firstName: string
  public lastName: string
  public middleName: string
  public identifier: string

  constructor(actor: IActorData) {
    this.id = actor.id
    this.firstName = actor.firstName
    this.lastName = actor.lastName
    this.middleName = actor.middleName
    this.identifier = actor.identifier
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
}
