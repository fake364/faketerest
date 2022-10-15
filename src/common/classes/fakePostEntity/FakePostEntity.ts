import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export default class FakePostEntity {
  id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNotEmpty()
  image?: File;

  constructor(id: number, title?: string, description?: string, image?: File) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
  }
}
