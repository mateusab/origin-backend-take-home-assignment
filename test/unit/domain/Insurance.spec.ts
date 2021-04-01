import { House } from 'src/domain/house/House'
import { OwnershipStatusEnum } from 'src/domain/house/OwnershipStatusEnum'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'
import { Insurance } from 'src/domain/insurance/Insurance'
import { User } from 'src/domain/user/User'
import { createUserMock } from 'test/mocks/UserMock'
import { InsuranceTestDomain } from 'test/unit/InsuranceTestDomain'

describe('Insurance', () => {
  let user: User
  let insurance: Insurance
  let score: number
  let points: number

  beforeEach(() => {
    score = 0
  })
  describe('decreaseIfAgeIsBetweenThirtyAndForty', () => {
    beforeEach(() => {
      points = 1
    })
    describe('user age is between thirty and forty years', () => {
      it('decrease points received by params', () => {
        user = createUserMock({ age: 35 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.decreaseIfAgeIsBetweenThirtyAndForty(points)

        expect(insurance.score).toEqual(score - points)
      })
    })

    describe('user age is not between thirty and forty years', () => {
      it('do not decrease points received by params', () => {
        user = createUserMock({ age: 50 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.decreaseIfAgeIsBetweenThirtyAndForty(points)

        expect(insurance.score).toEqual(score)
      })
    })
  })

  describe('decreaseIfAgeIsUnderThirty', () => {
    beforeEach(() => {
      points = 2
    })
    describe('user age is under thirty years', () => {
      it('decrease points received by params', () => {
        user = createUserMock({ age: 25 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.decreaseIfAgeIsUnderThirty(points)

        expect(insurance.score).toEqual(score - points)
      })
    })

    describe('user age is not under thirty years', () => {
      it('do not decrease points received by params', () => {
        user = createUserMock({ age: 50 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.decreaseIfAgeIsUnderThirty(points)

        expect(insurance.score).toEqual(score)
      })
    })
  })

  describe('decreaseIfIncomeIsAbove200k', () => {
    beforeEach(() => {
      points = 1
    })
    describe('user income is above 200000', () => {
      it('decrease points received by params', () => {
        user = createUserMock({ income: 250000 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.decreaseIfIncomeIsAbove200k(points)

        expect(insurance.score).toEqual(score - points)
      })
    })

    describe('user income is above 200000', () => {
      it('do not decrease points received by params', () => {
        user = createUserMock({ income: 100000 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.decreaseIfIncomeIsAbove200k(points)

        expect(insurance.score).toEqual(score)
      })
    })
  })

  describe('increaseIfHouseIsMortgaged', () => {
    beforeEach(() => {
      points = 1
    })
    describe('user house is mortgaged', () => {
      it('increase points received by params', () => {
        const house = new House(OwnershipStatusEnum.MORTGAGED)
        user = createUserMock({ house })
        insurance = new InsuranceTestDomain(user, score)

        insurance.increaseIfHouseIsMortgaged(points)

        expect(insurance.score).toEqual(score + points)
      })
    })

    describe('user house is not mortgaged', () => {
      it('do not increase points received by params', () => {
        const house = new House(OwnershipStatusEnum.OWNED)
        user = createUserMock({ house })
        insurance = new InsuranceTestDomain(user, score)

        insurance.increaseIfHouseIsMortgaged(points)

        expect(insurance.score).toEqual(score)
      })
    })
  })

  describe('increaseIfHasDependents', () => {
    beforeEach(() => {
      points = 1
    })
    describe('user do have dependents', () => {
      it('increase points received by params', () => {
        user = createUserMock({ dependents: 2 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.increaseIfHasDependents(points)

        expect(insurance.score).toEqual(score + points)
      })
    })

    describe('user do not have dependents', () => {
      it('do not increase points received by params', () => {
        user = createUserMock({ dependents: 0 })
        insurance = new InsuranceTestDomain(user, score)

        insurance.increaseIfHasDependents(points)

        expect(insurance.score).toEqual(score)
      })
    })
  })

  describe('defineFinalRiskLine', () => {
    describe('final score is 0 or below', () => {
      it('returns insurance status economic', () => {
        score = -1
        user = createUserMock({})
        insurance = new InsuranceTestDomain(user, score)

        const response = insurance.defineFinalRiskLine()

        expect(response).toEqual(InsuranceStatusEnum.ECONOMIC)
      })
    })

    describe('final score is 1 or 2', () => {
      it('returns insurance status regular', () => {
        score = 1
        user = createUserMock({})
        insurance = new InsuranceTestDomain(user, score)

        const response = insurance.defineFinalRiskLine()

        expect(response).toEqual(InsuranceStatusEnum.REGULAR)
      })
    })

    describe('final score is 3 or above', () => {
      it('returns insurance status responsible', () => {
        score = 3
        user = createUserMock({})
        insurance = new InsuranceTestDomain(user, score)

        const response = insurance.defineFinalRiskLine()

        expect(response).toEqual(InsuranceStatusEnum.RESPONSIBLE)
      })
    })
  })
})
