import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(
    private urlService: UrlService
  ) { }

  @Get(':id')
  async redirect(@Param('id') id: string, @Res() res: Response) {
    const origin = await this.urlService.getById(id);

    res.redirect(origin);
  };
}