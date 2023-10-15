import cls from './table.module.scss'
import { FC, FunctionComponent, useMemo } from 'react';
import { IHours, IPodgroup } from '@/store/types/types';
import { AdditionalInfoTextarea, CountStudentsInput, TeachersSelector } from '@/components';
import { KeyType } from '@/components/teachersSelector/TeachersSelector';
import { classNames } from '@/common/lib/classNames';

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
  component?: FunctionComponent<T>
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
        component: Component,
        filter: true
      },
      {
        title: 'Лабораторные работы',
        hours: hours.laboratoryHours,
        key: 'laboratoryTeacher',
        component: Component
      },
      {
        title: 'Практические',
        hours: hours.practicHours,
        key: 'practiceTeacher',
        component: Component
      },
      {
        title: 'Семинарские',
        hours: hours.seminarHours,
        key: 'seminarTeacher',
        component: Component
      },
      (offset && {
        title: 'Зачёт',
        hours: '',
        key: 'offsetTeacher',
        component: Component
      }),
      (exam && {
        title: 'Экзамен',
        hours: '',
        key: 'examTeacher',
        component: Component
      }),
      (podgroups.length === 2 && {
        title: 'Количество человек',
        hours: '',
        key: 'countStudents'
      }),
      {
        title: 'Примечание (для составления расписания)',
        hours: '',
      }
    ].filter(Boolean)),
    [hours, exam, offset, podgroups]) as IDataTable<ComponentProps>[]

  return (
    <>
      {
        data.map((course, index) => {

          if (data.length - 1 === index) {
            return (
              <tr className={classNames(cls.body, {}, )} key={course.title}>
                <td className={cls.cell}>{course.title}</td>
                <td className={cls.cellHours}>{course.hours}</td>
                {
                  podgroups.length === 2
                    ? <td colSpan={2} className={cls.textarea}><AdditionalInfoTextarea groupId={groupId}/></td>
                    : <td className={cls.textarea}><AdditionalInfoTextarea groupId={groupId}/></td>
                }
              </tr>
            )
          }

          if (course.title === 'Количество человек') {
            return (
              <tr className={cls.body} key={course.title}>
                <td className={cls.cell}>{course.title}</td>
                <td className={cls.cellHours}>{course.hours}</td>
                <td className={cls.cellHours}>
                  <CountStudentsInput
                    groupId={groupId}
                    podgroupNumber={0}
                    countKey={course.key}
                  />
                </td>
                {
                  countPodgroups === '2' && (
                    <td className={cls.cellHours}>
                      <CountStudentsInput
                        groupId={groupId}
                        podgroupNumber={1}
                        countKey={course.key}
                      />
                    </td>
                  )}
              </tr>
            )
          }

          return (
            <tr className={cls.body} key={course.title}>
              <td className={cls.cell}>{course.title}</td>
              <td className={cls.cellHours}>{course.hours}</td>
              <td className={cls.cell}>
                {course.component ? (
                  <course.component
                    teacherKey={course.key}
                    groupId={groupId}
                    podgroupNumber={0}
                    disabled={course.hours === '0'}
                    filter={course.filter}
                  />
                ) : (
                  course.title
                )}
              </td>
              {countPodgroups === '2' &&
                <td className={cls.cell}>
                  {course.component ? (
                    <course.component
                      teacherKey={course.key}
                      groupId={groupId}
                      podgroupNumber={1}
                      disabled={course.hours === '0'}
                      filter={course.filter}
                    />
                  ) : (
                    course.title
                  )}
                </td>}
            </tr>
          )
        })
      }
    </>
  )
}

type ComponentProps = {
  teacherKey?: KeyType
  groupId: string
  podgroupNumber: number
  disabled: boolean
  filter?: boolean
}

export const Component = (props: ComponentProps) => {
  const {
    teacherKey,
    groupId,
    podgroupNumber,
    disabled,
    filter
  } = props
  return (
    <TeachersSelector
      teacherKey={teacherKey}
      groupId={groupId}
      podgroupNumber={podgroupNumber}
      disabled={disabled}
      filter={filter}
    />
  )
}
