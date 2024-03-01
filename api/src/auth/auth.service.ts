import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "@src/user/user.entity";
import {Repository} from "typeorm";
import {LoginDto} from "@src/auth/dto/login.dto";
import {JwtService} from "@nestjs/jwt";
import {RegistrationDto} from "@src/auth/dto/registration.dto";

@Injectable()
export class AuthService {

  constructor(@InjectRepository(UserEntity)
              private repository: Repository<UserEntity>, private jwtService: JwtService) {
  }

  async login(login: LoginDto) {
    const user = await this.repository.findOne({
      where: {
        ...login
      },
      relations: {
        roles: true
      }
    });

    if (!user)
      throw new UnauthorizedException();

    return this.generateToken(user);
  }


  async registration(dto: RegistrationDto) {
    const exists = await this.repository.exists({where: {...dto}});
    if (exists)
      throw new BadRequestException('User exists');

    const user = this.repository.create(dto);
    user.roles = [{id: 1, name: 'USER'}];
    await this.repository.save(user);

    return this.generateToken(user);
  }

  async generateToken(user: UserEntity) {
    const token = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
      role: user.roles.map(value => value.name)
    });
    return {token};
  }

}
