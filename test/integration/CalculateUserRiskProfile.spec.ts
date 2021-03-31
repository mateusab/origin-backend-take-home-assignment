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

  describe('all data are valid', () => {
    beforeEach(async () => {
      input = {
        age: 35,
        dependents: 2,
        house: { ownership_status: OwnershipStatusEnum.OWNED },
        income: 0,
        marital_status: MaritalStatusEnum.MARRIED,
        risk_questions: [0, 1, 0],
        vehicle: { year: 2018 },
      }
    })

    it('POST at /user/risk/calculate', async () => {
      const { body, status } = await setup.server
        .request(`/user/risk/calculate`)
        .post()
        .send(input)

      expect(status).toEqual(200)
      expect(body).toEqual({
        auto: InsuranceStatusEnum.REGULAR,
        disability: InsuranceStatusEnum.INELIGIBLE,
        home: InsuranceStatusEnum.ECONOMIC,
        life: InsuranceStatusEnum.REGULAR,
      })
    })
  })
})
