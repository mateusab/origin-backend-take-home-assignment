import { Module } from '@nestjs/common'
import { CreateNewUserUseCase } from '@user/application/usecase/CreateNewUserUseCase/CreateNewUserUseCase'
import { CalculateUserRiskProfileUseCase } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'
import { UserController } from '@user/input/controller/UserController'
import { CreateNewHouseUseCase } from 'src/modules/house/application/usecase/CreateNewHouseUseCase/CreateNewHouseUseCase'
import { CreateNewVehicleUseCase } from 'src/modules/vehicle/application/usecase/CreateNewVehicleUseCase'
import { CalculateUserHomeInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserHomeInsuranceRiskProfileUseCase/CalculateUserHomeInsuranceRiskProfileUseCase'
import { CalculateUserAutoInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserAutoInsuranceRiskProfileUseCase/CalculateUserAutoInsuranceRiskProfileUseCase'
import { CalculateUserLifeInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserLifeInsuranceRiskProfileUseCase/CalculateUserLifeInsuranceRiskProfileUseCase'
import { CalculateUserDisabilityInsuranceRiskProfileUseCase } from '@user/application/usecase/CalculateUserDisabilityInsuranceRiskProfileUseCase/CalculateUserDisabilityInsuranceRiskProfileUseCase'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CalculateUserRiskProfileUseCase,
    CreateNewHouseUseCase,
    CreateNewVehicleUseCase,
    CreateNewUserUseCase,
    CalculateUserHomeInsuranceRiskProfileUseCase,
    CalculateUserAutoInsuranceRiskProfileUseCase,
    CalculateUserLifeInsuranceRiskProfileUseCase,
    CalculateUserDisabilityInsuranceRiskProfileUseCase,
  ],
})
export class UserModule {}
