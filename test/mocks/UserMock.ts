import { House } from 'src/domain/house/House'
import { OwnershipStatusEnum } from 'src/domain/house/OwnershipStatusEnum'
import { MaritalStatusEnum } from 'src/domain/user/MaritalStatusEnum'
import { User } from 'src/domain/user/User'
import { Vehicle } from 'src/domain/vehicle/Vehicle'

export const createUserMock = (params?: Partial<User>): User => {
  const age = 35
  const dependents = 0
  const income = 0
  const marital_status = MaritalStatusEnum.MARRIED
  const risk_answers = [false, true, false]
  const house = new House(OwnershipStatusEnum.OWNED)
  const vehicle = new Vehicle(2018)

  const user = new User(
    params.age ? params.age : age,
    params.dependents ? params.dependents : dependents,
    params.income ? params.income : income,
    params.marital_status ? params.marital_status : marital_status,
    params.risk_answers ? params.risk_answers : risk_answers,
    params.house ? params.house : house,
    params.vehicle ? params.vehicle : vehicle,
  )

  return user
}
