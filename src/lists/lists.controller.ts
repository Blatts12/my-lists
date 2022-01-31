import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import RequestWithUser from 'src/auth/dto/request-user.interface';
import { EntityName, IsOwnerGuard } from 'src/users/is-owner.guard';

@Controller('lists')
@EntityName('list')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(
    @Body() createListDto: CreateListDto,
    @Req() request: RequestWithUser,
  ) {
    return this.listsService.create(createListDto, request.user);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard, IsOwnerGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listsService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard, IsOwnerGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, IsOwnerGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listsService.remove(id);
  }
}
