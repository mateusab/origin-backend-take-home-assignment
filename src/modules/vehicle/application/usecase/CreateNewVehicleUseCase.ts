import { Injectable } from '@nestjs/common'
import { VehicleInput } from '@user/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { Vehicle } from 'src/modules/vehicle/Vehicle'

@Injectable()
export class CreateNewVehicleUseCase {
  execute(vehicle: VehicleInput): Vehicle {
    return vehicle ? new Vehicle(vehicle.year) : new Vehicle()
  }
}
