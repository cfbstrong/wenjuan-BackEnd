import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Body,
  Query,
  Request,
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
  async create(@Request() req) {
    const { username } = req.user;
    return await this.questionService.create(username);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return await this.questionService.deleteOne(id, username);
  }

  @Delete()
  async deleteMany(@Body() body, @Request() req) {
    const { username } = req.user;
    const { ids = [] } = body;
    return await this.questionService.deleteMany(ids, username);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() questionDto: QuestionDto,
    @Request() req,
  ) {
    const { username } = req.user;
    return await this.questionService.update(id, questionDto, username);
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
    @Query('isDeleted') isDeleted: boolean = false,
    @Query('isStar') isStar: boolean = false,
    @Request() req,
  ) {
    const { username } = req.user;

    const list = await this.questionService.findAllList({
      keyword,
      page,
      pageSize,
      isDeleted,
      isStar,
      author: username,
    });

    const count = await this.questionService.findAllCount({
      keyword,
      isDeleted,
      isStar,
      author: username,
    });

    return {
      list,
      count,
    };
  }

  @Post('duplicate/:id')
  async duplicate(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return await this.questionService.duplicate(id, username);
  }
}
