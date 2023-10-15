import { FC, memo, useCallback, useState } from 'react'
import cls from './teachersSelector.module.scss'
import { Select } from '@/ui/select/Select';
import Arrow from '@/assets/arrowLeft.svg?react';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { getTeachers, getTeacherValue } from '@/store/selectors/selectors';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { actions } from '@/store/acitons/actions';
import FilterIcon from '@/assets/filter.svg?react'

export type KeyType = 'laboratoryTeacher' | 'lectureTeacher' | 'practiceTeacher' | 'seminarTeacher' | "countStudents"

interface ITeachersSelector {
  className?: string
  disabled?: boolean
  groupId: string
  podgroupNumber: number
  teacherKey?: KeyType
  filter?: boolean
}

export const TeachersSelector: FC<ITeachersSelector> = memo((props) => {
  const {
    className,
    disabled,
    groupId,
    podgroupNumber,
    teacherKey,
    filter
  } = props

  const dispatch = useAppDispatch()
  const teachers = useAppSelector(getTeachers)
  const value = useAppSelector(getTeacherValue(groupId, podgroupNumber, teacherKey))
  const [teacherId, setTeacherId] = useState<string>('')

  const onChange = useCallback((id: string) => {
    dispatch(actions.setTeacher(groupId, id, podgroupNumber, teacherKey))
    setTeacherId(id)
  }, [dispatch, groupId, podgroupNumber, teacherKey])

  const clickFilterHandler = useCallback(() => {
    if (teacherId) {
      dispatch(actions.setAllTeacher(groupId, podgroupNumber, teacherId))
    }
  },[dispatch, groupId, podgroupNumber, teacherId])

  return (
   <div className={cls.selectBlock}>
     <Select
       className={className}
       value={value}
       disabled={disabled}
       Icon={Arrow}
       optionsList={teachers}
       onChange={onChange}
     />
     {filter && (
       <FilterIcon onClick={clickFilterHandler}/>
     )}
   </div>
  )
})
