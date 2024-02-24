import {Module} from '@nestjs/common';
import {MarkService} from './mark.service';
import {MarkController} from './mark.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MarkEntity} from "./mark.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MarkEntity])],
  providers: [MarkService],
  controllers: [MarkController]
})
export class MarkModule {
}
