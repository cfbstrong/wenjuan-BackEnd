import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';

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

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.questionService.deleteOne(id);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() questionDto: QuestionDto) {
    return await this.questionService.update(id, questionDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(id);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const list = await this.questionService.findAllList({
      keyword,
      page,
      pageSize,
    });

    const count = await this.questionService.findAllCount({ keyword });

    return {
      list,
      count,
    };
  }
}
