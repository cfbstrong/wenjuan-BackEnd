import { Controller, Param, Post, Body } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Public()
  @Post()
  async createAnswer(@Body() answerInfo) {
    return await this.answerService.createAnswer(answerInfo);
  }
}
