import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@src/user/user.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.PRIMARY_KEY || 'hj8f-Dd4D-dl8S-Myo5-Wdgs-Pm6Sa-Ht12-5Dsw-N1dS-Mfh6',
      signOptions: {
        expiresIn: '6d'
      }
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [
    JwtModule
  ],
  providers: [AuthService],
  controllers: [AuthController]

})
export class AuthModule {
}
