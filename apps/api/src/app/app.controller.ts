import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('stop')
  stop() {
    return this.appService.stop();
  }

  @Get('rules')
  getRules() {
    return this.appService.getRules();
  }

  @Post('rules')
  addRules(@Body() rules: { value: string; tag: string }[]) {
    return this.appService.addRules(rules);
  }

  @Put('rules')
  deleteRules(@Body() rules: string[]) {
    return this.appService.deleteRules(rules);
  }
}
