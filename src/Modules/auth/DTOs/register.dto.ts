import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  minLength,
} from 'class-validator';
import { Lang } from '../../../shared/enums/lang.enum';

export class RegisterAdmin {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(9)
  phone: string;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @ApiProperty({ default: Lang.en, enum: [Lang.en, Lang.ar] })
  @IsEnum(Lang)
  defaultLang?: Lang;
}
export class RegisterStudent extends PartialType(RegisterAdmin) {
  @ApiProperty()
  @IsString()
  cityId: string;
  @ApiProperty()
  @IsString()
  gradeId: string;
  @ApiProperty()
  @IsString()
  stageId: string;
}
export class RegisterTeacher extends PartialType(RegisterAdmin) {
  @ApiProperty()
  @IsString()
  cityId: string;
  @ApiProperty()
  @IsString()
  additionalPhone: string;
  @ApiProperty()
  @IsString()
  resume: string;
  @ApiProperty()
  @IsString()
  coverLetter: string;
}
export class RegisterParent extends PartialType(RegisterAdmin) {
  @ApiProperty()
  @IsString()
  studentId: string;
}
