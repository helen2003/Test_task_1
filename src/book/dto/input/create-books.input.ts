import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { BookModel } from 'src/book/model/book.model';

@InputType()
export class CreateBooksInput extends PickType(BookModel, [
  'name',
  'description',
]) {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  authorsId: number;
}
