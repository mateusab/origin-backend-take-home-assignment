import { User } from '@user/domain/structure/User'
import { createUserMock } from 'test/mocks/UserMock'
describe('User', () => {
  let user: User

  describe('isOlderThanSixty', () => {
    describe('user age is greather than 60', () => {
      it('returns true', () => {
        user = createUserMock({ age: 65 })

        const response = user.isOlderThanSixty()

        expect(response).toEqual(true)
      })
    })

    describe('user age isnt greather than 60', () => {
      it('returns false', () => {
        user = createUserMock({ age: 30 })

        const response = user.isOlderThanSixty()

        expect(response).toEqual(false)
      })
    })
  })
})
