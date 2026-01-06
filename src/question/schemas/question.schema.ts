import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  js: string;

  @Prop()
  css: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isStar: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  componentList: {
    fe_id: string; //组件fe_id需要前端生成
    type: string; //组件类型
    title: string; //组件标题
    isHidden: boolean; //是否隐藏
    isLocked: boolean; //是否锁定
    props: object; //组件属性
  }[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
