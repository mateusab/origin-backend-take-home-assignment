import { MaritalStatusEnum } from '@user/enums/MaritalStatusEnum'

export class User {
  age: number
  dependents: number
  income: number
  marital_status: MaritalStatusEnum
  risk_answers: boolean[]

  constructor(
    age: number,
    dependents: number,
    income: number,
    marital_status: MaritalStatusEnum,
    risk_answers: boolean[],
  ) {
    this.age = age
    this.dependents = dependents
    this.income = income
    this.marital_status = marital_status
    this.risk_answers = risk_answers
  }
}
