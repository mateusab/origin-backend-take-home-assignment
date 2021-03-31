import { Insurance } from 'src/domain/insurance/Insurance'

export class LifeInsurance extends Insurance {
  increaseIfUserIsMarried(points: number): number {
    if (this.user.isMarried()) {
      return (this.score += points)
    }
  }
}
