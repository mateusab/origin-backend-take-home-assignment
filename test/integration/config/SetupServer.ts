import { SuperTest, Test } from 'supertest'

export class SetupServer {
  constructor(private readonly _server: SuperTest<Test>) {}

  public request(url: string) {
    return {
      post: () => this._server.post(url),
    }
  }
}
