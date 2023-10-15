import cls from './table.module.scss'
import { FC, FunctionComponent, useMemo } from 'react';
import { IHours, IPodgroup } from '@/store/types/types';
import { AdditionalInfoTextarea, CountStudentsInput, TeachersSelector } from '@/components';
import { ITeachersSelector, KeyType } from '@/components/teachersSelector/TeachersSelector';
import { classNames } from '@/common/lib/classNames';
import { IAdditionalInfo } from '@/components/countStudentsInput/CountStudentsInput';

interface ITableBody {
  className?: string
  groupId: string
  hours: IHours
  exam: boolean
  offset: boolean
  podgroups: IPodgroup[]
  countPodgroups: string
}

interface IDataTable<T> {
  title: string
  hours: string
  key?: KeyType
  value?: string
  component: FunctionComponent<T>
  filter?: boolean
}

export const TableBody: FC<ITableBody> = (props) => {
  const {
    podgroups,
    groupId,
    hours,
    offset,
    exam,
    countPodgroups
  } = props

  const data = useMemo(() => ([
      {
        title: 'Лекции',
        hours: hours.lecturesHours,
        key: 'lectureTeacher',
        component: TeachersSelector,
        filter: true
      },
      {
        title: 'Лабораторные работы',
        hours: hours.laboratoryHours,
        key: 'laboratoryTeacher',
        component: TeachersSelector
      },
      {
        title: 'Практические',
        hours: hours.practicHours,
        key: 'practiceTeacher',
        component: TeachersSelector
      },
      {
        title: 'Семинарские',
        hours: hours.seminarHours,
        key: 'seminarTeacher',
        component: TeachersSelector
      },
      (offset && {
        title: 'Зачёт',
        hours: '',
        key: 'offsetTeacher',
        component: TeachersSelector
      }),
      (exam && {
        title: 'Экзамен',
        hours: '',
        key: 'examTeacher',
        component: TeachersSelector
      }),
      (countPodgroups === '2' && {
        title: 'Количество человек',
        hours: '',
        key: 'countStudents',
        component: CountStudentsInput
      }),
      {
        title: 'Примечание (для составления расписания)',
        hours: '',
        component: AdditionalInfoTextarea
      }
    ].filter(Boolean)),
    [hours, exam, offset, countPodgroups]) as IDataTable<ITeachersSelector | IAdditionalInfo>[]

  return (
    <>
      {
        data.map((course, index) => {

          if (data.length - 1 === index) {
            return (
              <tr className={classNames(cls.body, {},)} key={course.title}>
                <td className={cls.cell}>{course.title}</td>
                <td className={classNames(cls.cell, {}, [cls.cellHours])}>{course.hours}</td>
                {
                  podgroups.length === 2
                    ? <td colSpan={2} className={classNames(cls.cell, {}, [cls.textarea])}><AdditionalInfoTextarea
                      groupId={groupId}/></td>
                    :
                    <td className={classNames(cls.cell, {}, [cls.textarea])}><AdditionalInfoTextarea groupId={groupId}/>
                    </td>
                }
              </tr>
            )
          }

          return (
            <tr className={cls.body} key={course.title}>
              <td className={cls.cell}>{course.title}</td>
              <td className={classNames(cls.cell, {}, [cls.cellHours])}>{course.hours}</td>
              {
                podgroups.map((_, index) => (
                  <td key={`${course.key}_${index}`} className={cls.cell}>
                    {course.component === TeachersSelector ? (
                      <course.component
                        teacherKey={course.key}
                        groupId={groupId}
                        podgroupNumber={index}
                        disabled={course.hours === '0'}
                        filter={course.filter}
                      />
                    ) : (
                      <course.component
                        countKey={course.key}
                        groupId={groupId}
                        podgroupNumber={index}
                      />
                    )
                    }
                  </td>
                ))
              }
            </tr>
          )
        })
      }
    </>
  )
}
