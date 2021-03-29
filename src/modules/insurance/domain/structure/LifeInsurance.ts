import { Insurance } from 'src/modules/insurance/domain/structure/Insurance'

export class LifeInsurance extends Insurance {
  increaseIfUserIsMarried(points: number): number {
    if (this.user.isMarried()) {
      return (this.score += points)
    }
  }
}
