import { Module } from '@nestjs/common'
import { AppController } from 'src/AppController'
import { AppService } from 'src/AppService'
import { UserModule } from '@user/UserModule'

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
