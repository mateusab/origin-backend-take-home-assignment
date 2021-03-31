import { AutoInsurance } from 'src/application/domain/insurance/AutoInsurance'
import { InsuranceStatusEnum } from 'src/application/domain/insurance/enums/InsuranceStatusEnum'

export class CalculateUserAutoInsuranceRiskProfileUseCase {
  execute(autoInsurance: AutoInsurance): InsuranceStatusEnum {
    if (!autoInsurance.user.hasVehicle()) {
      return InsuranceStatusEnum.INELIGIBLE
    }

    autoInsurance.decreaseIfAgeIsUnderThirty(2)
    autoInsurance.decreaseIfAgeIsBetweenThirtyAndForty(1)
    autoInsurance.decreaseIfIncomeIsAbove200k(1)
    autoInsurance.increaseIfVehicleWasProducedInLastFiveYears(1)

    return autoInsurance.defineFinalRiskLine()
  }
}
