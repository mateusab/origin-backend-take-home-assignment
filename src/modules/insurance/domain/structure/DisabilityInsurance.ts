import { Insurance } from 'src/modules/insurance/domain/structure/Insurance'

export class DisabilityInsurance extends Insurance {
  decreaseIfUserIsMarried(points: number): number {
    return (this.score -= points)
  }
}
