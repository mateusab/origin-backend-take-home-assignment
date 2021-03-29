import { User } from '@user/domain/structure/User'
import { createUserMock } from 'test/mocks/UserMock'
describe('User', () => {
  let user: User

  describe('isOlderThanSixty', () => {
    describe('user is older than 60 years', () => {
      it('returns true', () => {
        user = createUserMock({ age: 65 })

        const response = user.isOlderThanSixty()

        expect(response).toEqual(true)
      })
    })

    describe('user isnt older than 60 years', () => {
      it('returns false', () => {
        user = createUserMock({ age: 30 })

        const response = user.isOlderThanSixty()

        expect(response).toEqual(false)
      })
    })
  })
})
