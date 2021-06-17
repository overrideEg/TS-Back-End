import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from '@nestjs/websockets';
import { parse } from 'cookie';
import { AuthService } from '../auth/auth.service';
import { LearningClassService } from './learning-class.service';
import { Server, Socket } from 'socket.io';
import { sendLiveMessageDTO, StartLiveDTO } from '../../dtos/start-live.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { WsGuard } from '../auth/Security/ws-guard';

@WebSocketGateway(93)
export class LearningClassGateway {
  constructor(
    private readonly service: LearningClassService) { }


  @WebSocketServer()
  server: Server;
 

  // @UseGuards(WsGuard)
  @SubscribeMessage('startLive')
  async startLive(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ): Promise<WsResponse<unknown>> {
   


    console.log('startLive Event',body);
    
    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    console.log(user);
    
    let startedClass = await this.service.startLive(user, body)
    socket.join(startedClass.lesson.OId);

    startedClass.chat.forEach(message => {
     
      this.server.to(startedClass.lesson.OId).emit('chat', {
        user: {
          name : message.user.name,
          avatar : message.user.avatar,
          _id : message.user['_id']
        },
        message: message.message,
        time: message.time
      })
    })
    this.server.to(startedClass.lesson.OId).emit('live', {
      teacherToken: startedClass.teacherToken,
      studentToken: startedClass.startTime,
      courseId: startedClass.course['_id'],
      lessonId: startedClass.lesson.OId,
      startTime: startedClass.startTime,
      attenders: startedClass.attenders
    });

    return {
      event: 'startLive', data: {
        teacherToken: startedClass.teacherToken,
        studentToken: startedClass.startTime,
        courseId: startedClass.course['_id'],
        lessonId: startedClass.lesson.OId,
        startTime: startedClass.startTime,
        attenders: startedClass.attenders
      },
    };



  }


  @SubscribeMessage('endLive')
  async endLive(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ): Promise<WsResponse<unknown>> {
   

    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    let startedClass = await this.service.endLive(user, body)
    socket.join(startedClass.lesson.OId);

    this.server.to(startedClass.lesson.OId).emit('live', {
      teacherToken: startedClass.teacherToken,
      studentToken: startedClass.startTime,
      courseId: startedClass.course['_id'],
      lessonId: startedClass.lesson.OId,
      endTime: startedClass.endTime,
      startTime: startedClass.startTime,
      attenders: startedClass.attenders
    });

    return {
      event: 'endLive', data: {
        teacherToken: startedClass.teacherToken,
        studentToken: startedClass.startTime,
        courseId: startedClass.course['_id'],
        lessonId: startedClass.lesson.OId,
        endTime: startedClass.endTime,
        startTime: startedClass.startTime,
        attenders: startedClass.attenders
      },
    };

  }


  @SubscribeMessage('join')
  async joinLive(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ): Promise<WsResponse<unknown>> {
   
    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    let startedClass = await this.service.joinLive(user, body)
    socket.join(startedClass.lesson.OId);

   this.server.to(startedClass.lesson.OId).emit('chat', {
        user: {
          name : user.name,
          avatar : user.avatar,
          _id : user['_id']
        },
        message: `${user.name} joined`,
        time:Date.now()
      })
    this.server.to(startedClass.lesson.OId).emit('live', {
      teacherToken: startedClass.teacherToken,
      studentToken: startedClass.startTime,
      courseId: startedClass.course['_id'],
      lessonId: startedClass.lesson.OId,
      startTime: startedClass.startTime,
      attenders: startedClass.attenders
    });

    return {
      event: 'join', data: {
        teacherToken: startedClass.teacherToken,
        studentToken: startedClass.startTime,
        courseId: startedClass.course['_id'],
        lessonId: startedClass.lesson.OId,
        startTime: startedClass.startTime,
        attenders: startedClass.attenders
      },
    };



  }
  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() body: sendLiveMessageDTO,
    @ConnectedSocket() socket: Socket
  ): Promise<WsResponse<unknown>> {
   
    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    let msg = await this.service.sendMessage(user, body)
    socket.join(body.lessonId);

   this.server.to(body.lessonId).emit('chat', {
        user: {
          name : msg.user.name,
          avatar : msg.user.avatar,
          _id : msg.user['_id']
        },
        message: msg.message,
        time: msg.time
      })
  
    return {
      event: 'sendMessage', data: {
        user: {
          name : msg.user.name,
          avatar : msg.user.avatar,
          _id : msg.user['_id']
        },
        message: msg.message,
        time: msg.time
      },
    };



  }




}
