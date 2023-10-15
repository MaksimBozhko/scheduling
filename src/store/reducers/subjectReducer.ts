import { IData, IGroupsInfo, IPodgroup } from '@/store/types/types';
import {
  ADD_PODGROUP,
  REMOVE_PODGROUP,
  SET_ADDITIONAL_INFO,
  SET_ALL_TEACHER,
  SET_COUNT_STUDENTS,
  SET_DATA,
  SET_ERROR,
  SET_IS_LOADING,
  SET_TEACHER
} from '@/store/const/const';
import { ActionsType } from '@/store/store';

const initialState = {} as IData<IGroupsInfo>

const SubjectReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_DATA: {
      const {data, teachers} = action.payload
      const teacherList = [{id: '', name: 'Вакансия'}, ...teachers]
      const subjects = data.map((el) => ({
        subjectName: el.subjectName,
        groupInfo: {
          course: el.course,
          semestr: el.semestr,
          studentsNumber: el.studentsNumber,
          groupName: el.groupName,
        },
        hours: {
          lecturesHours: el.lecturesHours,
          laboratoryHours: el.laboratoryHours,
          practicHours: el.practicHours,
          seminarHours: el.seminarHours,
        },
        exam: el.exam,
        offset: el.offset,
        additionalInfo: el.additionalInfo,
        countPodgroups: el.countPodgroups,
        uniqueId: el.uniqueId,
        podgroups: el.podgroups
      }))
      return {...state, data: subjects, teachers: teacherList}
    }
    case SET_TEACHER: {
      const {id, teacherId, podgroupNumber, key} = action.payload
      const currentSubject = state.data.find((subject) => subject.uniqueId === id)
      let newPodgroups: IPodgroup[]
      if (currentSubject && key) {
        newPodgroups = currentSubject.podgroups.map((podgroup, index) => podgroupNumber === index ? {
          ...podgroup,
          [key]: teacherId
        } : podgroup)
      }
      return {
        ...state,
        data: state.data.map(subject => subject === currentSubject ? {
          ...subject,
          podgroups: newPodgroups
        } : subject)
      }
    }
    case SET_ADDITIONAL_INFO:
      return {
        ...state,
        data: state.data.map(subject => subject.uniqueId === action.payload.id ? {
          ...subject,
          additionalInfo: action.payload.value
        } : subject)

      }
    case SET_COUNT_STUDENTS: {
      const {groupId, podgroupNumber, countStudents} = action.payload;

      const updatedData = state.data.map((subject) => {
        if (subject.uniqueId === groupId) {
          if (+subject.groupInfo.studentsNumber < +countStudents || +countStudents < 0) {
            return subject;
          }

          const updatedPodgroups = subject.podgroups.map((podgroup, index) => {
            if (index === podgroupNumber) {
              return {...podgroup, countStudents: countStudents};
            } else {
              return {...podgroup, countStudents: (+subject.groupInfo.studentsNumber - +countStudents).toString()};
            }
          });

          return {...subject, podgroups: updatedPodgroups};
        }

        return subject;
      });

      return {...state, data: updatedData};
    }
    case SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case SET_ERROR:
      return {...state, error: action.payload}
    case ADD_PODGROUP: {
      const updatedData = state.data.map((subject) => {
        if (subject.uniqueId === action.payload) {

          const totalStudents = +subject.groupInfo.studentsNumber;
          const halfStudents = Math.floor(totalStudents / 2);
          const remainingStudents = totalStudents - halfStudents;

          subject.podgroups[0].countStudents = halfStudents.toString()
          subject.podgroups.push({
            countStudents: remainingStudents.toString(),
            laboratoryTeacher: '',
            lectureTeacher: '',
            practiceTeacher: '',
            seminarTeacher: '',
            examTeacher: '',
            offsetTeacher: ''
          })
          const countPodgroups = (+subject.countPodgroups + 1).toString()

          return {...subject, countPodgroups, podgroups: [...subject.podgroups]};
        }
        return subject;
      });

      return {...state, data: updatedData};
    }
    case REMOVE_PODGROUP: {
      const updatedData = state.data.map((subject) => {
        if (subject.uniqueId === action.payload && subject.podgroups.length > 0) {
          const updatedPodgroups = [...subject.podgroups];
          updatedPodgroups.pop();
          updatedPodgroups[0].countStudents = subject.groupInfo.studentsNumber
          const countPodgroups = (+subject.countPodgroups - 1).toString()
          return {...subject, countPodgroups, podgroups: updatedPodgroups};
        }
        return subject;
      });

      return {...state, data: updatedData};
    }
    case SET_ALL_TEACHER: {
      const {groupId, podgroupNumber, teacherId} = action.payload
      const subject = state.data.find((subject) => subject.uniqueId === groupId)
      let newPodgroups: IPodgroup[]
      if (subject) {
        newPodgroups = subject.podgroups.map((podgroup, index) => {
            if (podgroupNumber === index) {
              subject.offset && (
                podgroup.offsetTeacher = teacherId
              )
              subject.exam && (
                podgroup.examTeacher = teacherId
              )
              subject.hours.laboratoryHours !== '0' && (
                podgroup.laboratoryTeacher = teacherId
              )
              subject.hours.practicHours !== '0' && (
                podgroup.practiceTeacher = teacherId
              )
              subject.hours.seminarHours !== '0' && (
                podgroup.seminarTeacher = teacherId
              )
            }
            return podgroup
          }
        )
      }

      return {
        ...state,
        data: state.data.map(subject => subject.uniqueId === groupId ? {
          ...subject,
          podgroups: newPodgroups
        } : subject)
      }
    }
    default:
      return state
  }
};

export default SubjectReducer
