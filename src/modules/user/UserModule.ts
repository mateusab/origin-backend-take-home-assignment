import { Module } from '@nestjs/common'
import { CreateNewUserUseCase } from '@user/application/usecase/CreateNewUserUseCase/CreateNewUserUseCase'
import { CalculateUserRiskProfileUseCase } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'
import { UserController } from '@user/input/controller/UserController'
import { CreateNewHouseUseCase } from 'src/modules/house/application/usecase/CreateNewHouseUseCase/CreateNewHouseUseCase'
import { CreateNewVehicleUseCase } from 'src/modules/vehicle/application/usecase/CreateNewVehicleUseCase'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CalculateUserRiskProfileUseCase,
    CreateNewHouseUseCase,
    CreateNewVehicleUseCase,
    CreateNewUserUseCase,
  ],
})
export class UserModule {}
