import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { BookModel } from 'src/book/model/book.model';

@InputType()
export class UpdateBooksInput extends PickType(BookModel, [
  'name',
  'description',
  'id',
]) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  authorsId: number;
}
