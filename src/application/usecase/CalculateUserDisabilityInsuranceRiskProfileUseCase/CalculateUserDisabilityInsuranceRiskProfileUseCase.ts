import { Injectable } from '@nestjs/common'
import { DisabilityInsurance } from 'src/application/domain/insurance/DisabilityInsurance'
import { InsuranceStatusEnum } from 'src/application/domain/insurance/enums/InsuranceStatusEnum'

@Injectable()
export class CalculateUserDisabilityInsuranceRiskProfileUseCase {
  execute(disabilityInsurance: DisabilityInsurance): InsuranceStatusEnum {
    if (
      !disabilityInsurance.user.hasIncome() ||
      disabilityInsurance.user.isOlderThanSixty()
    ) {
      return InsuranceStatusEnum.INELIGIBLE
    }

    disabilityInsurance.decreaseIfAgeIsUnderThirty(2)
    disabilityInsurance.decreaseIfAgeIsBetweenThirtyAndForty(1)
    disabilityInsurance.decreaseIfIncomeIsAbove200k(1)
    disabilityInsurance.increaseIfHouseIsMortgaged(1)
    disabilityInsurance.increaseIfHasDependents(1)
    disabilityInsurance.decreaseIfUserIsMarried(1)
  }
}
