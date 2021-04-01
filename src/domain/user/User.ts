import { MaritalStatusEnum } from 'src/domain/user/MaritalStatusEnum'
import { Insurance } from 'src/domain/insurance/Insurance'
import { Vehicle } from 'src/domain/vehicle/Vehicle'
import { House } from 'src/domain/house/House'

export class User {
  age: number
  dependents: number
  income: number
  marital_status: MaritalStatusEnum
  risk_questions: boolean[]
  house: House
  vehicle?: Vehicle
  insurances: Insurance[]

  constructor(
    age: number,
    dependents: number,
    income: number,
    marital_status: MaritalStatusEnum,
    risk_questions: boolean[],
    house?: House,
    vehicle?: Vehicle,
  ) {
    this.age = age
    this.dependents = dependents
    this.income = income
    this.marital_status = marital_status
    this.risk_questions = risk_questions
    this.house = house
    this.vehicle = vehicle
  }

  calculateBaseScore = (): number =>
    this.risk_questions.filter(risk_question => risk_question).length

  hasVehicle = (): boolean => this.vehicle.year !== undefined

  isOlderThanSixty = (): boolean => this.age > 60

  hasHouse = (): boolean => this.house.ownership_status !== undefined

  hasIncome = (): boolean => this.income > 0

  hasDependents = (): boolean => this.dependents > 0

  isMarried = (): boolean => this.marital_status === MaritalStatusEnum.MARRIED
}
