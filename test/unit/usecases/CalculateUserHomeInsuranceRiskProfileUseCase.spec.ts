import { CalculateUserHomeInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserHomeInsuranceRiskProfileUseCase/CalculateUserHomeInsuranceRiskProfileUseCase'
import { House } from 'src/domain/house/House'
import { OwnershipStatusEnum } from 'src/domain/house/OwnershipStatusEnum'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'
import { HomeInsurance } from 'src/domain/insurance/HomeInsurance'
import { User } from 'src/domain/user/User'
import { createUserMock } from 'test/mocks/UserMock'

describe('CalculateUserHomeInsuranceRiskProfileUseCase', () => {
  let user: User
  let calculateUserHomeInsuranceRiskProfile: CalculateUserHomeInsuranceRiskProfileUseCase
  let homeInsurance: HomeInsurance
  let score: number

  beforeEach(() => {
    score = 0
    calculateUserHomeInsuranceRiskProfile = new CalculateUserHomeInsuranceRiskProfileUseCase()
  })

  describe('user do not have house', () => {
    it('returns home insurance status ineligible', () => {
      const house = new House()
      user = createUserMock({ house })
      homeInsurance = new HomeInsurance(user, score)

      const response = calculateUserHomeInsuranceRiskProfile.execute(
        homeInsurance,
      )

      expect(response).toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })

  describe('user do have a house', () => {
    it('returns home insurance status different than ineligible', () => {
      const house = new House(OwnershipStatusEnum.MORTGAGED)
      user = createUserMock({ house })
      homeInsurance = new HomeInsurance(user, score)

      homeInsurance.decreaseIfAgeIsUnderThirty = jest.fn()
      homeInsurance.decreaseIfAgeIsBetweenThirtyAndForty = jest.fn()
      homeInsurance.decreaseIfIncomeIsAbove200k = jest.fn()
      homeInsurance.increaseIfHouseIsMortgaged = jest.fn()

      const response = calculateUserHomeInsuranceRiskProfile.execute(
        homeInsurance,
      )
      expect(homeInsurance.decreaseIfAgeIsUnderThirty).toBeCalled()
      expect(homeInsurance.decreaseIfAgeIsBetweenThirtyAndForty).toBeCalled()
      expect(homeInsurance.decreaseIfIncomeIsAbove200k).toBeCalled()
      expect(homeInsurance.increaseIfHouseIsMortgaged).toBeCalled()
      expect(response).not.toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })
})
