import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('question')
export class QuestionController {
  @Get()
  getErrors() {
    throw new HttpException('Error!!!!!', HttpStatus.NOT_FOUND);
  }
}
