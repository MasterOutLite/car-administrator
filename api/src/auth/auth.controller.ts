import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "@src/auth/auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LoginDto} from "@src/auth/dto/login.dto";
import {RegistrationDto} from "@src/auth/dto/registration.dto";
import {ResponseTokenDto} from "@src/auth/dto/response-token.dto";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private service: AuthService) {
  }

  @Post('login')
  @ApiOperation({summary: 'Login user'})
  @ApiResponse({status: HttpStatus.CREATED, type: ResponseTokenDto})
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  @Post('registration')
  @ApiOperation({summary: 'Registration user'})
  @ApiResponse({status: HttpStatus.CREATED, type: ResponseTokenDto})
  registration(@Body() dto: RegistrationDto) {
    return this.service.registration(dto);
  }

}
