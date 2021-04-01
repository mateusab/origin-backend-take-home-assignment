import { LifeInsurance } from 'src/domain/insurance/LifeInsurance'
import { MaritalStatusEnum } from 'src/domain/user/MaritalStatusEnum'
import { User } from 'src/domain/user/User'
import { createUserMock } from 'test/mocks/UserMock'

describe('LifeInsurance', () => {
  let user: User
  let score: number
  let points: number
  let lifeInsurance: LifeInsurance
  describe('increaseIfUserIsMarried', () => {
    beforeEach(() => {
      score = 0
      points = 1
    })
    describe('user is married', () => {
      it('increase points received by params', () => {
        user = createUserMock({ marital_status: MaritalStatusEnum.MARRIED })
        lifeInsurance = new LifeInsurance(user, score)

        lifeInsurance.increaseIfUserIsMarried(points)

        expect(lifeInsurance.score).toEqual(score + points)
      })
    })

    describe('user is not married', () => {
      it('do not increase points received by params', () => {
        user = createUserMock({ marital_status: MaritalStatusEnum.SINGLE })
        lifeInsurance = new LifeInsurance(user, score)

        lifeInsurance.increaseIfUserIsMarried(1)

        expect(lifeInsurance.score).toEqual(score)
      })
    })
  })
})
