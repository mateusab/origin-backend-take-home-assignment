import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
import { CalculateUserRiskProfileInput } from 'src/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { CalculateUserRiskProfileUseCase } from 'src/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'

@Controller('/user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(
    private readonly calculateUserRiskProfileUseCase: CalculateUserRiskProfileUseCase,
  ) {}
  @Post('risk/calculate')
  calculateUserRiskProfile(
    @Body() input: CalculateUserRiskProfileInput,
    @Res() res: Response,
  ) {
    const response = this.calculateUserRiskProfileUseCase.execute(input)

    res.status(200).send(response)
  }
}
