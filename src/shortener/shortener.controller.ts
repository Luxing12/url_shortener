import { Controller, Post, Body, Get, Param, Delete, Res, Put } from '@nestjs/common';
import { ShortenerService } from './shortener.service';

@Controller()
export class ShortenerController {
  constructor(private service: ShortenerService) {}

  @Post('shorten')
  shorten(@Body('url') url: string) {
    return this.service.create(url);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);;
  }

  @Get('api/list')
  list() {
    return this.service.list();
  }

  @Delete('api/:id')
  remove(@Param('id') id: string) {
    return { deleted: this.service.delete(id) };
  }

  @Put('api/:id')
  update(@Param('id') id:string, @Body('url') url: string) {
    return this.service.update(id, url);
  }
}
