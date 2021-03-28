import { Body, Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common'
import { CalculateUserRiskProfileInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { CalculateUserRiskProfileUseCase } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'

@Controller('/user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(
    private readonly calculateUserRiskProfileUseCase: CalculateUserRiskProfileUseCase,
  ) {}
  @Get('risk/calculate')
  calculateUserRiskProfile(@Body() input: CalculateUserRiskProfileInput): any {
    return this.calculateUserRiskProfileUseCase.execute(input)
  }
}
