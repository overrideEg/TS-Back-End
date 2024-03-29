import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StartLiveDTO } from '../../dtos/start-live.dto';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { LearningClassService } from './learning-class.service';

@ApiTags('LearningClass')
@Controller('LearningClass')
export class LearningClassController {
  constructor(private service: LearningClassService) {}
  /* POST Grade End Point */
  @UseGuards(JwtAuthGuard)
  @Post('startLive')
  async startLive(@Req() req, @Body() body: StartLiveDTO): Promise<any> {
    let user =
      await this.service.authenticationService.getUserFromAuthenticationToken(
        body.token,
      );

    // let startedClass = await this.service.startLive(user, body)
    // return startedClass
  }

  @UseGuards(JwtAuthGuard)
  @Post('join')
  async join(@Req() req, @Body() body: StartLiveDTO): Promise<any> {
    let user =
      await this.service.authenticationService.getUserFromAuthenticationToken(
        body.token,
      );

    // let startedClass = await this.service.joinLive(user, body)
    // return startedClass
  }

  @UseGuards(JwtAuthGuard)
  @Post('endLive')
  async endLive(@Req() req, @Body() body: StartLiveDTO): Promise<any> {
    let user =
      await this.service.authenticationService.getUserFromAuthenticationToken(
        body.token,
      );

    // let startedClass = await this.service.endLive(user, body)
    // return startedClass
  }

  @UseGuards(JwtAuthGuard)
  @Post('leave')
  async leave(@Req() req, @Body() body: StartLiveDTO): Promise<any> {
    let user =
      await this.service.authenticationService.getUserFromAuthenticationToken(
        body.token,
      );

    // let startedClass = await this.service.leave(user, body)
    // return startedClass
  }
}
