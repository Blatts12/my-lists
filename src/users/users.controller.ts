import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import RequestWithUser from 'src/auth/dto/request-user.interface';
import { List } from 'src/lists/entities/list.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  async getProfile(@Req() req: RequestWithUser): Promise<UserProfileDto> {
    const { email, password, ...rest }: User =
      await this.usersService.findOneByUsername(req.user.username);
    return rest;
  }

  @Get('lists')
  @UseGuards(AuthenticatedGuard)
  async getLists(@Req() req: RequestWithUser): Promise<List[]> {
    return this.usersService
      .findListsForUser(req.user)
      .then((user) => user.lists);
  }
}
