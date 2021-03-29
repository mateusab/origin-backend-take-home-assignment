import { Injectable } from '@nestjs/common'
import { HouseInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { House } from 'src/modules/house/domain/structure/House'

@Injectable()
export class CreateNewHouseUseCase {
  execute(house: HouseInput): House {
    return house ? new House(house.ownership_status) : new House()
  }
}
