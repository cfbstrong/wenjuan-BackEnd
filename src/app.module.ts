import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    QuestionModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/wenjuan-BackEndDB'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
