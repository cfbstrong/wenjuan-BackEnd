import { Controller, Get, Post, Param } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  //依赖注入
  constructor(private readonly questionService: QuestionService) {}

  // @Get()
  // getErrors() {
  //   throw new HttpException('Error!!!!!', HttpStatus.NOT_FOUND);
  // }

  @Post()
  async create() {
    return await this.questionService.create();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(id);
  }
}
