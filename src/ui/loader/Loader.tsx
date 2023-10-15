import './Loader.scss'
import { classNames } from '@/common/lib/classNames';

interface LoaderProps {
    className?: string
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={'loader'}>
      <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
