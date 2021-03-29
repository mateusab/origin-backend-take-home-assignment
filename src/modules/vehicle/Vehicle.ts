export class Vehicle {
  year: number

  constructor(year?: number) {
    this.year = year
  }

  public wasVehicleProducedInLastFiveYears(): boolean {
    const actualYear = new Date().getFullYear()
    return actualYear - this.year <= 5
  }
}
