import { Injectable } from '@nestjs/common'
import { CalculateUserRiskProfileInput } from 'src/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { HomeInsurance } from 'src/application/domain/insurance/HomeInsurance'
import { AutoInsurance } from 'src/application/domain/insurance/AutoInsurance'
import { DisabilityInsurance } from 'src/application/domain/insurance/DisabilityInsurance'
import { LifeInsurance } from 'src/application/domain/insurance/LifeInsurance'
import { CalculateUserHomeInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserHomeInsuranceRiskProfileUseCase/CalculateUserHomeInsuranceRiskProfileUseCase'
import { CalculateUserAutoInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserAutoInsuranceRiskProfileUseCase/CalculateUserAutoInsuranceRiskProfileUseCase'
import { CalculateUserLifeInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserLifeInsuranceRiskProfileUseCase/CalculateUserLifeInsuranceRiskProfileUseCase'
import { CalculateUserDisabilityInsuranceRiskProfileUseCase } from 'src/application/usecase/CalculateUserDisabilityInsuranceRiskProfileUseCase/CalculateUserDisabilityInsuranceRiskProfileUseCase'
import { CalculateUserRiskProfileOutput } from 'src/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileOutput'
import { House } from 'src/application/domain/house/House'
import { Vehicle } from 'src/application/domain/vehicle/Vehicle'
import { User } from 'src/application/domain/user/User'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  constructor(
    private readonly calculateUserHomeInsuranceRiskProfile: CalculateUserHomeInsuranceRiskProfileUseCase,
    private readonly calculateUserAutoInsuranceRiskProfile: CalculateUserAutoInsuranceRiskProfileUseCase,
    private readonly calculateUserLifeInsuranceRiskProfile: CalculateUserLifeInsuranceRiskProfileUseCase,
    private readonly calculateUserDisabilityInsuranceRiskProfile: CalculateUserDisabilityInsuranceRiskProfileUseCase,
  ) {}
  execute(
    input: CalculateUserRiskProfileInput,
  ): CalculateUserRiskProfileOutput {
    const house = this.createNewHouse(input)
    const vehicle = this.createNewVehicle(input)
    const user = this.createNewUser(input, house, vehicle)

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

  private createNewHouse(input: CalculateUserRiskProfileInput): House {
    return input.house ? new House(input.house.ownership_status) : new House()
  }

  private createNewVehicle(input: CalculateUserRiskProfileInput): Vehicle {
    return input.vehicle ? new Vehicle(input.vehicle.year) : new Vehicle()
  }

  private createNewUser(
    input: CalculateUserRiskProfileInput,
    house: House,
    vehicle: Vehicle,
  ): User {
    return new User(
      input.age,
      input.dependents,
      input.income,
      input.marital_status,
      this.mapRiskQuestionsFromInputToBoolean(input.risk_questions),
      house,
      vehicle,
    )
  }

  private mapRiskQuestionsFromInputToBoolean(
    risk_questions: number[],
  ): boolean[] {
    return risk_questions.map(risk_question => (risk_question ? true : false))
  }
}
