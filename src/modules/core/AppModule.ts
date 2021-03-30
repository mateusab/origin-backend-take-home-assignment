import { Module } from '@nestjs/common'
import { UserModule } from 'src/modules/user/UserModule'

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
