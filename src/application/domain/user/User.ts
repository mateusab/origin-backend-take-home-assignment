import { MaritalStatusEnum } from 'src/application/domain/user/MaritalStatusEnum'
import { Insurance } from 'src/application/domain/insurance/Insurance'
import { Vehicle } from 'src/application/domain/vehicle/Vehicle'
import { House } from 'src/application/domain/house/House'

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
    this.risk_answers.filter(risk_answer => risk_answer).length

  hasVehicle = (): boolean => (this.vehicle ? true : false)

  isOlderThanSixty = (): boolean => this.age > 60

  hasHouse = (): boolean => (this.house ? true : false)

  hasIncome = (): boolean => (this.income > 0 ? true : false)

  hasDependents = (): boolean => this.dependents > 0

  isMarried = (): boolean => this.marital_status === MaritalStatusEnum.MARRIED
}
