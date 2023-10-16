import { Button } from '@/ui';
import { FC, useCallback } from 'react';
import { asyncActions } from '@/store/acitons/asyncActions';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { classNames } from '@/common/lib/classNames';

interface ISaveButton {
  className?: string
}

export const SaveButton: FC<ISaveButton> = ({className}) => {
  const dispatch = useAppDispatch()

  const saveDataHandler = useCallback(() => {
    dispatch(asyncActions.saveData())
  }, [dispatch])

  return (
    <Button
      className={classNames('', {}, [className])}
      onClick={saveDataHandler}
    >
      Сохранить
    </Button>
  )
}
