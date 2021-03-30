import { SuperTest, Test } from 'supertest'

export class SetupServer {
  constructor(private readonly _server: SuperTest<Test>) {}

  public request(url: string) {
    return {
      get: () => this._server.get(url),
      post: () => this._server.post(url),
      put: () => this._server.put(url),
      patch: () => this._server.patch(url),
      delete: () => this._server.delete(url),
    }
  }
}
