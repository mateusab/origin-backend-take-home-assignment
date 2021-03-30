import { User } from 'src/modules/user/domain/structure/User'
import { InsuranceStatusEnum } from 'src/modules/insurance/enums/InsuranceStatusEnum'

export abstract class Insurance {
  user: User
  score: number

  constructor(user: User, score = 0) {
    this.user = user
    this.score = score
  }

  decreaseIfIsOlderThanSixty(points: number): number {
    if (this.user.age > 60) {
      return (this.score -= points)
    }
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

  increase(points: number): number {
    return (this.score += points)
  }

  decrease(points: number): number {
    return (this.score -= points)
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
