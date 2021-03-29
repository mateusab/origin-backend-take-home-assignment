import { Injectable } from '@nestjs/common'
import { User } from '@user/domain/structure/User'
import { CalculateUserRiskProfileInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { HomeInsurance } from 'src/modules/insurance/domain/structure/HomeInsurance'
import { AutoInsurance } from 'src/modules/insurance/domain/structure/AutoInsurance'
import { DisabilityInsurance } from 'src/modules/insurance/domain/structure/DisabilityInsurance'
import { LifeInsurance } from 'src/modules/insurance/domain/structure/LifeInsurance'

@Injectable()
export class CalculateUserRiskProfileUseCase {
  execute(input: CalculateUserRiskProfileInput): any {
    const user = new User(
      input.age,
      input.dependents,
      input.income,
      input.marital_status,
      input.risk_questions,
      input.house,
      input.vehicle,
    )

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

    if (user.house.ownership_status === 'mortgaged') {
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

    const actualYear = new Date().getFullYear()

    if (actualYear - user.vehicle.year <= 5) {
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
