import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'
import { User } from 'src/domain/user/User'

export abstract class Insurance {
  user: User
  score: number

  constructor(user: User, score = 0) {
    this.user = user
    this.score = score
  }

  decreaseIfAgeIsBetweenThirtyAndForty(points: number): number {
    if (this.user.age >= 30 && this.user.age <= 40) {
      return (this.score -= points)
    }
  }

  decreaseIfAgeIsUnderThirty(points: number): number {
    if (this.user.age < 30) {
      return (this.score -= points)
    }
  }

  decreaseIfIncomeIsAbove200k(points: number): number {
    if (this.user.income > 200000) {
      return (this.score -= points)
    }
  }

  increaseIfHouseIsMortgaged(points: number): number {
    if (this.user.house.isHouseMortgaged()) {
      return (this.score += points)
    }
  }

  increaseIfHasDependents(points: number): number {
    if (this.user.hasDependents()) {
      return (this.score += points)
    }
  }

  defineFinalRiskLine(): InsuranceStatusEnum {
    if (this.score <= 0) {
      return InsuranceStatusEnum.ECONOMIC
    } else if (this.score >= 1 && this.score <= 2) {
      return InsuranceStatusEnum.REGULAR
    } else if (this.score >= 3) {
      return InsuranceStatusEnum.RESPONSIBLE
    }
  }
}
