import { IsNumber, IsString, MaxLength } from 'class-validator';

export default class CommentEntity {
  @IsString()
  @MaxLength(400)
  text: string;

  @IsString()
  postId: string;

  @IsNumber()
  userId: number;
}
