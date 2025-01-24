import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorsResolver } from './author.resolver';

@Module({
  providers: [AuthorService, AuthorsResolver],
  imports: [TypeOrmModule.forFeature([Author])],
  exports: [AuthorService],
})
export class AuthorModule {}
