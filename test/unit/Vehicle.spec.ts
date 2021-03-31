import { Vehicle } from 'src/domain/vehicle/Vehicle'

describe('Vehicle', () => {
  describe('wasVehicleProducedInLastFiveYears', () => {
    describe('vehicle was produced in the last five years', () => {
      it('returns true', () => {
        const vehicle = new Vehicle(2018)

        const response = vehicle.wasVehicleProducedInLastFiveYears()

        expect(response).toEqual(true)
      })
    })

    describe('vehicle was not produced in the last five years', () => {
      it('returns false', () => {
        const vehicle = new Vehicle(2000)

        const response = vehicle.wasVehicleProducedInLastFiveYears()

        expect(response).toEqual(false)
      })
    })
  })
})
