import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './Security/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { TeacherModule } from '../teacher/teacher.module';
import { ParentModule } from '../parent/parent.module';
import { StudentModule } from '../student/student.module';
import { JwtStrategy } from './Security/jwt.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: jwtConstants.secret
    }),
    UserModule,
    TeacherModule,
    ParentModule,
    StudentModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
