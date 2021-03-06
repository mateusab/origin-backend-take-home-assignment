import { Insurance } from 'src/domain/insurance/Insurance'

export class AutoInsurance extends Insurance {
  increaseIfVehicleWasProducedInLastFiveYears(points: number): number {
    if (this.user.vehicle.wasVehicleProducedInLastFiveYears()) {
      return (this.score += points)
    }
  }
}
