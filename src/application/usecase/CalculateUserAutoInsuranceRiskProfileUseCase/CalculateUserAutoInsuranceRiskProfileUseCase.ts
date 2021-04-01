import { AutoInsurance } from 'src/domain/insurance/AutoInsurance'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'

export class CalculateUserAutoInsuranceRiskProfileUseCase {
  execute(autoInsurance: AutoInsurance): InsuranceStatusEnum {
    const userDoesNotHaveVehicle = !autoInsurance.user.hasVehicle()

    if (userDoesNotHaveVehicle) {
      return InsuranceStatusEnum.INELIGIBLE
    }

    autoInsurance.decreaseIfAgeIsUnderThirty(2)
    autoInsurance.decreaseIfAgeIsBetweenThirtyAndForty(1)
    autoInsurance.decreaseIfIncomeIsAbove200k(1)
    autoInsurance.increaseIfVehicleWasProducedInLastFiveYears(1)

    return autoInsurance.defineFinalRiskLine()
  }
}
