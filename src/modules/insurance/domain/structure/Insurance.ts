import { InsuranceStatusEnum } from 'src/modules/insurance/enums/InsuranceStatusEnum'

export abstract class Insurance {
  score: number
  status: InsuranceStatusEnum

  constructor(score = 0) {
    this.score = score
  }

  increase(points: number): number {
    return (this.score += points)
  }

  decrease(points: number): number {
    return (this.score -= points)
  }
}
