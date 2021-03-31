import { House } from 'src/domain/house/House'
import { OwnershipStatusEnum } from 'src/domain/house/OwnershipStatusEnum'

describe('House', () => {
  describe('isHouseMortgaged', () => {
    describe('house is mortgaged', () => {
      it('returns true', () => {
        const house = new House(OwnershipStatusEnum.MORTGAGED)

        const response = house.isHouseMortgaged()

        expect(response).toEqual(true)
      })
    })

    describe('house is not mortgaged', () => {
      it('returns false', () => {
        const house = new House()

        const response = house.isHouseMortgaged()

        expect(response).toEqual(false)
      })
    })
  })
})
