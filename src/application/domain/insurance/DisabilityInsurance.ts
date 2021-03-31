import { Insurance } from 'src/application/domain/insurance/Insurance'

export class DisabilityInsurance extends Insurance {
  decreaseIfUserIsMarried(points: number): number {
    return (this.score -= points)
  }
}
