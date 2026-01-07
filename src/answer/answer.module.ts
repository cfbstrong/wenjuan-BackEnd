import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerService } from './answer.service';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { AnswerController } from './answer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  exports: [AnswerService],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
