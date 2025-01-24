import { Field, InputType, PickType } from '@nestjs/graphql';
import { AuthorModel } from 'src/author/model/author.model';

@InputType()
export class CreateAuthorsInput extends PickType(AuthorModel, [
  'surname',
  'name',
  'patronymic',
]) {
  @Field(() => String)
  surname: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  patronymic: string;
}
