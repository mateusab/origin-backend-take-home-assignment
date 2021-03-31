import { House } from 'src/domain/house/House'
import { OwnershipStatusEnum } from 'src/domain/house/OwnershipStatusEnum'
import { MaritalStatusEnum } from 'src/domain/user/MaritalStatusEnum'
import { User } from 'src/domain/user/User'
import { Vehicle } from 'src/domain/vehicle/Vehicle'
import { createUserMock } from 'test/mocks/UserMock'
describe('User', () => {
  let user: User

  describe('calculateBaseScore', () => {
    describe('risk_answers having just one value true', () => {
      it('baseScore should be 1', () => {
        user = createUserMock({ risk_answers: [false, true, false] })

        const response = user.calculateBaseScore()

        expect(response).toEqual(1)
      })
    })
  })

  describe('hasvehicle', () => {
    describe('user does have vehicle', () => {
      it('returns true', () => {
        const vehicle = new Vehicle(2018)
        user = createUserMock({ vehicle })

        const response = user.hasVehicle()

        expect(response).toEqual(true)
      })
    })

    describe('user does not have vehicle', () => {
      it('returns false', () => {
        const vehicle = new Vehicle()
        user = createUserMock({ vehicle })

        const response = user.hasVehicle()

        expect(response).toEqual(false)
      })
    })
  })
  describe('isOlderThanSixty', () => {
    describe('user is 60 years old', () => {
      it('returns true', () => {
        user = createUserMock({ age: 65 })

        const response = user.isOlderThanSixty()

        expect(response).toEqual(true)
      })
    })

    describe('user isnt 60 years old', () => {
      it('returns false', () => {
        user = createUserMock({ age: 30 })

        const response = user.isOlderThanSixty()

        expect(response).toEqual(false)
      })
    })
  })

  describe('hasHouse', () => {
    describe('user does have house', () => {
      it('returns true', () => {
        const house = new House(OwnershipStatusEnum.OWNED)
        user = createUserMock({ house })

        const response = user.hasHouse()

        expect(response).toEqual(true)
      })
    })

    describe('user does not have house', () => {
      it('returns false', () => {
        const house = new House()
        user = createUserMock({ house })

        const response = user.hasHouse()

        expect(response).toEqual(false)
      })
    })
  })

  describe('hasIncome', () => {
    describe('user does have income', () => {
      it('returns true', () => {
        user = createUserMock({ income: 200000 })

        const response = user.hasIncome()

        expect(response).toEqual(true)
      })
    })

    describe('user does not have income', () => {
      it('returns false', () => {
        user = createUserMock({ income: 0 })

        const response = user.hasIncome()

        expect(response).toEqual(false)
      })
    })
  })

  describe('hasDependents', () => {
    describe('user does have dependents', () => {
      it('returns true', () => {
        user = createUserMock({ dependents: 2 })

        const response = user.hasDependents()

        expect(response).toEqual(true)
      })
    })

    describe('user does not have dependents', () => {
      it('returns false', () => {
        user = createUserMock({ dependents: 0 })

        const response = user.hasDependents()

        expect(response).toEqual(false)
      })
    })
  })

  describe('isMarried', () => {
    describe('user is married', () => {
      it('returns true', () => {
        user = createUserMock({ marital_status: MaritalStatusEnum.MARRIED })

        const response = user.isMarried()

        expect(response).toEqual(true)
      })
    })

    describe('user is not married', () => {
      it('returns false', () => {
        user = createUserMock({ marital_status: MaritalStatusEnum.SINGLE })

        const response = user.isMarried()

        expect(response).toEqual(false)
      })
    })
  })
})
