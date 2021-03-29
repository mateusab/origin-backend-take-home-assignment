import { InsuranceStatusEnum } from 'src/modules/insurance/enums/InsuranceStatusEnum'

export abstract class Insurance {
  score: number
  status: InsuranceStatusEnum

  constructor(
    score = 0,
    status: InsuranceStatusEnum = InsuranceStatusEnum.INELIGIBLE,
  ) {
    this.score = score
    this.status = status
  }

  increase = (points: number): number => (this.score += points)

  decrease = (points: number): number => (this.score -= points)

  defineFinalScore(): InsuranceStatusEnum {
    if (this.status !== InsuranceStatusEnum.INELIGIBLE) {
      if (this.score <= 0) {
        return (this.status = InsuranceStatusEnum.ECONOMIC)
      } else if (this.score >= 1 && this.score <= 2) {
        return (this.status = InsuranceStatusEnum.REGULAR)
      } else if (this.score >= 3) {
        return (this.status = InsuranceStatusEnum.RESPONSIBLE)
      }
    }
  }
}
