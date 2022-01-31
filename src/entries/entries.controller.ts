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
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntityName, IsOwnerGuard } from 'src/users/is-owner.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('entries')
@EntityName('entry')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }

  @Get('statuses')
  findAllStatuses() {
    return this.entriesService.findAllStatuses();
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard, IsOwnerGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.entriesService.update(id, updateEntryDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, IsOwnerGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entriesService.remove(id);
  }
}
