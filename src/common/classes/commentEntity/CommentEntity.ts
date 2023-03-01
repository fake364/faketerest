import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export default class CommentEntity {
  @IsString()
  @Transform(({ value }: TransformFnParams) => {
    console.log('TRANSFORMING', value);
    return value?.trim();
  })
  @IsNotEmpty()
  @MaxLength(400)
  text: string;

  @IsString()
  postId: string;

  @IsNumber()
  userId: number;
}
