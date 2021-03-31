import { Injectable } from '@nestjs/common'
import { HomeInsurance } from 'src/application/domain/insurance/HomeInsurance'
import { InsuranceStatusEnum } from 'src/application/domain/insurance/enums/InsuranceStatusEnum'

@Injectable()
export class CalculateUserHomeInsuranceRiskProfileUseCase {
  execute(homeInsurance: HomeInsurance): InsuranceStatusEnum {
    if (!homeInsurance.user.hasHouse()) {
      return InsuranceStatusEnum.INELIGIBLE
    }

    homeInsurance.decreaseIfAgeIsUnderThirty(2)
    homeInsurance.decreaseIfAgeIsBetweenThirtyAndForty(1)
    homeInsurance.decreaseIfIncomeIsAbove200k(1)
    homeInsurance.increaseIfHouseIsMortgaged(1)

    return homeInsurance.defineFinalRiskLine()
  }
}
