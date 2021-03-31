import { Insurance } from 'src/application/domain/insurance/Insurance'

export class LifeInsurance extends Insurance {
  increaseIfUserIsMarried(points: number): number {
    if (this.user.isMarried()) {
      return (this.score += points)
    }
  }
}
