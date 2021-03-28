import { Injectable } from '@nestjs/common'
import { CalculateUserRiskProfileInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  execute(input: CalculateUserRiskProfileInput): string {
    console.log('input: ', input)
    return 'Risk profile'
  }
}
