import { Injectable } from '@nestjs/common'
import { LifeInsurance } from 'src/domain/insurance/LifeInsurance'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'

@Injectable()
export class CalculateUserLifeInsuranceRiskProfileUseCase {
  execute(lifeInsurance: LifeInsurance): InsuranceStatusEnum {
    if (lifeInsurance.user.isOlderThanSixty()) {
      return InsuranceStatusEnum.INELIGIBLE
    }

    lifeInsurance.decreaseIfAgeIsUnderThirty(2)
    lifeInsurance.decreaseIfAgeIsBetweenThirtyAndForty(1)
    lifeInsurance.decreaseIfIncomeIsAbove200k(1)
    lifeInsurance.increaseIfHasDependents(1)
    lifeInsurance.increaseIfUserIsMarried(1)

    return lifeInsurance.defineFinalRiskLine()
  }
}
