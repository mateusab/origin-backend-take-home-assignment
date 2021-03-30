import { Insurance } from 'src/modules/insurance/domain/structure/Insurance'

export class AutoInsurance extends Insurance {
  increaseIfVehicleWasProducedInLastFiveYears(points: number): number {
    if (this.user.vehicle.wasVehicleProducedInLastFiveYears()) {
      return (this.score += points)
    }
  }
}
