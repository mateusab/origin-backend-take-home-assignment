import { CalculateUserLifeInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserLifeInsuranceRiskProfileUseCase/CalculateUserLifeInsuranceRiskProfileUseCase'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'
import { LifeInsurance } from 'src/domain/insurance/LifeInsurance'
import { User } from 'src/domain/user/User'
import { createUserMock } from 'test/mocks/UserMock'

describe('CalculateUserLifeInsuranceRiskProfileUseCase', () => {
  let user: User
  let calculateUserLifeInsuranceRiskProfileUseCase: CalculateUserLifeInsuranceRiskProfileUseCase
  let lifeInsurance: LifeInsurance
  let score: number

  beforeEach(() => {
    score = 0
    calculateUserLifeInsuranceRiskProfileUseCase = new CalculateUserLifeInsuranceRiskProfileUseCase()
  })

  describe('user is older than sixty years', () => {
    it('returns life insurance status ineligible', () => {
      user = createUserMock({ age: 65 })
      lifeInsurance = new LifeInsurance(user, score)

      const response = calculateUserLifeInsuranceRiskProfileUseCase.execute(
        lifeInsurance,
      )

      expect(response).toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })

  describe('user is not older than sixty years', () => {
    it('returns life insurance status different than ineligible', () => {
      user = createUserMock({ age: 35 })
      lifeInsurance = new LifeInsurance(user, score)

      lifeInsurance.decreaseIfAgeIsUnderThirty = jest.fn()
      lifeInsurance.decreaseIfAgeIsBetweenThirtyAndForty = jest.fn()
      lifeInsurance.decreaseIfIncomeIsAbove200k = jest.fn()
      lifeInsurance.increaseIfHasDependents = jest.fn()
      lifeInsurance.increaseIfUserIsMarried = jest.fn()

      const response = calculateUserLifeInsuranceRiskProfileUseCase.execute(
        lifeInsurance,
      )

      expect(lifeInsurance.decreaseIfAgeIsUnderThirty).toBeCalled()
      expect(lifeInsurance.decreaseIfAgeIsBetweenThirtyAndForty).toBeCalled()
      expect(lifeInsurance.decreaseIfIncomeIsAbove200k).toBeCalled()
      expect(lifeInsurance.increaseIfHasDependents).toBeCalled()
      expect(lifeInsurance.increaseIfUserIsMarried).toBeCalled()

      expect(response).not.toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })
})
