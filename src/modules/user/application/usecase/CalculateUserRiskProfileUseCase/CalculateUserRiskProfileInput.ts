import { IsDefined, IsNumber, IsPositive } from 'class-validator'
import { ErrorMessages } from 'src/utils/ErrorMessages'

export class CalculateUserRiskProfileInput {
  @IsDefined()
  @IsNumber()
  @IsPositive({ message: ErrorMessages.ageShouldBeGreatherThanZero })
  age: number
}
