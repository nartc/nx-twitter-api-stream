import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
