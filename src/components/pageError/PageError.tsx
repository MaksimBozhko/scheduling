import cls from './pageError.module.scss'
import { classNames } from '@/common/lib/classNames';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { getError } from '@/store/selectors/selectors';

export const PageError = () => {
  const error = useAppSelector(getError)
  return (
    <div className={classNames(cls.page)}>
      {error}
    </div>
  )
}
