import { Injectable } from '@nestjs/common'
import { CalculateUserRiskProfileInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { HomeInsurance } from 'src/modules/insurance/domain/structure/HomeInsurance'
import { AutoInsurance } from 'src/modules/insurance/domain/structure/AutoInsurance'
import { DisabilityInsurance } from 'src/modules/insurance/domain/structure/DisabilityInsurance'
import { LifeInsurance } from 'src/modules/insurance/domain/structure/LifeInsurance'
import { CreateNewVehicleUseCase } from 'src/modules/vehicle/application/usecase/CreateNewVehicleUseCase'
import { CreateNewHouseUseCase } from 'src/modules/house/application/usecase/CreateNewHouseUseCase/CreateNewHouseUseCase'
import { CreateNewUserUseCase } from '@user/application/usecase/CreateNewUserUseCase/CreateNewUserUseCase'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  constructor(
    private readonly createNewVehicle: CreateNewVehicleUseCase,
    private readonly createNewHouse: CreateNewHouseUseCase,
    private readonly createNewUser: CreateNewUserUseCase,
  ) {}
  execute(input: CalculateUserRiskProfileInput): any {
    const house = this.createNewHouse.execute(input.house)
    const vehicle = this.createNewVehicle.execute(input.vehicle)
    const user = this.createNewUser.execute(input, house, vehicle)

    const baseScore = user.calculateBaseScore()
    const homeInsurance = new HomeInsurance(baseScore)
    const autoInsurance = new AutoInsurance(baseScore)
    const disabilityInsurance = new DisabilityInsurance(baseScore)
    const lifeInsurance = new LifeInsurance(baseScore)

    if (!user.hasHouse()) {
      homeInsurance.turnIntoIneligible()
    }

    if (!user.hasVehicle()) {
      autoInsurance.turnIntoIneligible()
    }

    const isOlderThanSixty = user.isOlderThanSixty()

    if (!user.hasIncome() || isOlderThanSixty) {
      disabilityInsurance.turnIntoIneligible()
    }

    if (isOlderThanSixty) {
      lifeInsurance.turnIntoIneligible()
    }

    if (user.isUnderThirdy()) {
      homeInsurance.decrease(2)
      autoInsurance.decrease(2)
      disabilityInsurance.decrease(2)
      lifeInsurance.decrease(2)
    }

    if (user.isBetweenThirtyAndForty()) {
      homeInsurance.decrease(1)
      autoInsurance.decrease(1)
      disabilityInsurance.decrease(1)
      lifeInsurance.decrease(1)
    }

    if (user.isIncomeAbove200k()) {
      homeInsurance.decrease(1)
      autoInsurance.decrease(1)
      disabilityInsurance.decrease(1)
      lifeInsurance.decrease(1)
    }

    if (house.isHouseMortgaged()) {
      homeInsurance.increase(1)
      disabilityInsurance.increase(1)
    }

    if (user.hasDependents()) {
      disabilityInsurance.increase(1)
      lifeInsurance.increase(1)
    }

    if (user.isMarried()) {
      lifeInsurance.increase(1)
      disabilityInsurance.decrease(1)
    }

    if (vehicle.wasVehicleProducedInLastFiveYears()) {
      autoInsurance.increase(1)
    }

    return {
      auto: autoInsurance.defineFinalScore(),
      disability: disabilityInsurance.defineFinalScore(),
      home: homeInsurance.defineFinalScore(),
      life: lifeInsurance.defineFinalScore(),
    }
  }
}
