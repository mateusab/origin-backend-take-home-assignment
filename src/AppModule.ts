import { Module } from '@nestjs/common'
import { UserController } from 'src/input/controllers/UserController'
import { CalculateUserAutoInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserAutoInsuranceRiskProfileUseCase/CalculateUserAutoInsuranceRiskProfileUseCase'
import { CalculateUserDisabilityInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserDisabilityInsuranceRiskProfileUseCase/CalculateUserDisabilityInsuranceRiskProfileUseCase'
import { CalculateUserHomeInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserHomeInsuranceRiskProfileUseCase/CalculateUserHomeInsuranceRiskProfileUseCase'
import { CalculateUserLifeInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserLifeInsuranceRiskProfileUseCase/CalculateUserLifeInsuranceRiskProfileUseCase'
import { CalculateUserRiskProfileUseCase } from 'src/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileUseCase'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CalculateUserRiskProfileUseCase,
    CalculateUserAutoInsuranceRiskProfileUseCase,
    CalculateUserLifeInsuranceRiskProfileUseCase,
    CalculateUserDisabilityInsuranceRiskProfileUseCase,
    CalculateUserHomeInsuranceRiskProfileUseCase,
  ],
})
export class AppModule {}
