import { Module } from '@nestjs/common';
import { EpisodesController } from './controller/episodes.controller';
import { EpisodesService } from './services/episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from './entity/episodes.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MULTER_CONFIGURATION } from './configuration/multer.configure';

@Module({
  imports: [
    TypeOrmModule.forFeature([Episodes]),
    MulterModule.register(MULTER_CONFIGURATION),
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService],
  exports: [EpisodesService],
})
export class EpisodesModule {}
