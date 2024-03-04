import {Module} from '@nestjs/common';
import {MarkService} from './mark.service';
import {MarkController} from './mark.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MarkEntity} from "./mark.entity";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([MarkEntity])],
  providers: [MarkService],
  controllers: [MarkController]
})
export class MarkModule {
}
