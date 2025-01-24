import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { AuthorModel } from 'src/author/model/author.model';

@InputType()
export class UpdateAuthorsInput extends PickType(AuthorModel, [
  'name',
  'patronymic',
  'surname',
  'id',
]) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  surname: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  patronymic: string;
}
