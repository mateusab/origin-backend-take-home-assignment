import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/modules/core/AppModule'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
