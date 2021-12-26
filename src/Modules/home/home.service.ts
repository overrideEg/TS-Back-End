import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentHome, TeacherHome } from '../../dtos/home.dto';
import { Course, CourseDocument } from '../../models/course/course.model';
import { BannerService } from '../banner/banner.service';
import { PartnerService } from '../partner/partner.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;
import * as moment from 'moment';
import { SubjectService } from '../subject/subject.service';
import { Checkout, CheckoutDocument } from '../../models/checkout.model';
import { OverrideUtils } from '../../shared/override-utils';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { CourseService } from '../course/course.service';
import { CheckoutService } from '../checkout/checkout.service';
import { Status } from '../../enums/status.enum';
const mongoose = require('mongoose');
@Injectable()
export class HomeService {
  constructor(
    private bannerService: BannerService,
    private partnerService: PartnerService,
    private userService: UserService,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private checkoutService: CheckoutService,
  ) {}
  async getStudentHome(
    req: any,
  ): Promise<StudentHome | PromiseLike<StudentHome>> {
    let home = new StudentHome();
    home.banners = await this.bannerService.findAll();

    home.partners = await this.partnerService.findAll();
    let featuresCourses = await this.checkoutService.CheckoutModel.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course',
        },
      },

      { $unwind: '$course' },
      { $sortByCount: '$course' },

      {
        $replaceRoot: {
          newRoot: '$_id',
        },
      },
      { $limit: 10 },
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
        $unset: [
          'attachements',
          'days',
          'reviews',
          'grade.stage',
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

    home.featuresCourses = featuresCourses;
    let addedRecently = await this.courseService.CourseModel.aggregate([
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
        $unset: [
          'attachements',
          'days',
          'reviews',
          'grade.stage',
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
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ]);

    home.addedRecently = addedRecently;
    let now = moment();
    let afterWeek = moment();
    afterWeek.add(1, 'week');

    let startSoon = await this.courseService.CourseModel.aggregate([
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
        $unset: [
          'attachements',
          'days',
          'reviews',
          'grade.stage',
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
      {
        $match: {
          startDate: { $gte: now.unix() * 1000, $lte: afterWeek.unix() * 1000 },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ]);

    home.startSoon = startSoon;
    home.subjects = await this.subjectService.findAll();
    home.topInstructors = [];
    for await (const course of featuresCourses) {
      let profile = new TeacherProfile();
      profile.name = course?.teacher?.name;
      profile.avatar = course.teacher.avatar ?? '';
      profile.noOfStudents =
        await this.checkoutService.CheckoutModel.countDocuments()
          .populate({
            path: 'course',
            model: Course.name,
          })
          .populate({
            path: 'course.teacher._id',
            match: new ObjectId(course.teacher['_id']),
          });
      profile.noOfCourses = await this.courseService.CourseModel.count({
        teacher: course.teacher,
        status: Status.approved,
      });
      let latestFeedback = await this.courseService.getReviwsForTeacher(
        course.teacher,
      );
      profile.noOfReviews = latestFeedback.length;
      profile.rate =
        latestFeedback.length > 0
          ? latestFeedback.reduce((acc, feedBack) => acc + feedBack.stars, 0) /
            profile.noOfCourses
          : 5;

      profile.bio = course.teacher?.bio ?? course?.teacher?.name;
      profile.userId = course.teacher['_id'];
      if (
        !home.topInstructors.find(
          (instructor) =>
            instructor.userId.toString() === course.teacher._id.toString(),
        )
      )
        home.topInstructors.push(profile);
    }

    return home;
  }

  async getTeacherHome(
    req: any,
  ): Promise<TeacherHome | PromiseLike<TeacherHome>> {
    let home = new TeacherHome();
    let user = await this.userService.findOne(req.user._id);

    let teacherCourses = await this.courseService.CourseModel.aggregate([
      {
        $match: {
          $and: [
            {
              startDate: {
                $gte: moment().startOf('day').unix() * 1000,
                $lte: moment().endOf('day').unix() * 1000,
              },
            },
            { teacher: new ObjectId(req.user._id) },
          ],
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
          from: 'users',
          localField: 'reviews.user',
          foreignField: '_id',
          as: 'reviews.user',
        },
      },

      {
        $unset: [
          'attachements',
          'days',
          'grade.stage',
          'teacher',
          'subject',

          'reviews.user',
        ],
      },

      { $sort: { startDate: 1 } },
    ]);

    home.noOfCourses = await this.courseService.CourseModel.count({
      teacher: new ObjectId(req.user._id),
      status: Status.approved,
    });
    home.latestFeedback = await this.courseService.getReviwsForTeacher(
      req.user,
    );

    // home.latestFeedback = await this.courseService.reviewModel.find({ 'teacher': new ObjectId(req.user._id) }).limit(5).sort({ 'createdAt': 1 });
    home.rate =
      home.latestFeedback.length > 0
        ? home.latestFeedback.reduce(
            (acc, feedBack) => acc + feedBack.stars,
            0,
          ) / home.noOfCourses
        : 5;

    let registers = await this.checkoutService.CheckoutModel.countDocuments()
      .populate({
        path: 'lines.course',
        model: Course.name,
      })
      .populate({
        path: 'lines.course.teacher',
        match: new ObjectId(user['_id'].toString()),
      });
    home.noOfStudents = registers;

    let todayCourses = teacherCourses;

    home.todayCourses = todayCourses;
    return home;
  }
}
