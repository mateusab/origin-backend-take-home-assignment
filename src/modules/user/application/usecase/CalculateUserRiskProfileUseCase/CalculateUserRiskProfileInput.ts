import { MaritalStatusEnum } from 'src/modules/user/enums/MaritalStatusEnum'
import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsInstance,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import { OwnershipStatusEnum } from 'src/modules/house/enums/OwnershipStatusEnum'
import { ErrorMessages } from 'src/utils/ErrorMessages'

export class VehicleInput {
  @IsDefined()
  @IsNumber()
  year: number
}

export class HouseInput {
  @IsDefined()
  @IsEnum(OwnershipStatusEnum, {
    message: 'ownership_status must be owned or mortgaged',
  })
  ownership_status: OwnershipStatusEnum
}
export class CalculateUserRiskProfileInput {
  @IsDefined()
  @IsNumber()
  @IsPositive({ message: ErrorMessages.ageShouldBeGreatherThanZero })
  age: number

  @IsDefined()
  @IsNumber()
  @Min(0, { message: 'The minimal number of dependents must be zero.' })
  dependents: number

  @IsOptional()
  @ValidateNested()
  @IsInstance(HouseInput)
  @Type(() => HouseInput)
  house?: HouseInput

  @IsDefined()
  @IsNumber()
  @Min(0, { message: 'The minimal number of incomes must be zero.' })
  income: number

  @IsDefined()
  @IsEnum(MaritalStatusEnum, {
    message: `Marital status should be "single" or "married"`,
  })
  marital_status: MaritalStatusEnum

  @IsDefined()
  @IsArray({ message: 'risk_questions must be an array' })
  @ArrayMinSize(3, { message: 'risk_questions must have three positions.' })
  @ArrayMaxSize(3, { message: 'risk_questions must have three positions.' })
  @Min(0, { each: true })
  @Max(1, { each: true })
  risk_questions: number[]

  @IsOptional()
  @ValidateNested()
  @IsInstance(VehicleInput)
  @Type(() => VehicleInput)
  vehicle?: VehicleInput
}
