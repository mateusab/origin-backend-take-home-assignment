import { Injectable } from '@nestjs/common'
import { User } from '@user/domain/structure/User'
import { CalculateUserRiskProfileInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  execute(input: CalculateUserRiskProfileInput): string {
    const user = new User(
      input.age,
      input.dependents,
      input.income,
      input.marital_status,
      input.risk_questions,
    )

    console.log(user)
    return 'Risk profile'
  }
}
