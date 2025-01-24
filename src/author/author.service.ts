import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorsInput } from './dto/input/create-authors.input';
import { UpdateAuthorsInput } from './dto/input/update-authors.inpur';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorsData: CreateAuthorsInput): Promise<Author> {
    try {
      return this.authorsRepository.save(
        this.authorsRepository.create(createAuthorsData),
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Ошибка записи автора',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOneBy({ id });
    if (!author) {
      throw new HttpException(
        'Автора с таким идентификатором нет',
        HttpStatus.BAD_REQUEST,
      );
    }
    return author;
  }

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async update(updateAuthorsData: UpdateAuthorsInput): Promise<Author> {
    try {
      await this.authorsRepository.update(
        updateAuthorsData.id,
        updateAuthorsData,
      );
      return this.findOne(updateAuthorsData.id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Ошибка обновления автора',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async delete(id: number): Promise<Author> {
    try {
      await this.authorsRepository.softDelete(id);
      return (
        await this.authorsRepository.find({ where: { id }, withDeleted: true })
      )[0];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Ошибка удаления автора',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
