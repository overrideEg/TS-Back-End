import { Injectable } from '@nestjs/common';
import { GlobalFilter, GlobalSearch } from '../../dtos/search.dto';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { Sort } from '../../enums/sort.enum';
import { Course } from '../../database-models/course/course.model';
import { CheckoutService } from '../checkout/checkout.service';
import { CourseService } from '../course/course.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class SearchService {
  constructor(
    private courseService: CourseService,
    private checkoutService: CheckoutService,
    private userService: UserService,
  ) { }

  async globalSearch(
    req: any,
    search: string,
    page: number,
    limit: number,
  ): Promise<GlobalSearch | PromiseLike<GlobalSearch>> {
    let globalSearch = new GlobalSearch();
    let courses = await this.courseService.CourseModel.find({
      // $and: [
      // { $text: { $search: search, $caseSensitive: false, $diacriticSensitive: false } },
      // {
      $or: [
        // { "name.ar": /${search}/ },
        { 'name.ar': new RegExp(search, 'i') },
        { 'name.en': new RegExp(search, 'i') },
        { 'info.ar': new RegExp(search, 'i') },
        { 'info.en': new RegExp(search, 'i') },
        { 'description.ar': new RegExp(search, 'i') },
        { 'description.en': new RegExp(search, 'i') },
        { 'content.chapter': new RegExp(search, 'i') },
        { 'content.chapter.lessons.name': new RegExp(search, 'i') },
      ],
      // }
      // ]
    })
      .sort({
        priority: 'asc',
      })
      .populate('teacher')
      .limit(limit)
      .skip(limit * page)
      .exec();

    // for await (const course of courses) {
    //     course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user._id), cart: new ObjectId(course['_id']) })
    //     course.related = [];

    // }
    // globalSearch.courses = courses;
    // let userTeachers = await this.userService.UserModel.find(
    //     {
    //         $and: [
    //             {
    //                 $or: [
    //                     { "name": new RegExp(search, "i") },
    //                     { "email": new RegExp(search, "i") }
    //                 ],
    //             },

    //             { userType: UserType.teacher }
    //         ]

    //     }
    // ).sort({
    //     priority: 'asc'
    // })
    //     .limit(limit)
    //     .skip(limit * page)
    //     .exec();

    globalSearch.teachers = [];
    // for await (const user of userTeachers) {

    //     let profile = new TeacherProfile();
    //     profile.name = user.name;
    //     profile.avatar = user.avatar ?? "";
    //     let teacherCourses = await this.courseService.CourseModel.find({ teacher: user });
    //     let registers = await this.checkoutService.CheckoutModel.countDocuments().populate({
    //         "path": "lines.course",
    //         'model': Course.name
    //     }).populate({
    //         path: 'lines.course.teacher',
    //         "match": new ObjectId(user['_id'].toString())
    //     });
    //     profile.noOfStudents = registers
    //     profile.noOfCourses = teacherCourses.length
    //     profile.rate = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
    //     profile.bio = user?.bio ?? user.name;
    //     profile.userId = user['_id']
    //     profile.teacherId = user['_id']
    //     globalSearch.teachers.push(profile);
    // }
    return globalSearch;
  }

  async filter(
    req: any,
    subjectId: string,
    gradeId: string,
    stageId: string,
    cityId: string,
    rate: Sort,
    page: number,
    limit: number,
  ): Promise<GlobalFilter | PromiseLike<GlobalFilter>> {
    let globalFilter = new GlobalFilter();

    let featuresCourses = await this.courseService.CourseModel.find({
      $and: [
        subjectId ? { subject: new ObjectId(subjectId) } : {},

        gradeId ? { grade: new ObjectId(gradeId) } : {},
        stageId ? { stage: new ObjectId(stageId) } : {},
      ],
    })
      .sort({ cRating: 'desc' })
      .exec();


    globalFilter.topInstructors = [];

    for await (const course of featuresCourses) {


      let profile = new TeacherProfile();
      let latestFeedback = await this.courseService.getReviwsForTeacher(
        course.teacher,
      );
      profile.noOfReviews = latestFeedback.length;
      profile.rate =
        latestFeedback.length > 0
          ? (latestFeedback.reduce((acc, feedBack) => acc + feedBack.stars, 0) /
            profile.noOfCourses)
          : 5;

      profile.name = course.teacher.name;
      profile.avatar = course.teacher.avatar ?? '';
      let teacherCourses = await this.courseService.CourseModel.find({
        teacher: course.teacher,
      });
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
      profile.noOfCourses = teacherCourses.length;
      profile.bio = course.teacher?.bio ?? course.teacher.name;
      profile.userId = course.teacher['_id'];
      if (!cityId) {
        if (!globalFilter.topInstructors.find((inst) => inst.userId === profile.userId)) { globalFilter.topInstructors.push(profile); }
      }
    }

    globalFilter.featuresCourses = featuresCourses.slice(0, 10);

    let allCourses = await this.courseService.CourseModel.find({
      $and: [
        subjectId ? { subject: new ObjectId(subjectId) } : {},
        gradeId ? { grade: new ObjectId(gradeId) } : {},
        stageId ? { stage: new ObjectId(stageId) } : {},
      ],
    })
      .sort({ cRating: rate === Sort.HTL ? 'desc' : 'asc' })
      .limit(limit)
      .skip(limit * page)
      .exec();

    // for await (const course of allCourses) {
    //     course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user._id), cart: new ObjectId(course['_id'].toString()) })

    // }
    if (cityId) {
      allCourses = allCourses.filter(
        (course) => course?.teacher?.city['_id'] === cityId,
      );
      featuresCourses = featuresCourses.filter(
        (course) => course?.teacher?.city['_id'] === cityId,
      );
    }
    globalFilter.allCourses = allCourses;
    globalFilter.featuresCourses = featuresCourses;
    return globalFilter;
  }
}
