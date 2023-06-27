import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './modules/genre/genre.module';
import { User } from './modules/users/entity/user.entity';
import { Genre } from './modules/genre/entity/Genre.entity';
import { SeriesModule } from './modules/series/series.module';
import { Series } from './modules/series/entity/Series.entity';
import { SeasonsModule } from './modules/seasons/seasons.module';
import { Seasons } from './modules/seasons/entity/season.entity';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { Episodes } from './modules/episodes/entity/episodes.entity';
import { StreamsModule } from './modules/streams/streams.module';
import { Streams } from './modules/streams/entity/streams.entity';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql12.freesqldatabase.com',
      port: 3306,
      username: 'sql12628990',
      password: 'Alak7SVNjM',
      database: 'sql12628990',
      entities: [User, Genre, Series, Seasons, Episodes, Streams],
      synchronize: true,
    }),
    UsersModule,
    GenreModule,
    SeriesModule,
    SeasonsModule,
    EpisodesModule,
    StreamsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
