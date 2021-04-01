import { Insurance } from 'src/domain/insurance/Insurance'

export class DisabilityInsurance extends Insurance {
  decreaseIfUserIsMarried(points: number): number {
    if (this.user.isMarried()) {
      return (this.score -= points)
    }
  }
}
