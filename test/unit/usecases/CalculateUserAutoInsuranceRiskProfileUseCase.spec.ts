import { CalculateUserAutoInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserAutoInsuranceRiskProfileUseCase/CalculateUserAutoInsuranceRiskProfileUseCase'
import { AutoInsurance } from 'src/domain/insurance/AutoInsurance'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'
import { User } from 'src/domain/user/User'
import { Vehicle } from 'src/domain/vehicle/Vehicle'
import { createUserMock } from 'test/mocks/UserMock'

describe('CalculateUserAutoInsuranceRiskProfileUseCase', () => {
  let user: User
  let calculateUserAutoInsuranceRiskProfileUseCase: CalculateUserAutoInsuranceRiskProfileUseCase
  let autoInsurance: AutoInsurance
  let score: number

  beforeEach(() => {
    score = 0
    calculateUserAutoInsuranceRiskProfileUseCase = new CalculateUserAutoInsuranceRiskProfileUseCase()
  })

  describe('user do not have vehicle', () => {
    it('returns auto insurance status ineligible', () => {
      const vehicle = new Vehicle()
      user = createUserMock({ vehicle })
      autoInsurance = new AutoInsurance(user, score)

      const response = calculateUserAutoInsuranceRiskProfileUseCase.execute(
        autoInsurance,
      )

      expect(response).toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })

  describe('user do have vehicle', () => {
    it('returns auto insurance status different than ineligible', () => {
      const vehicle = new Vehicle(2018)
      user = createUserMock({ vehicle })
      autoInsurance = new AutoInsurance(user, score)

      autoInsurance.decreaseIfAgeIsUnderThirty = jest.fn()
      autoInsurance.decreaseIfAgeIsBetweenThirtyAndForty = jest.fn()
      autoInsurance.decreaseIfIncomeIsAbove200k = jest.fn()
      autoInsurance.increaseIfVehicleWasProducedInLastFiveYears = jest.fn()

      const response = calculateUserAutoInsuranceRiskProfileUseCase.execute(
        autoInsurance,
      )

      expect(autoInsurance.decreaseIfAgeIsUnderThirty).toBeCalled()
      expect(autoInsurance.decreaseIfAgeIsBetweenThirtyAndForty).toBeCalled()
      expect(autoInsurance.decreaseIfIncomeIsAbove200k).toBeCalled()
      expect(
        autoInsurance.increaseIfVehicleWasProducedInLastFiveYears,
      ).toBeCalled()

      expect(response).not.toEqual(InsuranceStatusEnum.INELIGIBLE)
    })
  })
})
