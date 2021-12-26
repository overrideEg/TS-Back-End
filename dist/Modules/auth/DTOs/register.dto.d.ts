import { Lang } from '../../../shared/enums/lang.enum';
export declare class RegisterAdmin {
    name: string;
    email: string;
    phone: string;
    password: string;
    defaultLang?: Lang;
}
declare const RegisterStudent_base: import("@nestjs/common").Type<Partial<RegisterAdmin>>;
export declare class RegisterStudent extends RegisterStudent_base {
    cityId: string;
    gradeId: string;
    stageId: string;
}
declare const RegisterTeacher_base: import("@nestjs/common").Type<Partial<RegisterAdmin>>;
export declare class RegisterTeacher extends RegisterTeacher_base {
    cityId: string;
    additionalPhone: string;
    resume: string;
    coverLetter: string;
}
declare const RegisterParent_base: import("@nestjs/common").Type<Partial<RegisterAdmin>>;
export declare class RegisterParent extends RegisterParent_base {
    studentId: string;
}
export {};
