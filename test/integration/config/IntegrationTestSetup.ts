import { INestApplication } from '@nestjs/common'
import { agent } from 'supertest'
import { SetupServer } from '../config/SetupServer'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/AppModule'

export interface TestSetupInterface {
  app: INestApplication
  module: TestingModule
  server: SetupServer
}

export class IntegrationTestSetup {
  private static instance: Promise<TestSetupInterface>

  public static getInstance(): Promise<TestSetupInterface> {
    if (!IntegrationTestSetup.instance) {
      IntegrationTestSetup.instance = this.buildInstance()
    }
    return IntegrationTestSetup.instance
  }

  private static async buildInstance(): Promise<TestSetupInterface> {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = module.createNestApplication()
    await app.init()

    const server = new SetupServer(agent(app.getHttpServer()))

    return {
      app,
      module,
      server,
    }
  }
}

export default IntegrationTestSetup
