import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorModel } from './model/author.model';
import { AuthorService } from './author.service';
import { Author } from './author.entity';
import { CreateAuthorsInput } from './dto/input/create-authors.input';
import { UpdateAuthorsInput } from './dto/input/update-authors.inpur';

@Resolver(() => AuthorModel)
export class AuthorsResolver {
  constructor(private authorsServise: AuthorService) {}

  @Mutation(() => AuthorModel)
  createAuthor(
    @Args('createAuthorData') createAuthorInput: CreateAuthorsInput,
  ): Promise<Author> {
    return this.authorsServise.create(createAuthorInput);
  }

  @Query(() => AuthorModel)
  getOneAutors(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.authorsServise.findOne(id);
  }

  @Query(() => [AuthorModel])
  getAllAuthors(): Promise<Author[]> {
    return this.authorsServise.findAll();
  }

  @Mutation(() => AuthorModel)
  updateAuthor(
    @Args('updateAuthorData') updateAuthorInput: UpdateAuthorsInput,
  ): Promise<Author> {
    return this.authorsServise.update(updateAuthorInput);
  }

  @Mutation(() => AuthorModel)
  deleteAuthor(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.authorsServise.delete(id);
  }
}
