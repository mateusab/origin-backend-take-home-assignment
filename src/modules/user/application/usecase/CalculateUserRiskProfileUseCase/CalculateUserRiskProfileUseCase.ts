import { Injectable } from '@nestjs/common'
import { CalculateUserRiskProfileInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { HomeInsurance } from 'src/modules/insurance/domain/structure/HomeInsurance'
import { AutoInsurance } from 'src/modules/insurance/domain/structure/AutoInsurance'
import { DisabilityInsurance } from 'src/modules/insurance/domain/structure/DisabilityInsurance'
import { LifeInsurance } from 'src/modules/insurance/domain/structure/LifeInsurance'
import { CreateNewVehicleUseCase } from 'src/modules/vehicle/application/usecase/CreateNewVehicleUseCase'
import { CreateNewHouseUseCase } from 'src/modules/house/application/usecase/CreateNewHouseUseCase/CreateNewHouseUseCase'
import { CreateNewUserUseCase } from '@user/application/usecase/CreateNewUserUseCase/CreateNewUserUseCase'
import { CalculateUserHomeInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserHomeInsuranceRiskProfileUseCase/CalculateUserHomeInsuranceRiskProfileUseCase'
import { CalculateUserAutoInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserAutoInsuranceRiskProfileUseCase/CalculateUserAutoInsuranceRiskProfileUseCase'
import { CalculateUserLifeInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserLifeInsuranceRiskProfileUseCase/CalculateUserLifeInsuranceRiskProfileUseCase'
import { CalculateUserDisabilityInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserDisabilityInsuranceRiskProfileUseCase/CalculateUserDisabilityInsuranceRiskProfileUseCase'
import { CalculateUserRiskProfileOutput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileOutput'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  constructor(
    private readonly createNewVehicle: CreateNewVehicleUseCase,
    private readonly createNewHouse: CreateNewHouseUseCase,
    private readonly createNewUser: CreateNewUserUseCase,
    private readonly calculateUserHomeInsuranceRiskProfile: CalculateUserHomeInsuranceRiskProfileUseCase,
    private readonly calculateUserAutoInsuranceRiskProfile: CalculateUserAutoInsuranceRiskProfileUseCase,
    private readonly calculateUserLifeInsuranceRiskProfile: CalculateUserLifeInsuranceRiskProfileUseCase,
    private readonly calculateUserDisabilityInsuranceRiskProfile: CalculateUserDisabilityInsuranceRiskProfileUseCase,
  ) {}
  execute(
    input: CalculateUserRiskProfileInput,
  ): CalculateUserRiskProfileOutput {
    const house = this.createNewHouse.execute(input.house)
    const vehicle = this.createNewVehicle.execute(input.vehicle)
    const user = this.createNewUser.execute(input, house, vehicle)

    const baseScore = user.calculateBaseScore()
    const autoInsurance = new AutoInsurance(user, baseScore)
    const disabilityInsurance = new DisabilityInsurance(user, baseScore)
    const homeInsurance = new HomeInsurance(user, baseScore)
    const lifeInsurance = new LifeInsurance(user, baseScore)

    return {
      auto: this.calculateUserAutoInsuranceRiskProfile.execute(autoInsurance),
      disability: this.calculateUserDisabilityInsuranceRiskProfile.execute(
        disabilityInsurance,
      ),
      home: this.calculateUserHomeInsuranceRiskProfile.execute(homeInsurance),
      life: this.calculateUserLifeInsuranceRiskProfile.execute(lifeInsurance),
    }
  }
}
