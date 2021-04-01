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
        input = createInputMock({})
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
        input = createInputMock({})
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

    describe('age is not equal or greather than zero', () => {
      beforeEach(async () => {
        input = createInputMock({ age: -1 })
      })
      it('returns age should be greather than zero error with status code 400', async () => {
        const { body, status } = await setup.server
          .request(`/user/risk/calculate`)
          .post()
          .send(input)

        expect(status).toEqual(400)
        expect(body.error).toEqual('Bad Request')
        expect(body.message).toEqual(['Age should be greather than zero.'])
      })
    })

    describe('dependents is not equal or greather than zero', () => {
      beforeEach(async () => {
        input = createInputMock({ dependents: -1 })
      })
      it('returns the minimal number of dependents must be zero error with status code 400', async () => {
        const { body, status } = await setup.server
          .request(`/user/risk/calculate`)
          .post()
          .send(input)

        expect(status).toEqual(400)
        expect(body.error).toEqual('Bad Request')
        expect(body.message).toEqual([
          'The minimal number of dependents must be zero.',
        ])
      })
    })

    describe('income is not equal or greather than zero', () => {
      beforeEach(async () => {
        input = createInputMock({ income: -1 })
      })
      it('returns the minimal number of incomes must be zero error with status code 400', async () => {
        const { body, status } = await setup.server
          .request(`/user/risk/calculate`)
          .post()
          .send(input)

        expect(status).toEqual(400)
        expect(body.error).toEqual('Bad Request')
        expect(body.message).toEqual([
          'The minimal number of incomes must be zero.',
        ])
      })
    })

    describe('risk_questions are not all boolean values', () => {
      beforeEach(async () => {
        input = createInputMock({ risk_questions: [0, 1, -2] })
      })
      it('returns risk_questions must be an array with boolean values error with status code 400', async () => {
        const { body, status } = await setup.server
          .request(`/user/risk/calculate`)
          .post()
          .send(input)

        expect(status).toEqual(400)
        expect(body.error).toEqual('Bad Request')
        expect(body.message).toEqual([
          'risk_questions must be an array with boolean values',
        ])
      })
    })

    describe('all data are valid', () => {
      beforeEach(async () => {
        input = createInputMock({})
      })

      it('returns the expected response with status code 200', async () => {
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

const createInputMock = (
  params?: Partial<CalculateUserRiskProfileInput>,
): CalculateUserRiskProfileInput => {
  const age = 35
  const dependents = 0
  const income = 0
  const marital_status = MaritalStatusEnum.MARRIED
  const risk_questions = [0, 1, 0]
  const house = {
    ownership_status: OwnershipStatusEnum.OWNED,
  }
  const vehicle = {
    year: 2018,
  }

  return {
    age: params.age ? params.age : age,
    dependents: params.dependents ? params.dependents : dependents,
    income: params.income ? params.income : income,
    marital_status: params.marital_status
      ? params.marital_status
      : marital_status,
    risk_questions: params.risk_questions
      ? params.risk_questions
      : risk_questions,
    house: params.house ? params.house : house,
    vehicle: params.vehicle ? params.vehicle : vehicle,
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
