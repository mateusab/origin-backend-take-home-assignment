import { Injectable } from '@nestjs/common'
import { HomeInsurance } from 'src/domain/insurance/HomeInsurance'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'

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
