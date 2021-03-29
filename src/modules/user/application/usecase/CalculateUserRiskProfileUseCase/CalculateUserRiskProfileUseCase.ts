import { Injectable } from '@nestjs/common'
import { User } from '@user/domain/structure/User'
import { CalculateUserRiskProfileInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { HomeInsurance } from 'src/modules/insurance/domain/structure/HomeInsurance'
import { AutoInsurance } from 'src/modules/insurance/domain/structure/AutoInsurance'
import { DisabilityInsurance } from 'src/modules/insurance/domain/structure/DisabilityInsurance'
import { LifeInsurance } from 'src/modules/insurance/domain/structure/LifeInsurance'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  execute(input: CalculateUserRiskProfileInput): any {
    const user = new User(
      input.age,
      input.dependents,
      input.income,
      input.marital_status,
      input.risk_questions,
      input.house,
      input.vehicle,
    )

    const baseScore = user.calculateBaseScore()
    const homeInsurance = new HomeInsurance(baseScore)
    const autoInsurance = new AutoInsurance(baseScore)
    const disabilityInsurance = new DisabilityInsurance(baseScore)
    const lifeInsurance = new LifeInsurance(baseScore)

    console.log(homeInsurance)
    console.log(autoInsurance)
    console.log(disabilityInsurance)
    console.log(lifeInsurance)

    return 'Risk'
  }
}
