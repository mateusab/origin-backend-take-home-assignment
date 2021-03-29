import { InsuranceStatusEnum } from 'src/modules/insurance/enums/InsuranceStatusEnum'

export abstract class Insurance {
  score: number
  status: InsuranceStatusEnum

  constructor(
    score = 0,
    status: InsuranceStatusEnum = InsuranceStatusEnum.REGULAR,
  ) {
    this.score = score
    this.status = status
  }

  increase(points: number): number {
    return (this.score += points)
  }

  decrease(points: number): number {
    return (this.score -= points)
  }

  turnIntoIneligible = (): InsuranceStatusEnum =>
    (this.status = InsuranceStatusEnum.INELIGIBLE)

  defineFinalScore(): InsuranceStatusEnum {
    if (this.status !== InsuranceStatusEnum.INELIGIBLE) {
      if (this.score <= 0) {
        this.status = InsuranceStatusEnum.ECONOMIC
      } else if (this.score >= 1 && this.score <= 2) {
        this.status = InsuranceStatusEnum.REGULAR
      } else if (this.score >= 3) {
        this.status = InsuranceStatusEnum.RESPONSIBLE
      }
    }
    return this.status
  }
}
