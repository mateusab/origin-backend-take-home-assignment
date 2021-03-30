import { Injectable } from '@nestjs/common'
import { CalculateUserRiskProfileInput } from 'src/modules/user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { User } from 'src/modules/user/domain/structure/User'
import { House } from 'src/modules/house/domain/structure/House'
import { Vehicle } from 'src/modules/vehicle/Vehicle'

@Injectable()
export class CreateNewUserUseCase {
  execute(
    input: CalculateUserRiskProfileInput,
    house: House,
    vehicle: Vehicle,
  ): User {
    return new User(
      input.age,
      input.dependents,
      input.income,
      input.marital_status,
      input.risk_questions,
      house,
      vehicle,
    )
  }
}
