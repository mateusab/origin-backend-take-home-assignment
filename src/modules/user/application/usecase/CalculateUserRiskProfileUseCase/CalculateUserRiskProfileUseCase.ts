import { Injectable } from '@nestjs/common'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  execute(): string {
    return 'Risk profile'
  }
}
