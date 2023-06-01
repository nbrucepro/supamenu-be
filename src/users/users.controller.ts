import {
  Body,
  Controller,
  Get,
  Delete,
  NotAcceptableException,
  Post,
  Put,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'User created successfully',
    })
  async createUser(@Body() usera: UserDto): Promise<UserDto> {
    const saltOrRounds = 10;
    const hasspassword = await bcrypt.hash(usera.password, saltOrRounds);
    usera.password = hasspassword;
    const result = await this.usersService.createUser(usera);
    return result;
  }

  @Post('/login')
  async validateUser(@Body() usera: UserDto): Promise<any> {
    const founduser = await this.usersService.getUser(usera.email);
    console.log(usera.email)
    if (!founduser) {
      throw new NotAcceptableException('User not found');
    }
    const passwordValidate = await bcrypt.compare(
      usera.password,
      founduser.password,
    );
    if (!passwordValidate) {
      return 'password not match';
    }
    return {
      user: founduser,
      access_token: this.jwtService.sign({
        userid: founduser?._id.toString(),
        username: usera.email,
      }),
    };
  }

  @Put('/:id')
  @ApiParam({ name: 'id', description: 'id' })
  @ApiOkResponse({ description: 'User was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Server is unreachable !' })
  updateUser(@Param('id') id: any, @Body() updateDto: UserDto): Promise<any> {
    console.log(id);
    const user = this.usersService.updateUser(id, updateDto);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  getProfile(@Request() req):any {
    return req.user;
  }

  @Get('/')
  async getUsers() {
    const users = await this.usersService.getAll();
    return users;
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'id' })
  @ApiOkResponse({ description: 'User fetched successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Server is unreachable !' })
  async getOne(@Param() params: any) {
    const user = await this.usersService.getById(params.id);
    if (!user) {
      return 'User not found';
    }
    return user;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'id' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Server is unreachable !' })
  async deleteUser(@Param() params: any) {
    const deleteduser = this.usersService.deleteOne(params?.id);
    return 'user deleted successfully';
  }
}
