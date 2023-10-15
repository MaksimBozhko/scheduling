import { FC, useCallback } from 'react';
import { Input } from '@/ui';
import { classNames } from '@/common/lib/classNames';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { getPodgroupValue } from '@/store/selectors/selectors';
import { actions } from '@/store/acitons/actions';
import { KeyType } from '@/components/teachersSelector/TeachersSelector';

interface IAdditionalInfo {
  className?: string
  groupId: string
  podgroupNumber: number
  countKey?: KeyType
}

export const CountStudentsInput: FC<IAdditionalInfo> = (props) => {
  const {
    className,
    groupId,
    podgroupNumber,
    countKey
  } = props

  const dispatch = useAppDispatch()
  const value = useAppSelector(getPodgroupValue(groupId, podgroupNumber, countKey))

  console.log(value)

  const changeTextareaHandler = useCallback((value: string) => {
    dispatch(actions.setCountStudents({groupId, podgroupNumber, countStudents: value}))
  }, [dispatch, groupId, podgroupNumber])

  return (
    <Input
      value={value}
      onChange={changeTextareaHandler}
      className={classNames('', {}, [className])}
      type={'number'}
    />
  )
}
