import { MaritalStatusEnum } from '@user/enums/MaritalStatusEnum'
import { User } from '@user/domain/structure/User'

export const createUserMock = (params?: Partial<User>): User => {
  const age = 35
  const dependents = 0
  const income = 0
  const marital_status = MaritalStatusEnum.MARRIED
  const risk_answers = [false, true, false]

  const user = new User(
    params.age ? params.age : age,
    params.dependents ? params.dependents : dependents,
    params.income ? params.income : income,
    params.marital_status ? params.marital_status : marital_status,
    params.risk_answers ? risk_answers : risk_answers,
  )

  return user
}
