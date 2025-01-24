import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksResolver } from './book.resolver';
import { AuthorModule } from 'src/author/author.module';

@Module({
  providers: [BookService, BooksResolver],
  imports: [TypeOrmModule.forFeature([Book]), AuthorModule],
})
export class BookModule {}
