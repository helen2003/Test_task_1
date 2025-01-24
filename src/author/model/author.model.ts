import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from '../author.entity';
import { Book } from 'src/book/book.entity';
import { BookModel } from 'src/book/model/book.model';

@ObjectType()
export class AuthorModel implements Author {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  surname: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  patronymic: string;

  @Field(() => Date)
  createdDate: Date;

  @Field(() => Date)
  updatedDate: Date;

  @Field(() => Date)
  deletedDate: Date;

  @Field(() => [BookModel], { nullable: true })
  books: Book[];
}
