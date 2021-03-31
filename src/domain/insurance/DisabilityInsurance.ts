import { Insurance } from 'src/domain/insurance/Insurance'

export class DisabilityInsurance extends Insurance {
  decreaseIfUserIsMarried(points: number): number {
    return (this.score -= points)
  }
}
