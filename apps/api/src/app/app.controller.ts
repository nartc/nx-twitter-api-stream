import { Controller, Get } from '@nestjs/common';
import { AppGateway } from './app.gateway';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGateway: AppGateway,
  ) {}

  @Get('twitter')
  getData() {
    return this.appService.getData();
  }

  @Get('stop')
  stop() {
    return this.appService.stop();
  }

  @Get('test')
  test() {
    return this.appGateway.test();
  }
}
