import { Controller, Get } from '@nestjs/common'
import { CalculateUserRiskProfileUseCase } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'

@Controller('/user')
export class UserController {
  constructor(
    private readonly calculateUserRiskProfileUseCase: CalculateUserRiskProfileUseCase,
  ) {}
  @Get('risk/calculate')
  calculateUserRiskProfile(): any {
    return this.calculateUserRiskProfileUseCase.execute()
  }
}
