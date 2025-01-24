import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBooksInput } from './dto/input/create-books.input';
import { UpdateBooksInput } from './dto/input/update-books.inpur';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private authorsService: AuthorService,
  ) {}

  async create(createBooksData: CreateBooksInput): Promise<Book> {
    try {
      const authors = await this.authorsService.findOne(
        createBooksData.authorsId,
      );
      return this.booksRepository.save(
        this.booksRepository.create({ ...createBooksData, authors }),
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Ошибка записи книги',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['authors'],
    });
    if (!book) {
      throw new HttpException(
        'Книги с таким идентификатором нет',
        HttpStatus.BAD_REQUEST,
      );
    }
    return book;
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['authors'] });
  }

  async update(updateBooksData: UpdateBooksInput): Promise<Book> {
    try {
      const { authorsId, ...updateBookData } = updateBooksData;
      if (authorsId) {
        const authors = await this.authorsService.findOne(
          updateBooksData.authorsId,
        );
        if (!authors) {
          throw new HttpException(
            'Автора с таким идентификатором нет',
            HttpStatus.BAD_REQUEST,
          );
        }
        const book = await this.findOne(updateBooksData.id);
        if (!book) {
          throw new HttpException(
            'Книги с таким идентификатором нет',
            HttpStatus.BAD_REQUEST,
          );
        }
        book.authors = authors;
        this.booksRepository.save(book);
      }
      await this.booksRepository.update(updateBooksData.id, updateBookData);
      return this.findOne(updateBooksData.id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Ошибка обновления книги',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async delete(id: number): Promise<Book> {
    try {
      await this.booksRepository.softDelete(id);
      return (
        await this.booksRepository.find({ where: { id }, withDeleted: true })
      )[0];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Ошибка удаления книги',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
