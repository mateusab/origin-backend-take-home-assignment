import { MaritalStatusEnum } from '@user/enums/MaritalStatusEnum'
import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInstance,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator'
import { OwnershipStatusEnum } from 'src/modules/house/enums/OwnershipStatusEnum'
import { ErrorMessages } from 'src/utils/ErrorMessages'

class Vehicle {
  @IsDefined()
  @IsNumber()
  year: number
}

class House {
  @IsDefined()
  @IsEnum(OwnershipStatusEnum)
  ownership_status: OwnershipStatusEnum
}
export class CalculateUserRiskProfileInput {
  @IsDefined()
  @IsNumber()
  @IsPositive({ message: ErrorMessages.ageShouldBeGreatherThanZero })
  age: number

  @IsDefined()
  @IsNumber()
  @Min(0, { message: 'Mínimo de dependentes tem que ser 0' })
  dependents: number

  @IsOptional()
  @ValidateNested()
  @IsInstance(House)
  @Type(() => House)
  house?: House

  @IsDefined()
  @IsNumber()
  @Min(0, { message: 'Mínimo de incomes tem que ser 0' })
  income: number

  @IsDefined()
  @IsEnum(MaritalStatusEnum)
  marital_status: MaritalStatusEnum

  @IsDefined()
  @IsArray({ message: 'risk_questions must be an array' })
  @ArrayMinSize(3, { message: 'risk_questions must be length 3' })
  @ArrayMaxSize(3, { message: 'risk_questions must be lenght 3' })
  @IsBoolean({
    each: true,
    message: 'Each value in risk_questions must be a boolean value!!',
  })
  risk_questions: boolean[]

  @IsOptional()
  @ValidateNested()
  @IsInstance(Vehicle)
  @Type(() => Vehicle)
  vehicle?: Vehicle
}
