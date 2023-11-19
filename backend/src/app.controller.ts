/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('commits')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getCommits(): Promise<any> {
    return this.appService.getCommits('ocamilomontealegre', 'git-commit-history-app');
  }
}