import { AutoInsurance } from 'src/domain/insurance/AutoInsurance'
import { User } from 'src/domain/user/User'
import { Vehicle } from 'src/domain/vehicle/Vehicle'
import { createUserMock } from 'test/mocks/UserMock'

describe('AutoInsurance', () => {
  let user: User
  let score: number
  let points: number
  let autoInsurance: AutoInsurance
  describe('increaseIfVehicleWasProducedInLastFiveYears', () => {
    beforeEach(() => {
      score = 0
      points = 1
    })
    describe('vehicle was produced in the last five years', () => {
      it('increase points received by params', () => {
        const vehicle = new Vehicle(2018)
        user = createUserMock({ vehicle })
        autoInsurance = new AutoInsurance(user, score)

        autoInsurance.increaseIfVehicleWasProducedInLastFiveYears(points)

        expect(autoInsurance.score).toEqual(score + points)
      })
    })

    describe('vehicle was not produced in the last five years', () => {
      it('do not increase points received by params', () => {
        const vehicle = new Vehicle(2000)
        user = createUserMock({ vehicle })
        autoInsurance = new AutoInsurance(user, score)

        autoInsurance.increaseIfVehicleWasProducedInLastFiveYears(points)

        expect(autoInsurance.score).toEqual(score)
      })
    })
  })
})
