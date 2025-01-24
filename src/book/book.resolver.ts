import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookModel } from './model/book.model';
import { Book } from './book.entity';
import { CreateBooksInput } from './dto/input/create-books.input';
import { BookService } from './book.service';
import { UpdateBooksInput } from './dto/input/update-books.inpur';

@Resolver(() => BookModel)
export class BooksResolver {
  constructor(private booksServise: BookService) {}

  @Mutation(() => BookModel)
  createBook(
    @Args('createBookData') createBookInput: CreateBooksInput,
  ): Promise<Book> {
    return this.booksServise.create(createBookInput);
  }

  @Query(() => BookModel)
  getOneBook(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.booksServise.findOne(id);
  }

  @Query(() => [BookModel])
  getAllBooks(): Promise<Book[]> {
    return this.booksServise.findAll();
  }

  @Mutation(() => BookModel)
  updateBook(
    @Args('updateBookData') updateBookInput: UpdateBooksInput,
  ): Promise<Book> {
    return this.booksServise.update(updateBookInput);
  }

  @Mutation(() => BookModel)
  deleteBook(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.booksServise.delete(id);
  }
}
