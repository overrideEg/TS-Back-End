import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { LearningClassService } from './learning-class.service';
import { Server, Socket } from 'socket.io';
import { sendLiveMessageDTO, StartLiveDTO } from '../../dtos/start-live.dto';

@WebSocketGateway(93)
export class LearningClassGateway  {
  constructor(
    private readonly service: LearningClassService) { }


  @WebSocketServer()
  server: Server;
 

  // @UseGuards(WsGuard)
  @SubscribeMessage('startLive')
  async startLive(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ){
   
    
    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    
    let startedClass = await this.service.startLive(user, body)
    socket.join(startedClass.lesson.OId);
    this.server.to(startedClass.lesson.OId).emit('chat', startedClass.chat.map(message => {
      return {
        user: {
          name : message.user.name,
          avatar : message.user.avatar,
          _id : message.user['_id']
        },
        message: message.message,
        time: message.time
      }
    }))
    this.server.to(startedClass.lesson.OId).emit('live', {
      teacherToken: startedClass.teacherToken,
      studentToken: startedClass.startTime,
      courseId: startedClass.course['_id'],
      lessonId: startedClass.lesson.OId,
      startTime: startedClass.startTime,
      attenders: startedClass.attenders
    });
  
  }


  @SubscribeMessage('endLive')
  async endLive(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ) {
    
   

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

   
  }


  @SubscribeMessage('join')
  async joinLive(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ){
   
    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    let startedClass = await this.service.joinLive(user, body)
    socket.join(startedClass.lesson.OId);

    startedClass.chat.push({
      user: user,
      message: `${user.name} joined`,
      time:Date.now()
    })
  
      this.server.to(startedClass.lesson.OId).emit('chat', startedClass.chat.map(message => {
        return {
          user: {
            name : message.user.name,
            avatar : message.user.avatar,
            _id : message.user['_id']
          },
          message: message.message,
          time: message.time
        }
      }))
    this.server.to(startedClass.lesson.OId).emit('live', {
      teacherToken: startedClass.teacherToken,
      studentToken: startedClass.startTime,
      courseId: startedClass.course['_id'],
      lessonId: startedClass.lesson.OId,
      startTime: startedClass.startTime,
      attenders: startedClass.attenders
    });

  



  }
  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() body: sendLiveMessageDTO,
    @ConnectedSocket() socket: Socket
  ){    
   
    console.log(body);

    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    let msg = await this.service.sendMessage(user, body)
    socket.join(body.lessonId);
    
    
      this.server.to(body.lessonId).emit('chat', msg.map(message => {
        return {
          user: {
            name : message.user.name,
            avatar : message.user.avatar,
            _id : message.user['_id']
          },
          message: message.message,
          time: message.time
        }
      }))
  
   


  }

  @SubscribeMessage('listen')
  async listen(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ){
    
   
    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    let startedClass = await this.service.joinLive(user, body)
    socket.join(startedClass.lesson.OId);
    
      this.server.to(body.lessonId).emit('chat', startedClass.chat.map(message => {
        return {
          user: {
            name : message.user.name,
            avatar : message.user.avatar,
            _id : message.user['_id']
          },
          message: message.message,
          time: message.time
        }
      }))
      this.server.to(startedClass.lesson.OId).emit('live', {
        teacherToken: startedClass.teacherToken,
        studentToken: startedClass.startTime,
        courseId: startedClass.course['_id'],
        lessonId: startedClass.lesson.OId,
        startTime: startedClass.startTime,
        attenders: startedClass.attenders
      });
  
   


  }

    @SubscribeMessage('leave')
  async leave(
    @MessageBody() body: StartLiveDTO,
    @ConnectedSocket() socket: Socket
  ) {
    
   

    let user = await  this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    let startedClass = await this.service.leave(user, body)
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

   
    this.server.to(body.lessonId).emit('chat', startedClass.chat.map(message => {
      return {
        user: {
          name : message.user.name,
          avatar : message.user.avatar,
          _id : message.user['_id']
        },
        message: message.message,
        time: message.time
      }
    }))
  }




}
