import { Module } from '@nestjs/common'
import { CalculateUserRiskProfileUseCase } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'
import { UserController } from '@user/input/controller/UserController'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CalculateUserRiskProfileUseCase],
})
export class UserModule {}
