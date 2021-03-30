import { MaritalStatusEnum } from 'src/modules/user/enums/MaritalStatusEnum'
import { House } from 'src/modules/house/domain/structure/House'
import { Insurance } from 'src/modules/insurance/domain/structure/Insurance'
import { Vehicle } from 'src/modules/vehicle/Vehicle'

export class User {
  age: number
  dependents: number
  income: number
  marital_status: MaritalStatusEnum
  risk_answers: boolean[]
  house: House
  vehicle?: Vehicle
  insurances: Insurance[]

  constructor(
    age: number,
    dependents: number,
    income: number,
    marital_status: MaritalStatusEnum,
    risk_answers: boolean[],
    house?: House,
    vehicle?: Vehicle,
  ) {
    this.age = age
    this.dependents = dependents
    this.income = income
    this.marital_status = marital_status
    this.risk_answers = risk_answers
    this.house = house
    this.vehicle = vehicle
  }

  calculateBaseScore = (): number =>
    this.risk_answers.filter(risk_answer => risk_answer === true).length

  hasVehicle = (): boolean => (this.vehicle ? true : false)

  isOlderThanSixty = (): boolean => this.age > 60

  hasHouse = (): boolean => (this.house ? true : false)

  hasIncome = (): boolean => (this.income > 0 ? true : false)

  hasDependents = (): boolean => this.dependents > 0

  isMarried = (): boolean => this.marital_status === MaritalStatusEnum.MARRIED
}
