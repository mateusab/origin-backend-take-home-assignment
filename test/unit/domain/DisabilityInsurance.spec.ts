import { DisabilityInsurance } from 'src/domain/insurance/DisabilityInsurance'
import { MaritalStatusEnum } from 'src/domain/user/MaritalStatusEnum'
import { User } from 'src/domain/user/User'
import { createUserMock } from 'test/mocks/UserMock'

describe('DisabilityInsurance', () => {
  let user: User
  let disabilityInsurance: DisabilityInsurance
  let score: number
  let points: number

  beforeEach(() => {
    score = 0
    points = 1
  })

  describe('decreaseIfUserIsMarried', () => {
    describe('user is married', () => {
      it('decrease points received by params', () => {
        user = createUserMock({ marital_status: MaritalStatusEnum.MARRIED })
        disabilityInsurance = new DisabilityInsurance(user, score)

        disabilityInsurance.decreaseIfUserIsMarried(points)

        expect(disabilityInsurance.score).toEqual(score - points)
      })
    })

    describe('user is not married', () => {
      it('do not decrease points received by params', () => {
        user = createUserMock({ marital_status: MaritalStatusEnum.SINGLE })
        disabilityInsurance = new DisabilityInsurance(user, score)

        disabilityInsurance.decreaseIfUserIsMarried(points)

        expect(disabilityInsurance.score).toEqual(score)
      })
    })
  })
})
