import { FC, useCallback } from 'react';
import { Textarea } from '@/ui';
import { classNames } from '@/common/lib/classNames';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { getAdditionalInfo } from '@/store/selectors/selectors';
import { actions } from '@/store/acitons/actions';

interface IAdditionalInfo {
  className?: string
  groupId: string
}

export const AdditionalInfoTextarea: FC<IAdditionalInfo> = (props) => {
  const {
    className,
    groupId
  } = props

  const dispatch = useAppDispatch()
  const value = useAppSelector(getAdditionalInfo(groupId))

  const changeTextareaHandler = useCallback((value: string) => {
    dispatch(actions.setAdditionalInfo(groupId, value))
  }, [dispatch, groupId])

  return (
    <Textarea
      value={value}
      onChange={changeTextareaHandler}
      className={classNames('', {}, [className])}
    />
  )
}
