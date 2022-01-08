import {
  BadRequestException,

  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentStatus } from '../../enums/payment-method.enum';
import { Status } from '../../enums/status.enum';
import { UserType } from '../../enums/user-type.enum';
import { Course, CourseDocument } from '../../database-models/course/course.model';
import {
  CourseReview,
  CourseReviewDocument,
} from '../../database-models/course/sub-models/course-review.model';
import {
  Excercice,
} from '../../database-models/course/sub-models/excercice.model';
import { Lang } from '../../shared/enums/lang.enum';
import { OverrideUtils } from '../../shared/override-utils';
import { CheckoutService } from '../checkout/checkout.service';
import { UserService } from '../user/user.service';
import { StartLiveDTO } from '../../dtos/start-live.dto';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { Agora } from '../../security/constants';
import { AttendanceLog } from '../../database-models/learning-class.model';
const ObjectId = require('mongoose').Types.ObjectId;
import * as moment from 'moment';
@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) public CourseModel: Model<CourseDocument>,
    // @InjectModel(CourseContent.name) public CourseContentModel: Model<CourseContentDocument>,
    @InjectModel(CourseReview.name)
    public reviewModel: Model<CourseReviewDocument>,
    // @InjectModel(Excercice.name) public ExcerciceModel: Model<ExcerciceDocument>,
    // @InjectModel(Lesson.name) public LessonModel: Model<LessonDocument>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => CheckoutService))
    private checkoutService: CheckoutService,
  ) { }

  async newCourse(
    req: any,
    body: Course,
  ): Promise<Course | PromiseLike<Course>> {
    if (req.user.userType !== UserType.teacher) {
      throw new BadRequestException('only teacher can add courses');
    }
    body.teacher = req.user;
    // TODO: Send Notification To Admin And Teacher
    return this.CourseModel.create(body);
  }

  async approveCourse(
    req: any,
    courseId: string,
  ): Promise<Course | PromiseLike<Course>> {
    if (req.user.userType !== UserType.admin) {
      throw new BadRequestException('only admin can approve  courses');
    }
    let course = await this.CourseModel.findByIdAndUpdate(courseId, {
      $set: { status: Status.approved },
    });
    course.status = Status.approved;
    // TODO: Send Notification To Admin And Teacher

    return course;
  }

  async update(
    req: any,
    id: string,
    body: Course,
  ): Promise<Course | PromiseLike<Course>> {
    if (req.user.userType !== UserType.teacher) {
      throw new BadRequestException('only teacher can update courses');
    }
    let teacher = await this.userService.findOne(req.user._id);
    if (teacher['_id'].toString() !== req.user._id) {
      throw new BadRequestException('only teacher can update his courses');
    }

    await this.CourseModel.updateOne({ _id: id }, body).exec();
    return await this.findOne(req, id);
  }

  async delete(req: any, id: string): Promise<Course | PromiseLike<Course>> {
    if (req.user.userType !== UserType.teacher.toString()) {
      throw new BadRequestException('only teacher can update courses');
    }
    let teacher = await this.userService.findOne(req.user._id);
    if (teacher['_id'].toString() !== req.user._id) {
      throw new BadRequestException('only teacher can update his courses');
    }
    let course = await this.CourseModel.findById(id).exec();
    if (course.startDate < Date.now()) {
      throw new BadRequestException('you can not delete started course');
    }
    let orders = await this.checkoutService.CheckoutModel.exists({
      course: new ObjectId(id),
      paymentStatus: PaymentStatus.Paid,
    });
    if (orders) {
      throw new BadRequestException(
        req.user.defaultLang === Lang.en
          ? 'you can not delete course because you have reservations'
          : 'لا يمكن حذف الدورة لوجود حجوزات بها',
      );
    }
    return await this.CourseModel.findByIdAndDelete(id);
  }

  async reviewCourse(
    req: any,
    courseId: string,
    body: CourseReview,
  ): Promise<CourseReview[] | PromiseLike<CourseReview[]>> {
    body.user = new ObjectId(req.user._id);
    let review = await this.reviewModel.create(body);
    let course = await this.CourseModel.findByIdAndUpdate(courseId, {
      $push: { reviews: review },
    }).exec();
    course.reviews.push(review);
    //TODO: Send Notification To Teacher
    return course.reviews;
  }

  async findOne(req: any, id: string): Promise<Course | PromiseLike<Course>> {
    let courses = await this.CourseModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },

      {
        $lookup: {
          from: 'coursereviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews',
        },
      },

      {
        $lookup: {
          from: 'excercices',
          localField: 'excercices',
          foreignField: '_id',
          as: 'excercices',
        },
      },
      {
        $lookup: {
          from: 'fs.files',
          localField: 'attachements',
          foreignField: '_id',
          as: 'attachements',
        },
      },

      {
        $lookup: {
          from: 'grades',
          localField: 'grade',
          foreignField: '_id',
          as: 'grade',
        },
      },

      { $unwind: '$grade' },
      {
        $lookup: {
          from: 'stages',
          localField: 'grade.stage',
          foreignField: '_id',
          as: 'stage',
        },
      },

      { $unwind: '$stage' },
      { $unset: ['grade.stage'] },

      {
        $lookup: {
          from: 'subjects',
          localField: 'subject',
          foreignField: '_id',
          as: 'subject',
        },
      },

      { $unwind: '$subject' },
      {
        $lookup: {
          from: 'users',
          localField: 'teacher',
          foreignField: '_id',
          as: 'teacher',
        },
      },

      { $unwind: '$teacher' },

      {
        $lookup: {
          from: 'courses',
          let: { relatedId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $not: { $eq: ['$$relatedId', '$_id'] } },
                    { status: Status.approved },
                    {
                      $or: [
                        { subject: '$subject' },
                        { teacher: '$teacher' },
                        { grade: '$grade' },
                      ],
                    },
                  ],
                },
              },
            },
            {
              $unset: [
                'attachements',
                'days',
                'hour',
                'excercices',
                'reviews',
                'startDate',
                'grade',
                'subject',
                'teacher',
              ],
            },
          ],
          as: 'related',
        },
      },
      {
        $unset: [
          'teacher.students',
          'teacher.bankAccounts',
          'teacher.wallet',
          'teacher.studentReviews',
          'teacher.studentId',
          'teacher.cart',
          'teacher.userType',
          'teacher.tempCode',
          'teacher.defaultLang',
          'teacher.teacherApproved',
          'teacher.isActive',
          'teacher.password',
          'teacher.city',
          'teacher.additionalPhone',
          'teacher.coverletter',
          'teacher.resume',
          'teacher.email',
          'teacher.phone',
        ],
      },
    ]);
    let course = courses.length > 0 ? courses[0] : null;
    if (!course) {
      throw new BadRequestException('Course Not Found');
    }

    course.enrolled = await this.checkoutService.CheckoutModel.count({
      course: new ObjectId(id),
      paymentStatus: PaymentStatus.Paid,
    });
    let reviews = await this.getReviwsForTeacher(course.teacher);
    course.teacher.noOfCourses = await this.CourseModel.count({
      teacher: course.teacher,
    });
    course.teacher.reviewsCount = reviews.length;
    course.teacher.rate =
      reviews.length > 0
        ? reviews.reduce((acc, feedBack) => acc + feedBack.stars, 0) /
        course.teacher.noOfCourses
        : 5;
    return course;
  }

  async getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
    if (req.user.userType !== UserType.teacher.toString()) {
      throw new BadRequestException('only teacher can view this request');
    }

    let courses = await this.CourseModel.find({ teacher: new ObjectId(req.user._id) });

    return courses;
  }

  async getCoursesInDate(
    req: any,
    timeStamp: number,
  ): Promise<Course[] | PromiseLike<Course[]>> {
    if (req.user.userType !== UserType.teacher.toString()) {
      throw new BadRequestException('only teacher can view this request');
    }

    let courses = await this.CourseModel.find({
      $and: [
        { teacher: new ObjectId(req.user._id) },
        // { startDate: { $gte: moment.unix(timeStamp).startOf('day').unix() * 1000, $lte: moment.unix(timeStamp).endOf('day').unix() * 1000 } },
      ]
    }).exec();


    return courses;
  }

  async getStudentCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
    let purchased = [];
    if (req.user.userType === UserType.parent) {
      let parent = await this.userService.findOne(req.user._id);
      for await (const student of parent.students) {
        purchased.push(
          await this.checkoutService.CheckoutModel.find({
            user: student,
            paymentStatus: PaymentStatus.Paid,
          })
            .sort({ valueDate: 'desc' })
            .exec(),
        );
      }
    }
    purchased = await this.checkoutService.CheckoutModel.find({
      user: new ObjectId(req.user._id),
      paymentStatus: PaymentStatus.Paid,
    })
      .sort({ valueDate: 'desc' })
      .exec();

    return purchased.map((checkout) => checkout.course);
  }

  async applyExcercice(
    req: any,
    courseId: string,
    lessonId: string,
    body: string[],
  ): Promise<Excercice[] | PromiseLike<Excercice[]>> {
    let checkout = await this.checkoutService.CheckoutModel.findOne({
      course: new ObjectId(courseId),
      user: new ObjectId(req.user._id),
      paymentStatus: PaymentStatus.Paid,
    });
    if (!checkout)
      throw new BadRequestException('you dont purchased this course');
    let course = checkout.course;
    delete course.teacher.wallet;

    return null;
    // if (lesson.type === LessonType.excercice) {
    //     for await (const link of body) {
    //         let excersise = new Excercice();
    //         excersise.user = await this.userService.findOne(req.user._id)
    //         excersise.link = link;
    //         lesson.exersices == null ? lesson.exersices = [excersise] : lesson.exersices.push(excersise)
    //     }
    //     await this.CourseModel.updateOne({ _id: courseId }, course)
    // }
    // return lesson.exersices ?? [];
  }

  async getExcercices(
    req: any,
    courseId: string,
    lessonId: string,
  ): Promise<Excercice[] | PromiseLike<Excercice[]>> {
    let course = await this.CourseModel.findById(courseId);

    return [];
  }

  async getReviwsForTeacher(
    teacher,
  ): Promise<CourseReview[] | PromiseLike<CourseReview[]>> {
    return await this.CourseModel.aggregate([
      {
        $match: {
          $and: [
            { teacher: new ObjectId(teacher._id) },
            { status: Status.approved },
          ],
        },
      },
      {
        $lookup: {
          from: 'coursereviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews',
        },
      },

      { $unwind: '$reviews' },

      {
        $replaceRoot: {
          newRoot: '$reviews',
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },


      {
        $unset: [
          'user.students',
          'user.bankAccounts',
          'user.wallet',
          'user.studentReviews',
          'user.studentId',
          'user.cart',
          'user.userType',
          'user.tempCode',
          'user.defaultLang',
          'user.teacherApproved',
          'user.isActive',
          'user.password',
          'user.city',
          'user.additionalPhone',
          'user.coverletter',
          'user.resume',
          'user.email',
          'user.phone',
        ],
      },
    ]);
  }
  /**
   * calculateProgress
   */
  // public calculateProgress(course: Course) {
  //     let progress = 0;
  //     let videos = 0;
  //     course.content.forEach(cont => {
  //         let contentProgress = 0;
  //         cont.lessons.forEach(less => {
  //             less.type.toString() === 'video' ? videos += 1 : videos += 0;
  //             less.type.toString() === 'video' && less.isDone ? contentProgress += 1 : contentProgress += 0;
  //         });
  //         progress += contentProgress;
  //     });
  //     return videos === 0 ? 0 : progress / videos * 100;
  // }



  async startLive(req, body: StartLiveDTO) {
    let course = await this.findOne(req, body.courseId);


    if (course.teacher['_id'].toString() !== req.user._id)
      throw new BadRequestException('only teacher can start his live');

    const expirationTimeInSeconds = 3600
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    if (course) {
      if (course.liveEndTime) {
        throw new Error(`This Lesson has Ended At ${new Date(course.liveEndTime).toTimeString()}`);

      }
    }

    course['liveStartTime'] = Date.now();

    const teacherToken = RtcTokenBuilder.buildTokenWithUid(Agora.appId, Agora.appCertificate, body.courseId, 0, RtcRole.PUBLISHER, privilegeExpiredTs);
    console.log('teacherToken', teacherToken);
    course['teacherToken'] = teacherToken;

    course['attenders'] = 0;

    var checkouts = await this.checkoutService.CheckoutModel.find({ course: new ObjectId(body.courseId) }).exec()
    for await (const checkout of checkouts) {
      // TODO: course

      // this.noticeService.sendSpecificNotification({
      //     userId: checkout.user['_id'].toString(),
      //     notification: {
      //         title: checkout.user.defaultLang == Lang.en ? 'Live Lesson Stated' : 'بدأ البث المباشر للدرس',
      //         body: checkout.user.defaultLang == Lang.en ? `${course.teacher.name} started live session on lesson ${lesson.name}, join now` : `${course.teacher.name} بدأ بث مباشر لدرس ${lesson.name}`
      //     }, data: { entityType: 'Course', entityId: course['_id'].toString() }, imageURL: course.cover
      // })

    }
    await this.CourseModel.findByIdAndUpdate(course._id, { $set: { teacherToken: course.teacherToken, attenders: 0, liveStartTime: course.liveStartTime } })

    return course
  }



  async joinLive(req, body: StartLiveDTO) {
    let checkout = await this.checkoutService.CheckoutModel.findOne({ course: new ObjectId(body.courseId), user: new ObjectId(req.user._id) })
    if (!checkout)
      throw new BadRequestException('you dont purchased this course');
    let course = checkout.course;

    let existsClass = await this.findOne(req, body.courseId)

    if (!existsClass.liveStartTime) {
      throw new BadRequestException(`this course not started yet`)
    }
    if (existsClass.liveEndTime) {
      throw new BadRequestException(`lesson ended at ${new Date(course.liveEndTime).toTimeString()}`)
    }
    existsClass.attenders += 1;
    let attendanceLog = new AttendanceLog();
    attendanceLog.time = Date.now();
    attendanceLog.user = new ObjectId(req.user._id);
    existsClass.attendanceLogs.push(attendanceLog);

    await this.CourseModel.findByIdAndUpdate({ _id: body.courseId }, existsClass);
    const expirationTimeInSeconds = 3600
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    const studentToken = RtcTokenBuilder.buildTokenWithUid(Agora.appId, Agora.appCertificate, body.courseId, 0, RtcRole.SUBSCRIBER, privilegeExpiredTs);
    existsClass.studentToken = studentToken;

    await this.CourseModel.findByIdAndUpdate(course._id, { $set: existsClass })


    return existsClass;

  }



  async leave(req, body: StartLiveDTO) {
    let checkout = await this.checkoutService.CheckoutModel.findOne({ course: new ObjectId(body.courseId), user: new ObjectId(req.user._id) })
    if (!checkout)
      throw new BadRequestException('you dont purchased this course');
    let course = checkout.course;

    let existsClass = await this.findOne(req, body.courseId)

    if (!existsClass) {
      throw new BadRequestException(`this course not started yet`)

    }
    if (existsClass.attenders > 0)
      existsClass.attenders -= 1;

    await this.CourseModel.findByIdAndUpdate(course._id, { $set: existsClass })

    return course
  }

  async endLive(req, body: StartLiveDTO) {
    let course = await this.findOne(req, body.courseId);

    if (course.teacher['_id'].toString() !== req.user._id)
      throw new BadRequestException('only teacher can end his live');
    if (course) {
      course.liveEndTime = Date.now();
    }
    await this.CourseModel.findByIdAndUpdate(course._id, { $set: course })
    return course;
  }

}
