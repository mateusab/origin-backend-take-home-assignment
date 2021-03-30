import { Module } from '@nestjs/common'
import { CreateNewUserUseCase } from 'src/modules/user/application/usecase/CreateNewUserUseCase/CreateNewUserUseCase'
import { CalculateUserRiskProfileUseCase } from 'src/modules/user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'
import { UserController } from 'src/modules/user/input/controller/UserController'
import { CreateNewHouseUseCase } from 'src/modules/house/application/usecase/CreateNewHouseUseCase/CreateNewHouseUseCase'
import { CreateNewVehicleUseCase } from 'src/modules/vehicle/application/usecase/CreateNewVehicleUseCase'
import { CalculateUserHomeInsuranceRiskProfileUseCase } from 'src/modules/user/application/usecase/CalculateUserHomeInsuranceRiskProfileUseCase/CalculateUserHomeInsuranceRiskProfileUseCase'
import { CalculateUserAutoInsuranceRiskProfileUseCase } from 'src/modules/user/application/usecase/CalculateUserAutoInsuranceRiskProfileUseCase/CalculateUserAutoInsuranceRiskProfileUseCase'
import { CalculateUserLifeInsuranceRiskProfileUseCase } from 'src/modules/user/application/usecase/CalculateUserLifeInsuranceRiskProfileUseCase/CalculateUserLifeInsuranceRiskProfileUseCase'
import { CalculateUserDisabilityInsuranceRiskProfileUseCase } from 'src/modules/user/application/usecase/CalculateUserDisabilityInsuranceRiskProfileUseCase/CalculateUserDisabilityInsuranceRiskProfileUseCase'

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
