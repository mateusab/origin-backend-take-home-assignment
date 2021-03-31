import { CalculateUserRiskProfileInput } from 'src/application/usecase/CalculateUserRiskProfileUseCase/CalculateUserRiskProfileInput'
import { OwnershipStatusEnum } from 'src/domain/house/OwnershipStatusEnum'
import { MaritalStatusEnum } from 'src/domain/user/MaritalStatusEnum'
import IntegrationTestSetup, {
  TestSetupInterface,
} from 'test/integration/config/IntegrationTestSetup'
import { InsuranceStatusEnum } from 'src/domain/insurance/enums/InsuranceStatusEnum'

describe('User :: Calculate Risk Profile', () => {
  let setup: TestSetupInterface
  let input: CalculateUserRiskProfileInput

  beforeAll(async () => {
    setup = await IntegrationTestSetup.getInstance()
  })

  describe('POST at /user/risk/calculate', () => {
    describe('house is not defined', () => {
      beforeEach(async () => {
        input = createInputMock()
        delete input.house
      })

      it('returns home insurance with status ineligible', async () => {
        const { body, status } = await setup.server
          .request(`/user/risk/calculate`)
          .post()
          .send(input)

        expect(status).toEqual(200)
        expect(body).toHaveProperty('home', InsuranceStatusEnum.INELIGIBLE)
      })
    })

    describe('vehicle is not defined', () => {
      beforeEach(async () => {
        input = createInputMock()
        delete input.vehicle
      })

      it('returns auto insurance with status ineligible', async () => {
        const { body, status } = await setup.server
          .request(`/user/risk/calculate`)
          .post()
          .send(input)

        expect(status).toEqual(200)
        expect(body).toHaveProperty('auto', InsuranceStatusEnum.INELIGIBLE)
      })
    })

    describe('all data are valid', () => {
      beforeEach(async () => {
        input = createInputMock()
      })

      it('returns the expected response', async () => {
        const { body, status } = await setup.server
          .request(`/user/risk/calculate`)
          .post()
          .send(input)

        expect(status).toEqual(200)
        expect(body).toEqual(finalExpectedResponse())
      })
    })
  })
})

function createInputMock(): CalculateUserRiskProfileInput {
  return {
    age: 35,
    dependents: 2,
    house: { ownership_status: OwnershipStatusEnum.OWNED },
    income: 0,
    marital_status: MaritalStatusEnum.MARRIED,
    risk_questions: [0, 1, 0],
    vehicle: { year: 2018 },
  }
}

const finalExpectedResponse = () => {
  return {
    auto: InsuranceStatusEnum.REGULAR,
    disability: InsuranceStatusEnum.INELIGIBLE,
    home: InsuranceStatusEnum.ECONOMIC,
    life: InsuranceStatusEnum.REGULAR,
  }
}
