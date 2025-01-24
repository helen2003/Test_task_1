import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/author/author.entity';
import { AuthorModel } from 'src/author/model/author.model';
import { Book } from 'src/book/book.entity';

@ObjectType()
export class BookModel implements Book {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  createdDate: Date;

  @Field(() => Date)
  updatedDate: Date;

  @Field(() => Date)
  deletedDate: Date;

  @Field(() => Int)
  authorsId: number;

  @Field(() => AuthorModel, { nullable: true })
  authors: Author;
}
