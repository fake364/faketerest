import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidationError
} from 'class-validator';

export default class FakePostEntity {
  id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string = '';

  @IsOptional()
  @MaxLength(500)
  description?: string = '';

  @IsNotEmpty()
  image?: File;

  errors: ValidationError[] = [];

  isLoading: boolean;

  uploadId?: string;

  constructor(id: number, title = '', description = '', image?: File) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
  }

  clone() {
    const post = new FakePostEntity(this.id);
    Object.keys(this).forEach((key) => (post[key] = this[key]));
    return post;
  }
}
