import { CalculateUserDisabilityInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserDisabilityInsuranceRiskProfileUseCase/CalculateUserDisabilityInsuranceRiskProfileUseCase'
import { DisabilityInsurance } from 'src/domain/insurance/DisabilityInsurance'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'
import { User } from 'src/domain/user/User'
import { createUserMock } from 'test/mocks/UserMock'

describe('CalculateUserDisabilityInsuranceRiskProfileUseCase', () => {
  let user: User
  let calculateUserDisabilityInsuranceRiskProfile: CalculateUserDisabilityInsuranceRiskProfileUseCase
  let disabilityInsurance: DisabilityInsurance
  let score: number

  beforeEach(() => {
    score = 0
    calculateUserDisabilityInsuranceRiskProfile = new CalculateUserDisabilityInsuranceRiskProfileUseCase()
  })

  describe('user is older than sixty years', () => {
    it('returns disability insurance status ineligible', () => {
      user = createUserMock({ age: 65 })
      disabilityInsurance = new DisabilityInsurance(user, score)

      const response = calculateUserDisabilityInsuranceRiskProfile.execute(
        disabilityInsurance,
      )

      expect(response).toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })

  describe('user does not have income', () => {
    it('returns disability insurance status ineligible', () => {
      user = createUserMock({ income: 0 })
      disabilityInsurance = new DisabilityInsurance(user, score)

      const response = calculateUserDisabilityInsuranceRiskProfile.execute(
        disabilityInsurance,
      )

      expect(response).toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })

  describe('user is not older than sixty years and have income', () => {
    it('returns disability insurance status different than ineligible', () => {
      user = createUserMock({ age: 35, income: 200000 })
      disabilityInsurance = new DisabilityInsurance(user, score)

      disabilityInsurance.decreaseIfAgeIsUnderThirty = jest.fn()
      disabilityInsurance.decreaseIfAgeIsBetweenThirtyAndForty = jest.fn()
      disabilityInsurance.decreaseIfIncomeIsAbove200k = jest.fn()
      disabilityInsurance.increaseIfHouseIsMortgaged = jest.fn()
      disabilityInsurance.increaseIfHasDependents = jest.fn()
      disabilityInsurance.decreaseIfUserIsMarried = jest.fn()

      const response = calculateUserDisabilityInsuranceRiskProfile.execute(
        disabilityInsurance,
      )

      expect(disabilityInsurance.decreaseIfAgeIsUnderThirty).toBeCalled()
      expect(
        disabilityInsurance.decreaseIfAgeIsBetweenThirtyAndForty,
      ).toBeCalled()
      expect(disabilityInsurance.decreaseIfIncomeIsAbove200k).toBeCalled()
      expect(disabilityInsurance.increaseIfHouseIsMortgaged).toBeCalled()
      expect(disabilityInsurance.increaseIfHasDependents).toBeCalled()
      expect(disabilityInsurance.decreaseIfUserIsMarried).toBeCalled()

      expect(response).not.toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })
})
