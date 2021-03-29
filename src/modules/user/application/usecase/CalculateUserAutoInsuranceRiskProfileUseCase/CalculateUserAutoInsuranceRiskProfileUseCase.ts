import { AutoInsurance } from 'src/modules/insurance/domain/structure/AutoInsurance'
import { InsuranceStatusEnum } from 'src/modules/insurance/enums/InsuranceStatusEnum'

export class CalculateUserAutoInsuranceRiskProfileUseCase {
  execute(autoInsurance: AutoInsurance): InsuranceStatusEnum {
    if (!autoInsurance.user.hasVehicle()) {
      return InsuranceStatusEnum.INELIGIBLE
    }

    autoInsurance.decreaseIfAgeIsUnderThirty(2)
    autoInsurance.decreaseIfAgeIsBetweenThirtyAndForty(1)
    autoInsurance.decreaseIfIncomeIsAbove200k(1)

    if (autoInsurance.user.vehicle.wasVehicleProducedInLastFiveYears()) {
      autoInsurance.increase(1)
    }

    return autoInsurance.defineFinalRiskLine()
  }
}
