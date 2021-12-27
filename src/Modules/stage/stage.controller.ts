import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Stage } from '../../database-models/stage.model';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { StageService } from './stage.service';

@ApiTags('Stage')
@Controller('Stage')
export class StageController {
  /* CRUD End Points for Stage Created By Override */

  constructor(private service: StageService) {}
  /* POST Stage End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveStage(@Body() req: Stage): Promise<Stage> {
    return this.service.save(req);
  }

  /* GET All Stages End Point */
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllStages(): Promise<Stage[]> {
    return this.service.findAll();
  }

  /* GET One Stage End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Stage> {
    return this.service.findOne(id);
  }

  /* PUT  Stage End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateStage(@Param('id') id: string, @Body() req: Stage): Promise<any> {
    return this.service.update(id, req);
  }

  /* Delete  Stage End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteStage(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  /* End of Stage Controller Class 
   
   */
}
